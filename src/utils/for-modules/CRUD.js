import { useModuleStore } from 'store/modules-store';
import toCamelCase from 'utils/kebab-2-camel';

const { modules } = storeToRefs(useModuleStore());

const getModule = () => {
  const { currentModule, currentMinorModule } = storeToRefs(useModuleStore());
  return {
    currentModule: currentModule.value,
    currentMinorModule: currentMinorModule.value
  };
};
const getCurrentModuleApi = ({ type, module = getModule().currentModule }) => {
  const name = type === 'options' ? toCamelCase(`get-${module}-${type}`) : type;
  if (!modules.value[module])
    throw new Error(`'${module}' is an invalid ${type} module`);

  if (!modules.value[module].apis[name])
    throw new Error(
      `The module '${module}' hasn't '${name}' of CRUD, includes it in origin if you want to use it`
    );

  return `/${module}/${modules.value[module].apis[name]}`;
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
