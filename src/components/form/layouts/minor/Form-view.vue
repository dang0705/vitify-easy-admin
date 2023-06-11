<template>
  <v-form class="form-view" v-model="valid" ref="form" lazy-validation>
    <slot name="before-controls" />
    <v-row>
      <v-col
        v-for="(configData, index) in formConfigCache"
        :key="configData.key"
        :cols="useGrid ? 4 : 12"
      >
        <div
          v-if="!useGrid && (configData.title || configData.subTitle)"
          :style="configData.titleStyle"
        >
          <h3 v-html="configData.title" />
          <section v-html="configData.subTitle" />
          <v-divider class="tw-my-4" />
        </div>
        <ui-input
          v-if="pagination ? page >= 0 : true"
          :config="configData"
          :form-configs="formConfigCache"
          :form-data="value"
          class="ui-input"
          v-model="value[configData.key]"
        >
          <template v-for="(_, name) in $scopedSlots" #[name]>
            <slot :name="name" />
          </template>
        </ui-input>
      </v-col>
    </v-row>
    <slot name="after-controls" />
    <slot name="actions" v-if="controlsLoaded">
      <v-sheet class="tw-flex tw-justify-center">
        <template v-if="useGrid">
          <v-btn v-bind="actionVBtnProps" @click="$emit('search')">
            查询
          </v-btn>
          <v-btn v-bind="actionVBtnProps" plain @click="onreset"> 重置 </v-btn>
        </template>
        <template v-else>
          <v-btn
            v-if="!pagination || (pagination && paginationOptions?.save)"
            v-bind="actionVBtnProps"
            @click="submit"
          >
            保存
          </v-btn>
          <v-btn v-if="pagination" v-bind="actionVBtnProps" @click="next">
            下一步
          </v-btn>
          <v-btn
            v-bind="actionVBtnProps"
            plain
            @click="cancel"
            v-text="inDialog ? '取消' : '返回'"
          />
        </template>
      </v-sheet>
    </slot>
  </v-form>
</template>

<script setup>
  import uiInput from 'form/controls/mixins/ui-input.vue';
  import getModelActionApi from 'module-utils/get-model-action-api';
  import actionVBtnProps from 'definition/action-v-btn-props';
  import { useInstance } from 'composables';
  import { CREATE, UPDATE } from 'module-utils/CRUD';
  import { nextTick, onMounted } from 'vue';
  import { helpers } from 'utils/helpers';
  import { useRouter } from 'vue-router/composables';
  const $router = useRouter();

  // {save:true,pageField:'step',validate:true}
  const props = defineProps({
    actionApi: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: () => ({})
    },
    formConfig: {
      type: [Array, Object, Function],
      default: () => []
    },
    type: {
      type: String,
      default: 'horizontal'
    },
    nowrap: {
      type: Boolean,
      default: false
    },
    attrs: {
      type: Object,
      default: () => ({})
    },
    useGrid: {
      type: Boolean,
      default: false
    },
    isNew: {
      type: Boolean,
      default: true
    },
    defaultParams: {
      type: Object,
      default: () => ({})
    },
    model: {
      type: String,
      default: ''
    },
    inDialog: {
      type: Boolean,
      default: false
    },
    paginationOptions: {
      type: [Object, Function],
      default: null
    },
    saveOnPagination: {
      type: Boolean,
      default: false
    }
  });
  const emit = defineEmits(['change', 'close-dialog']);
  defineOptions({
    model: {
      prop: 'value',
      event: 'change'
    }
  });
  const formView = useInstance();
  const formConfig = inject('formConfig', null);
  const form = ref('');
  const valid = ref(true);
  provide('formView', formView);

  const page = ref(0);
  const pagination = computed(() => helpers.isArray(formConfig[0]));
  const formConfigCache = computed(() =>
    pagination.value ? formConfig[page.value] : [...formConfig]
  );

  const next = async () => {
    form.value.validate();
    await nextTick();
    console.log(form.value);
    /*props.paginationOptions.validate &&
      useValidations.value &&
      form.value.validate();*/
    if (valid.value && page.value < formConfigCache.value.length) {
      form.value.resetValidation();
      page.value++;
    }
  };
  const prev = () => (page.value ? page.value-- : $router.back());

  /*  pagination &&
    watch(
      () => page.value,
      () => props.isNew && initFormDataByConfig(formConfigCache.value),
      {
        deep: true
      }
    );*/

  const useValidations = computed(() =>
    formConfigCache.value.some(({ rules, required }) => rules || required)
  );

  const controlsLoaded = ref(false);
  const initFormDataByConfig = async (formConfig = formConfigCache.value) => {
    const values = {};
    formConfig.forEach(({ key, value }) => key && (values[key] = value));
    emit('change', values);
  };
  setTimeout(() => (controlsLoaded.value = true), 100);

  const onreset = () => form.value.resetValidation();

  const cancel = () => {
    if (pagination.value) {
      prev();
      return;
    }
    initFormDataByConfig();
    props.inDialog ? emit('close-dialog') : $router.back();
  };
  const submit = async () => {
    useValidations.value && form.value.validate();
    await nextTick();
    if (!valid.value) return;
    const postParams = { ...props.value, ...props.defaultParams };
    if (props.actionApi || props.action) {
      await $http.post(
        props.actionApi || getModelActionApi(props.model, props.action),
        postParams
      );
    } else {
      await (props.isNew ? CREATE : UPDATE)(props.model, postParams);
    }
    cancel();
    await nextTick();
    useBus.emit('toast', {
      msg: '操作成功',
      shaped: true
    });
  };
  onMounted(() => props.isNew && initFormDataByConfig(formConfigCache.value));
</script>
