<template>
  <v-form
    class="form-view tw-flex-grow tw-flex tw-flex-col tw-items-start"
    v-model="valid"
    ref="form"
    lazy-validation
  >
    <slot name="before-controls" />
    <div class="tw-flex-grow tw-w-full">
      <v-row class="tw-flex-grow-0">
        <v-col
          v-for="(configData, _) in formConfigCache"
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
    </div>
    <slot name="after-controls" />
    <slot name="actions">
      <v-sheet class="tw-mb-4 tw-flex tw-w-full tw-justify-center">
        <template v-if="useGrid">
          <v-btn v-bind="actionVBtnProps" @click="$emit('search')">
            查询
          </v-btn>
          <v-btn v-bind="actionVBtnProps" plain @click="onreset"> 重置 </v-btn>
        </template>
        <template v-else>
          <v-btn v-bind="actionVBtnProps" @click="submit">
            {{
              pagination && page < formConfig.length - 1 ? '下一步' : submitText
            }}
          </v-btn>
          <v-btn
            v-bind="actionVBtnProps"
            plain
            @click="cancel"
            v-text="pagination && page ? '上一步' : inDialog ? '取消' : '返回'"
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
  import {
    useFormModulesProps,
    useFormConfigs
  } from 'form/layouts/composables';
  import { useBus } from 'plugins/bus';

  const $router = useRouter();

  // {save:true,pageField:'step',confirm}
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
    inDialog: {
      type: Boolean,
      default: false
    },
    paginationOptions: {
      type: [Object, Function],
      default: null
    },
    submitText: {
      type: String,
      default: '保存'
    },
    ...useFormModulesProps()
  });
  const emit = defineEmits(['change', 'close-dialog', 'search']);
  defineOptions({
    model: {
      prop: 'value',
      event: 'change'
    }
  });
  const formView = useInstance();
  provide('formView', formView);
  const formConfig =
    inject('formConfig', null) || useFormConfigs(props.formConfig);

  const page = ref(0);
  const pagination = computed(() => helpers.isArray(formConfig[0]));
  const formConfigCache = ref([...formConfig]);

  pagination.value &&
    watch(
      () => page.value,
      (page) => (formConfigCache.value = [...formConfig[page]]),
      {
        immediate: true
      }
    );
  const prev = () => (page.value ? page.value-- : $router.back());

  const form = ref('');
  const valid = ref(true);
  const useValidations = computed(() =>
    formConfigCache.value.some(
      ({ rules, required }) => (rules && rules.length) || required
    )
  );

  const initFormDataByConfig = async (formConfig = formConfigCache.value) => {
    const values = {};
    formConfig.forEach(({ key, value = null }) => key && (values[key] = value));
    emit('change', values);
  };

  const onreset = () => {
    form.value.resetValidation();
    initFormDataByConfig();
    emit('reset');
  };

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

    const postParams = {
      ...props.value,
      ...props.extraRequestParams,
      ...(pagination.value
        ? { [props.paginationOptions?.pageField || 'page']: page.value + 1 }
        : {})
    };
    const request = async () => {
      if (props.actionApi || props.action) {
        await $http.post(
          props.actionApi || getModelActionApi(props.module, props.action),
          postParams
        );
      } else {
        await (props.isNew ? CREATE : UPDATE)(props.module, postParams);
      }
      !pagination.value ||
        (pagination.value &&
          page.value === formConfigCache.value.length - 1 &&
          useBus.emit('toast', {
            msg: '操作成功',
            shaped: true
          }));
    };
    if (
      (pagination.value && props.paginationOptions?.save) ||
      !pagination.value
    ) {
      await request();
      !pagination.value && $router.back();
    } else if (
      pagination.value &&
      props.paginationOptions?.confirm &&
      page.value === formConfig.length - 1
    ) {
      useBus.emit('confirm', {
        msg: `是否${props.submitText}？`,
        toast: true,
        onConfirm: async () => {
          await request();
          $router.back();
        }
      });
    }
    await nextTick();

    pagination.value &&
      page.value < formConfigCache.value.length &&
      page.value++;
  };

  onMounted(() => props.isNew && initFormDataByConfig(formConfigCache.value));
</script>
