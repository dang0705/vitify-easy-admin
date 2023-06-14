import { computed } from 'vue';
import { useModuleStore } from 'store/modules-store';
import { storeToRefs } from 'pinia';
import maybeFunctional from 'utils/maybe-functional';

export const useFormModulesProps = () => ({
  formConfig: {
    type: [Array, Object, Function],
    default: () => []
  },
  module: {
    type: String,
    default: ''
  },
  extraRequestParams: {
    type: [Object, Function],
    default: () => ({})
  }
});
export const useFormConfigs = (formConfig) => {
  formConfig.forEach(({ show }, index, self) => (self[index].show = show));
  return maybeFunctional({ data: formConfig });
};

export const useModuleName = (module) => {
  const { currentModule } = storeToRefs(useModuleStore());
  return computed(() => module || currentModule.value);
};
