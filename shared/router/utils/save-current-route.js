import { useModelStore } from '@store/current-route-model-store';
import store from '@store';
export default ({
  currentModel,
  currentMenuName,
  currentMinorModel,
  currentPath
}) => {
  const $modelStore = useModelStore(store);
  $modelStore.$patch((state) => {
    state.currentModel = currentModel;
    state.currentMenuName = currentMenuName;
    state.currentMinorModel = currentMinorModel;
    state.currentPath = currentPath;
  });
  return $modelStore;
};
