export const useModuleStore = defineStore('admin-module-store', {
  state: () => ({
    currentMinorModule: '',
    currentModule: '',
    currentMenuName: '',
    currentRoute: '',
    currentPath: '',
    modules: {},
    options: {}
  }),
  actions: {
    async getModels() {
      return await $http.get();
    }
  }
});
