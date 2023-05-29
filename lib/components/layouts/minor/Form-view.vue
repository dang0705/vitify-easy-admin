<template>
  <v-form class="form-view" v-model="valid" ref="form" lazy-validation>
    <div class="form-items">
      <slot name="before" />

      <v-row v-if="useGrid" class="tw-my-0">
        <v-col
          cols="12"
          md="4"
          v-for="configData in formConfig"
          :key="configData.key"
        >
          <component
            :ref="ref(configData)"
            :is="`input-${configData.type}`"
            :config="configData"
            :form-configs="formConfig"
            :form-data="formData"
            @change="onChange"
          >
            <template v-for="(_, name) in $scopedSlots" #[name]="{ options }">
              <slot
                :name="name"
                :field="configData.key"
                :value="value[configData.key]"
                :options="options || []"
              />
            </template>
          </component>
        </v-col>
      </v-row>
      <template v-else>
        <template v-for="configData in currentFormConfig">
          <template>
            <div
              v-if="configData.title || configData.subTitle"
              :style="configData.titleStyle"
              class="title"
            >
              <h3 v-html="configData.title"></h3>
              <section v-html="configData.subTitle"></section>
            </div>
            <component
              :key="configData.key"
              :ref="ref(configData)"
              :is="`input-${configData.type}`"
              :config="configData"
              :form-configs="currentFormConfig"
              :form-data="formData"
              :data-source="formData"
              @change="onChange"
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
          </template>
        </template>
      </template>

      <slot name="after" />
      <slot name="actions">
        <v-sheet class="tw-flex tw-justify-center">
          <template v-if="useGrid">
            <v-btn
              class="tw-mx-2 tw-py-2 tw-h-8"
              elevation="2"
              rounded
              color="primary"
              @click="$emit('search')"
            >
              查询
            </v-btn>
            <v-btn
              class="tw-mx-2 tw-py-2 tw-h-8"
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
              class="tw-mx-2 tw-py-2 tw-h-8 tw-px-6"
              elevation="2"
              rounded
              color="primary"
              @click="submit"
            >
              保存
            </v-btn>
            <v-btn
              class="tw-mx-2 tw-py-2 tw-h-8 tw-px-6"
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

<script>
  import getModelActionApi from '@admin-utils/get-model-action-api';
  import components from '@admin-controls';
  import { createModel, updateModel } from '@admin-utils/model-CRUD';
  import { CLOSE_DIALOG, TOAST } from '@/define/emit-event';

  export default {
    name: 'FormView',
    model: {
      prop: 'value',
      event: 'change'
    },
    components,
    provide() {
      return {
        formView: this,
        useGrid: this.useGrid
      };
    },
    props: {
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
    },
    data() {
      return {
        formData: {},
        controlsAllRendered: false,
        valid: true
      };
    },
    computed: {
      useValidations() {
        return this.currentFormConfig.some(
          ({ rules, required }) => rules || required
        );
      },

      currentFormConfig() {
        return this.isNew
          ? this.formConfig.filter((config) => !config.editOnly)
          : this.formConfig;
      },
      hasDefaultParams() {
        return Object.keys(this.defaultParams).length;
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(val, old) {
          !this.isNew && (this.formData = val);

          // fix: revert control components default value for controlled display
          this.currentFormConfig.some((config) => config.control) &&
            old &&
            Object.keys(old).length &&
            !Object.keys(val).length &&
            this.currentFormConfig
              .filter((config) => config.control)
              .forEach(({ key, value }) =>
                this.$set(this.formData, key, value)
              ) &&
            this.$emit('change', this.formData);
        }
      },
      currentFormConfig: {
        immediate: true,
        handler(formConfig) {
          if (formConfig.length) {
            this.isNew &&
              (!Object.keys(this.formData).length || this.hasDefaultParams) &&
              this.initFormDataByConfig(formConfig);
          }
        }
      }
    },
    methods: {
      initFormDataByConfig(formConfig = this.formConfig) {
        formConfig.forEach(
          ({ type, key, value }) => key && this.$set(this.formData, key, value)
        );
        this.$emit('change', this.formData);
        return this.formData;
      },
      onChange(key, value) {
        this.$set(this.formData, key, value);
        this.$emit('change', this.formData);
      },
      ref(config) {
        return this.currentFormConfig.some(
          (item) => item.controlled?.by === config.key
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
        const postParams = { ...this.value, ...defaultParams };
        if (this.actionApi || this.action) {
          await this.$http.post(
            this.actionApi || getModelActionApi(this.model, this.action),
            postParams
          );
        } else {
          await (this.isNew ? createModel : updateModel)(
            this.model,
            postParams
          );
        }
        this.cancel();
        await this.$nextTick();
        this.$bus.emit(TOAST, {
          msg: '操作成功',
          shaped: true
        });
      },
      cancel() {
        this.initFormDataByConfig();
        this.inDialog ? this.$emit(CLOSE_DIALOG) : this.$router.back();
      }
    }
  };
</script>
