<template>
  <div :class="['yb-detail-view', `page--${model || 'common'}-detail`]">
    <!-- Title -->
    <h2 v-if="!inDialog" class="title">
      {{ formedTitle }}
    </h2>
    <!-- Detail form -->
    <section class="yb-detail-view-content">
      <slot name="nav" />
      <form-view
        v-if="detailForm.config.length"
        v-model="detailForm.data"
        :model="modelName"
        :default-params="queryParams"
        :form-config="detailForm.config"
        :type="formType"
        :use-grid="$attrs.useGrid"
        :is-new="isNew"
        :class="[
          'yb-detail-view__form',
          {
            'yb-detail-view__form__in-dialog': inDialog,
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
  import uiTheme from '@/define/ui-theme';

  import { getModelDetail } from '@admin-utils/model-CRUD';
  import { helpers } from '@utils/helpers';

  const DEBUG = false;

  export default {
    name: 'DetailView',
    mixins: [viewMixin],
    props: {
      formConfig: {
        type: Array,
        default: () => []
      },
      detailData: {
        type: Object,
        default: () => ({})
      },
      formType: {
        type: String,
        default: 'vertical'
      },
      labelWidth: {
        type: [String, Number],
        default: 100
      },
      //  弹框界面下, 区分新增或编辑
      dialogIsNew: {
        type: Boolean,
        default: null
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
    data() {
      return {
        DEBUG,
        detailForm: {
          config: [],
          data: {}
        },
        inDialog: this.dialogIsNew !== null,
        parentComponent: null
      };
    },
    computed: {
      uiTheme() {
        return uiTheme;
      },
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

        return this.dialogIsNew === null
          ? !(this.useEdit || !useCreate)
          : this.dialogIsNew;
      },
      formedTitle() {
        return (this.isNew ? '创建' : '编辑') + this.title;
      },
      hasDetailData() {
        return !!Object.keys(this.detailData).length;
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
      },
      'parentComponent.$attrs'(val) {
        this.$nextTick(() => this.updateDetailFormInDialog(val));
      }
    },
    beforeMount() {
      this.$nextTick(async () => {
        this.parentComponent = this.hasDetailData
          ? null
          : /OrgDetail$/.test(this.$parent.$vnode.tag)
          ? this.$parent.$parent
          : this.$parent;

        await this.init();
        await this.initFormConfig();
      });
    },
    beforeDestroy() {
      this.$validations.clear();
    },
    methods: {
      async init() {
        if (!this.isNew) {
          this.hasDetailData
            ? this.updateDetailFormInDialog()
            : await this.getData();
        }
        helpers.isFunction(this.formConfig) &&
          (this.detailForm.config = this.formConfig({
            isNew: this.isNew,
            data: this.detailForm.data
          }));
      },
      async initFormConfig() {
        this.detailForm.config = this.formConfig;
      },
      async getData() {
        if (!this.inDialog) {
          this.detailForm.data = await getModelDetail(
            this.currentModule,
            this.queryParams
          );
        }
      },
      onCancel() {
        if (this.inDialog) {
          this.$emit('close');
          this.parentComponent.$emit('cancel');
        } else {
          this.$router.back();
        }
      },
      updateDetailFormInDialog(val) {
        if (val && Object.keys(val).length) {
          const { inDialog, data } = val;

          this.inDialog = inDialog;
          inDialog &&
            this.$set(this.detailForm, 'data', Object.assign({}, data));

          this.$bus.emit('detail-dialog-loaded', val);
        } else {
          this.detailForm.data = this.detailData;
        }
      }
    }
  };
</script>
