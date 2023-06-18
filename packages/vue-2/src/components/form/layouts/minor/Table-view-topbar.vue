<template>
  <section class="list-view-topbar">
    <template v-for="(topbarAction, topbarIndex) in formConfig">
      <a
        v-if="topbarAction.type === 'export' && topbarAction.link"
        :href="topbarAction.link"
        :key="topbarIndex"
        target="_blank"
        rel="noopener"
      >
        <ui-button icon="download" raised>{{ topbarAction.title }}</ui-button>
      </a>
      <ui-button
        v-else
        :key="topbarIndex"
        :icon="actionIcon(topbarAction.type)"
        raised
        @click="onAction(topbarAction)"
      >
        {{ topbarAction.title }}
      </ui-button>
    </template>
    <slot
      v-if="!hideSearch"
      name="topbar"
      topBarClass="list-view-topbar__slot"
      :selectedRows="selectedRows"
      :searchFormData="searchFormData"
      :otherData="otherData"
      :refreshData="refreshData"
    ></slot>
  </section>
</template>

<script>
  import { DELETE } from '@/module-system/CRUD';
  // import { ORG_MEMBER_TYPE } from '@/config/constants';
  export default {
    name: 'ListViewTopbar',
    props: {
      hideSearch: {
        type: Boolean,
        default: false
      },
      // 根据服务端 topbarActions 配置来渲染固定操作
      actionConfig: {
        type: Object,
        default: () => ({})
      },
      model: {
        type: String,
        default: '',
        required: true
      },
      routeName: {
        type: String,
        default: ''
      },
      formConfig: {
        type: Array,
        default: () => []
      },
      selectedRows: {
        type: Array,
        default: () => []
      },
      tableData: {
        type: Array,
        default: () => []
      },
      refreshData: {
        type: Function,
        default: () => {}
      },
      useDetailDialog: {
        type: Boolean,
        default: false
      },
      openDetailDialog: {
        type: Function,
        default: () => {}
      },
      searchFormData: {
        type: Object,
        default: () => {}
      },
      otherData: {
        type: null,
        default: ''
      }
    },
    methods: {
      actionIcon(type) {
        let icon = '';

        switch (type) {
          case 'add':
          case 'update':
          case 'delete':
            icon = type;
            break;
          case 'import':
            icon = 'upload';
            break;
          case 'export':
            icon = 'down';
            break;
          case 'multi-add':
            icon = 'add';
            break;
          case 'multi-delete':
            icon = 'delete';
            break;
          case 'openForum':
            icon = 'forum';
            break;
          default:
        }

        return icon;
      },
      async onAction({ type, name }) {
        let routeName = '';

        if (this.actionConfig[name]) {
          if (this.actionConfig[name].url) {
            routeName = this.actionConfig[name].url();
          } else if (this.actionConfig[name].onClick) {
            this.actionConfig[name].onClick(this.refreshData);
          }
        } else {
          if (/^multi-.*/.test(type)) {
            // 批量删除
            if (this.selectedRows.length) {
              switch (type) {
                case 'multi-delete':
                case 'multi-force-delete':
                  this.$confirm('确定要删除所有选中数据吗？').then(
                    async (result) => {
                      if (result) {
                        await DELETE(this.model, {
                          ids: this.selectedRows
                        });

                        this.$emit('multi-actions');

                        this.refreshData();
                      }
                    }
                  );
                  break;
              }
            } else {
              this.$toast(
                `请选择要批量${type === 'multi-add' ? '添加' : '删除'}的数据`
              );
            }
          } else {
            routeName = `${this.routeName || this.model}.detail`;
          }
        }

        if (routeName && type === 'add') {
          if (this.useDetailDialog) {
            this.openDetailDialog({}, { routeName });
          } else {
            this.$router.push({
              name: routeName
            });
          }
        }
      }
    }
  };
</script>
