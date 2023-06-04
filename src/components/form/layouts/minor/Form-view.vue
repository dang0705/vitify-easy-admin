<template>
  <v-form class="form-view" v-model="valid" ref="form" lazy-validation>
    <div class="form-items">
      <slot name="before" />
      <v-row>
        <v-col
          v-for="configData in formConfig"
          :key="configData.key"
          :cols="useGrid ? 4 : 12"
        >
          <div
            v-if="!useGrid && (configData.title || configData.subTitle)"
            :style="configData.titleStyle"
            class="title"
          >
            <h3 v-html="configData.title" />
            <section v-html="configData.subTitle" />
          </div>
          <ui-input
            :config="configData"
            :form-configs="formConfig"
            :form-data="value"
            v-model="value[configData.key]"
          >
            <component
              v-model="value[configData.key]"
              :ref="getRef(configData)"
              :is="`input-${configData.type}`"
              :config="configData"
              :form-configs="formConfig"
              :form-data="value"
              :data-source="value"
            >
              <template
                v-for="(_, name) in $scopedSlots"
                v-slot:[name]="{ options }"
              >
                <slot
                  :name="name"
                  :field="configData.key"
                  :value="
                    value[configData.key] !== undefined
                      ? value[configData.key]
                      : configData.value
                  "
                  :options="options"
                />
              </template>
            </component>
          </ui-input>
        </v-col>
      </v-row>
      <slot name="after" />
      <slot name="actions">
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
    </div>
  </v-form>
</template>

<script setup>
  import 'form/controls';
  import uiInput from 'form/controls/mixins/ui-input.vue';
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

  const useValidations = computed(() =>
    props.formConfig.some(({ rules, required }) => rules || required)
  );
  const hasDefaultParams = computed(
    () => Object.keys(props.defaultParams).length
  );
  const initFormDataByConfig = (formConfig = props.formConfig) =>
    formConfig.forEach(({ key, value }) => key && (props.value[key] = value));

  watch(
    () => props.formConfig,
    (formConfig) => {
      if (formConfig.length) {
        props.isNew &&
          (!Object.keys(props.value).length || hasDefaultParams.value) &&
          initFormDataByConfig(formConfig);
      }
    },
    { immediate: true, deep: true }
  );

  const onreset = () => form.value.resetValidation();

  const emit = defineEmits(['close-dialog']);
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
  const getRef = (config) =>
    props.formConfig.some((item) => item.show?.by === config.key)
      ? `input-${config.key}`
      : null;
</script>

<script>
  import getModelActionApi from 'module-utils/get-model-action-api';
  import { CREATE, UPDATE } from 'module-utils/CRUD';

  export default {
    name: 'FormView',
    model: {
      prop: 'value',
      event: 'change'
    },
    provide() {
      return {
        formView: this,
        useGrid: this.useGrid
      };
    },
    data() {
      return {
        valid: true,
        controlEmits: {}
      };
    },
    computed: {
      /*     useValidations() {
        return this.currentFormConfig.some(
          ({ rules, required }) => rules || required
        );
      },
      currentFormConfig() {
        return this.isNew
          ? this.formConfig.filter((config) => !config.editOnly)
          : this.formConfig;
      },*/
      hasDefaultParams() {
        return Object.keys(this.defaultParams).length;
      }
    }
    /*    watch: {
      formConfig: {
        immediate: true,
        deep: true,
        handler(formConfig) {
          if (formConfig.length) {
            this.isNew &&
              (!Object.keys(this.value).length || this.hasDefaultParams) &&
              this.initFormDataByConfig(formConfig);
          }
        }
      }
    }*/
    /*methods: {
      initFormDataByConfig(formConfig = this.formConfig) {
        formConfig.forEach(
          ({ type, key, value }) => key && this.$set(this.value, key, value)
        );
      },
      getRef(config) {
        return this.currentFormConfig.some(
          (item) => item.show?.by === config.key
        )
          ? `input-${config.key}`
          : null;
      },
      onreset() {
        this.$refs.form.resetValidation();
        this.initFormDataByConfig();
        this.$emit('search');
      },
      async submit() {
        this.useValidations && this.$refs.form.validate();
        await this.$nextTick();
        if (!this.valid) return;
        const postParams = { ...this.value, ...this.defaultParams };
        if (this.actionApi || this.action) {
          await this.$http.post(
            this.actionApi || getModelActionApi(this.model, this.action),
            postParams
          );
        } else {
          await (this.isNew ? CREATE : UPDATE)(this.model, postParams);
        }
        this.cancel();
        await this.$nextTick();
        this.$bus.emit('toast', {
          msg: '操作成功',
          shaped: true
        });
      },
      cancel() {
        this.initFormDataByConfig();
        this.inDialog ? this.$emit('close-dialog') : this.$router.back();
      }
    }*/
  };
</script>
