import saveCurrentRoute from '@router/utils/save-current-route';
import { useAdminRoutes } from '@store/dynamic-routes-store';
import staticRoutes from '@vue-2-router/routes';
let isAsyncRouteAdded = false; // 异步动态路由是否已加载标志，防止无限挂载
let resetRouter = null;
// 此处不允许使用箭头函数导出，否则this指向出错
export default async function (to, from, next) {
  const { name, meta: { menuName, isMinors } = {}, path } = to;
  const isStaticRoute = staticRoutes.some(
    ({ name: staticRoute }) => name === staticRoute
  );
  const paths = path.split('/');
  const $routesStore = useAdminRoutes();
  const $modelStore = saveCurrentRoute({
    currentMenuName: menuName,
    currentModel: paths[1],
    currentPath: path,
    currentMinorModel: isMinors ? name.split('.')[0] : ''
  });
  const redirect = () =>
    next({
      ...(name === 'admin'
        ? { name: $routesStore.routes[0].name, replace: true }
        : {})
    });
  if (!isAsyncRouteAdded) {
    const [
      {
        value: { default: modulesAndRoutes }
      },
      {
        value: { default: addRoute }
      },
      {
        value: { default: notFound }
      }
    ] = await Promise.allSettled([
      import('vue-router-tools/modules-and-routes'),
      import('vue-router-tools/add-route'),
      import('@router/configuration/not-found')
    ]);

    const { default: models } = await import('@mock/models');
    const { moduleOptions, modules, routes } = modulesAndRoutes({
      models,
      pages: import.meta.glob('/src/views/admin/**/**/*.vue')
    });
    // await $modelStore.getModels()
    $modelStore.$patch((state) => {
      state.modules = modules;
      state.options = moduleOptions;
    });
    $routesStore.$patch((state) => (state.routes = routes));
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
    isStaticRoute ? redirect() : replaceTo();
  } else {
    next();
  }
}
