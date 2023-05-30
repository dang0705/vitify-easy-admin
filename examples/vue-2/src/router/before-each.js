import saveCurrentRoute from '@router/utils/save-current-route';

let isAsyncRouteAdded = false; // 异步动态路由是否已加载标志，防止无限挂载
let resetRouter = null;
// 此处不允许使用箭头函数导出，否则this指向出错
export default async function (to, from, next) {
  const { name, meta: { menuName, isMinors } = {}, path } = to;
  const paths = path.split('/');
  const $modelStore = saveCurrentRoute({
    currentMenuName: menuName,
    currentModel: paths[1],
    currentPath: path,
    currentMinorModel: isMinors ? name.split('.')[0] : ''
  });

  if (!isAsyncRouteAdded) {
    const [
      {
        value: { default: models2Modules }
      },
      {
        value: { default: modules2Routes }
      },
      {
        value: { default: addRoute }
      },
      {
        value: { default: notFound }
      }
    ] = await Promise.allSettled([
      import('vue-router-tools/models-2-modules'),
      import('vue-router-tools/modules-2-routes'),
      import('vue-router-tools/add-route'),
      import('@router/configuration/not-found')
    ]);

    console.log();
    const { default: models } = await import('@mock/models');
    console.log(models);
    const { moduleOptions, modules } = models2Modules(models);
    // await $modelStore.getModels()
    $modelStore.$patch((state) => {
      state.modules = modules;
      state.options = moduleOptions;
    });

    const routes = modules2Routes({
      modules
    });

    const { replaceTo, resetRouter: reset } = addRoute({
      to,
      routes,
      router: this,
      parentName: 'admin',
      notFound
    });
    resetRouter = reset;
    isAsyncRouteAdded = true;

    // 静态路由正常next , 动态路由使用replaceTo跳转
    replaceTo();
  } else {
    next();
  }
}
