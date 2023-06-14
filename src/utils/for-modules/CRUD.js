import { useModuleStore } from 'store/modules-store';
import toCamelCase from 'utils/kebab-2-camel';

const getModule = () => {
  const { currentModule, currentMinorModule, modules } = storeToRefs(
    useModuleStore()
  );
  return {
    modules: modules.value,
    currentModule: currentModule.value,
    currentMinorModule: currentMinorModule.value
  };
};
const getCurrentModuleApi = ({ type, module }) => {
  const { modules, currentModule } = getModule();
  module = module || currentModule;
  const name = type === 'options' ? toCamelCase(`get-${module}-${type}`) : type;
  if (!modules[module])
    throw new Error(`'${module}' is an invalid ${type} module`);

  if (!modules[module].apis[name])
    throw new Error(
      `The module '${module}' hasn't '${name}' of CRUD, includes it in origin if you want to use it`
    );

  return `/${module}/${modules[module].apis[name]}`;
};
const request = async (...arg) => {
  const [type, module, formData] = arg;
  const isFullParams = arg.length === 3;
  const api = getCurrentModuleApi({
    type,
    module: isFullParams ? module : getModule().currentModule
  });
  return await $http.post(api, isFullParams ? formData : arg[arg.length - 1]);
};
const READ_LIST = (...arg) => request('list', ...arg);
const READ_DETAIL = (...arg) => request('detail', ...arg);
const CREATE = (...arg) => request('create', ...arg);
const UPDATE = (...arg) => request('update', ...arg);
const DELETE = (...arg) => request('delete', ...arg);

export { READ_LIST, READ_DETAIL, CREATE, UPDATE, DELETE };
