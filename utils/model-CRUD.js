import { useModelStore } from '@store/current-route-model-store';
import { $http } from '@plugins/http';
import toCamelCase from './kebab-case-2-camel-case';

// 所有应用models路径,导出名必须一致
const { models } = storeToRefs(useModelStore());

const getModel = () => {
  const { currentModel, currentMinorModel } = storeToRefs(useModelStore());
  return {
    currentModel: currentModel.value,
    currentMinorModel: currentMinorModel.value
  };
};

const getModelApiName = ({ type, model = getModel().currentModel }) => {
  const name = type === 'options' ? toCamelCase(`get-${model}-${type}`) : type;
  if (!models.value[model]) {
    throw new Error(`'${model}' is invalid ${type} model`);
  }
  return `/${model}/${models.value[model].apis[name]}`;
};
const getModelList = async (model = getModel().currentModel, formData = {}) => {
  return await $http.get(
    getModelApiName({
      type: 'list',
      model
    }),
    { params: formData }
  );
};
const fetch = async (...arg) => {
  const [type, model, formData] = arg;
  const isFullParams = arg.length === 3;
  return await $http.post(
    getModelApiName({
      type,
      model: isFullParams ? model : getModel().currentModel
    }),
    isFullParams ? formData : arg[arg.length - 1]
  );
};
const createModel = async (...arg) => fetch('create', ...arg);
const getModelDetail = async (...arg) => fetch('detail', ...arg);
const updateModel = async (...arg) => fetch('update', ...arg);
const deleteModel = async (...arg) => fetch('delete', ...arg);

export { getModelList, getModelDetail, createModel, updateModel, deleteModel };
