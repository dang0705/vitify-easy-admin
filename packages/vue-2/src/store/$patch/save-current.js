import { useModuleStore } from 'store/modules-store';
export default ({
  currentModule,
  currentMenuName,
  currentMinorModel,
  currentPath
}) => {
  const $modelStore = useModuleStore();
  $modelStore.$patch((state) => {
    state.currentModule = currentModule;
    state.currentMenuName = currentMenuName;
    state.currentMinorModel = currentMinorModel;
    state.currentPath = currentPath;
  });
  return $modelStore;
};
