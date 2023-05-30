// import { $http } from '@plugins/http';

export const useModelStore = defineStore('model-store', {
  state: () => ({
    currentMinorModel: '',
    currentModel: '',
    currentMenuName: '',
    currentRoute: '',
    currentPath: '',
    crumbs: [],
    modules: {},
    options: {}
  })
});
