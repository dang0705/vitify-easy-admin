<template>
  <div
    :class="[
      `page--${moduleName || 'common'}-detail`,
      'tw-flex',
      'tw-flex-col',
      'tw-h-full'
    ]"
  >
    <h2 class="title tw-py-4 tw-font-bold" v-text="formedTitle" />
    <v-divider class="tw-pb-4" />
    <slot name="nav" />
    <form-view
      v-if="configs.length || Object.keys(configs).length"
      v-bind="$attrs"
      v-model="formData"
      :module="moduleName"
      :extra-request-params="queryParams"
      :use-grid="$attrs.useGrid"
      :is-new="isNew"
    >
      <template v-for="(_, name) in $scopedSlots" #[name]="data">
        <slot
          :name="name"
          v-bind="{
            ...data,
            formConfig,
            formData,
            refreshData: getData
          }"
        />
      </template>
    </form-view>
  </div>
</template>

<script setup>
  import { READ_DETAIL } from 'module-utils/CRUD';
  import { useFormModulesProps } from 'form/layouts/composables';
  import { computed, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router/composables';
  import { useModuleStore } from 'store/modules-store';
  import { storeToRefs } from 'pinia';
  import { useFormConfigs, useModuleName } from 'form/layouts/composables';

  const { currentModule, currentMenuName } = storeToRefs(useModuleStore());
  const $router = useRouter();
  const $route = useRoute();
  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: [String, Number],
      default: 100
    },
    ...useFormModulesProps()
  });

  const configs = useFormConfigs(props.formConfig);
  provide('formConfig', configs);

  const moduleName = useModuleName(props.module);
  const routeParams = computed(() => $route.params);
  const queryParams = computed(() => ({
    ...routeParams.value,
    ...props.extraRequestParams
  }));
  const useEdit = computed(() => $route.params.edit);
  const isNew = computed(() => {
    const useCreate =
      !routeParams.value ||
      !Object.keys(routeParams.value).some(
        (params) => routeParams.value[params]
      );
    return !(useEdit.value || !useCreate);
  });
  const formedTitle = computed(
    () =>
      (isNew.value ? '创建' : '编辑') + (props.title || currentMenuName.value)
  );

  const formData = ref({});
  const getData = async () => {
    formData.value = await READ_DETAIL(currentModule.value, queryParams.value);
  };
  const init = () => !isNew.value && getData();
  watch(() => currentModule.value, init);
  !isNew.value && getData();
</script>
