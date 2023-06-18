import { useModuleStore } from 'store/modules-store';

export default (module, action) =>
  `/${module}/${useModuleStore().modules[module].actions[action]}`;
