import staticRoutes, { adminRoot } from 'router/routes';
import saveCurrent from 'store/$patch/save-current';
import { useAdminRoutes } from 'store/routes-store';
let isAsyncRouteAdded = false; // Is the flag loaded for async dynamic routing to prevent infinite mounting
let resetRouter = null;

// Arrow function export is not allowed here, otherwise this points to an error
export default async function (to, from, next) {
  const { name, meta: { menuName, isMinors } = {}, path } = to;
  const isStaticRoute = staticRoutes.some(
    ({ name: staticRoute }) => name === staticRoute
  );
  const paths = path.split('/');
  const $routesStore = useAdminRoutes();
  const $modelStore = saveCurrent({
    currentMenuName: menuName,
    currentModule: paths[1],
    currentPath: path,
    currentMinorModule: isMinors ? name.split('.')[0] : ''
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
      import('router/not-found')
    ]);

    // please replace the backend interface here
    const { default: models } = await import('mock/models');

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
      parentName: adminRoot
      // notFound
    });
    resetRouter = reset;
    isAsyncRouteAdded = true;

    // Static routing is normal next, while dynamic routing uses replaceTo to jump
    isStaticRoute ? redirect() : replaceTo();
  } else {
    redirect();
  }
}
