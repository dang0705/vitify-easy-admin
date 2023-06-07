<template>
  <v-form class="form-view" v-model="valid" ref="form">
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
          :config="formConfigCache[index]"
          :form-configs="formConfigCache"
          :form-data="value"
          v-model="value[configData.key]"
        >
          <template v-for="(_, name) in $scopedSlots" v-slot:[name]>
            <slot :name="name" />
          </template>
        </ui-input>
      </v-col>
    </v-row>
    <slot name="after-controls" />
    <slot name="actions" v-if="controlsLoaded">
      <v-sheet class="tw-flex tw-justify-center">
        <template v-if="useGrid">
          <v-btn
            class="tw-mx-2 tw-h-8 tw-py-2"
            elevation="2"
            rounded
            color="primary"
            @click="$emit('search')"
          >
            查询
          </v-btn>
          <v-btn
            class="tw-mx-2 tw-h-8 tw-py-2"
            elevation="2"
            rounded
            plain
            color="primary"
            @click="onreset"
          >
            重置
          </v-btn>
        </template>
        <template v-else>
          <v-btn
            class="tw-mx-2 tw-h-8 tw-px-6 tw-py-2"
            elevation="2"
            rounded
            color="primary"
            @click="submit"
          >
            保存
          </v-btn>
          <v-btn
            class="tw-mx-2 tw-h-8 tw-px-6 tw-py-2"
            elevation="2"
            rounded
            plain
            color="primary"
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
  import { useInstance } from 'composables';
  import { CREATE, UPDATE } from 'module-utils/CRUD';

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
      type: [Array, Function],
      default: () => [],
      required: true
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
    }
  });

  defineOptions({
    model: {
      prop: 'value',
      event: 'change'
    }
  });
  provide('formView', useInstance());

  const formConfigCache = ref([...props.formConfig]);
  const form = ref('');
  const valid = ref(true);
  const useValidations = computed(() =>
    formConfigCache.value.some(({ rules, required }) => rules || required)
  );
  const emit = defineEmits(['change', 'close-dialog']);
  const controlsLoaded = ref(false);
  const initFormDataByConfig = async (formConfig = formConfigCache.value) => {
    const values = {};
    formConfig.forEach(({ key, value }) => key && (values[key] = value));
    emit('change', values);
  };

  watch(
    () => props.value,
    (value) => {
      if (
        !controlsLoaded.value &&
        Object.keys(value).length === props.formConfig.length
      ) {
        setTimeout(() => (controlsLoaded.value = true), 100);
      }
    },
    { immediate: true }
  );
  watch(
    () => props.formConfig,
    (formConfig) => {
      if (formConfig.length) {
        props.isNew && initFormDataByConfig(formConfig);
      }
    },
    { immediate: true, deep: true }
  );
  const onreset = () => form.value.resetValidation();

  const cancel = () => {
    initFormDataByConfig();
    props.inDialog ? emit('close-dialog') : useRouter().back();
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
</script>
