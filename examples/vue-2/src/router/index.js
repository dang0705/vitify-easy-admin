import Router from 'vue-router';
import Vue from 'vue';
import routes from '@vue-2-router/routes';
import { useAdminRoutes } from '@store/dynamic-routes-store';
import saveCurrentRoute from '@router/utils/save-current-route';

Vue.use(Router);
export const router = new Router({
  routes
});
router.beforeEach(async (to, from, next) => {
  const { name, meta: { menuName, isMinors } = {}, path } = to;
  const paths = path.split('/');
  const $routesStore = useAdminRoutes();
  const $modelStore = saveCurrentRoute({
    currentMenuName: menuName,
    currentModel: paths[1],
    currentPath: path,
    currentMinorModel: isMinors ? name.split('.')[0] : ''
  });
  next();
});
