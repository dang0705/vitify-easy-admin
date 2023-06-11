<template>
  <div :class="['yb-detail-view', `page--${module || 'common'}-detail`]">
    <!-- Title -->
    <h2 class="title">
      {{ formedTitle }}
    </h2>
    <!-- Detail form -->
    <section class="yb-detail-view-content">
      <slot name="nav" />
      <form-view
        v-if="detailForm.config.length || Object.keys(detailForm.config).length"
        v-bind="$attrs"
        v-model="detailForm.data"
        :model="modelName"
        :default-params="queryParams"
        :type="formType"
        :use-grid="$attrs.useGrid"
        :is-new="isNew"
        :class="[
          'yb-detail-view__form',
          {
            'yb-detail-view--two-columns': showTwoColumns
          }
        ]"
      >
        <template #before>
          <slot name="before" />
        </template>

        <template v-for="(_, name) in $scopedSlots" v-slot:[name]="data">
          <slot
            :name="name"
            v-bind="{
              ...data,
              formConfig: detailForm.config,
              formData: detailForm.data,
              refreshData: getData
            }"
          />
        </template>
      </form-view>
    </section>
  </div>
</template>

<script>
  import viewMixin from './view';
  import maybeFunctional from 'utils/maybe-functional';
  import { READ_DETAIL } from 'module-utils/CRUD';

  const DEBUG = false;

  export default {
    name: 'DetailView',
    mixins: [viewMixin],
    props: {
      formConfig: {
        type: [Array, Object, Function],
        default: () => []
      },
      formType: {
        type: String,
        default: 'vertical'
      },
      labelWidth: {
        type: [String, Number],
        default: 100
      },
      showTwoColumns: {
        type: Boolean,
        default: false
      },
      noActions: {
        type: Boolean,
        default: false
      },
      saveButtonText: {
        type: String,
        default: '保存'
      },
      staticParams: {
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        formConfig: this.formConfig
      };
    },
    data() {
      return {
        DEBUG,
        detailForm: {
          config: [],
          data: {}
        },
        parentComponent: null
      };
    },
    computed: {
      routeParams() {
        return this.$route.params;
      },
      queryParams() {
        return { ...this.routeParams, ...this.defaultParams };
      },
      useEdit() {
        return this.$route.meta?.useEdit;
      },
      isNew() {
        const useCreate =
          !this.routeParams ||
          !Object.keys(this.routeParams).some(
            (params) => this.routeParams[params]
          );
        return !(this.useEdit || !useCreate);
      },
      formedTitle() {
        return (this.isNew ? '创建' : '编辑') + this.title;
      }
    },
    watch: {
      currentModule() {
        this.init();
      },
      defaultParams() {
        if (!this.staticParams) {
          this.init();
          this.initFormConfig();
        }
      }
    },
    created() {
      this.isNew ? this.initFormConfig() : this.getData();
    },

    methods: {
      async initFormConfig() {
        this.detailForm.config = maybeFunctional({
          data: this.formConfig,
          params: [{ isNew: this.isNew, data: this.detailForm.data }]
        });
      },
      async getData() {
        this.detailForm.data = await READ_DETAIL(
          this.currentModule,
          this.queryParams
        );
      },
      onCancel() {
        this.$router.back();
      }
    }
  };
</script>
