import { ref } from 'vue';

let CURRENT_MODULE = 'currentModule';
let CURRENT_MODEL_NAME = 'currentModelName';
let MODULES = 'modules';
let OPTIONS = 'options';

export const _MODULES_ = ref({});

export const initModules = ({
  currentModule,
  currentModelName,
  modules,
  options
}) => {
  CURRENT_MODULE = currentModule;
  CURRENT_MODEL_NAME = currentModelName;
  MODULES = modules;
  OPTIONS = options;
  _MODULES_.value[CURRENT_MODULE] = '';
  _MODULES_.value[CURRENT_MODEL_NAME] = '';
  _MODULES_.value[MODULES] = {};
  _MODULES_.value[OPTIONS] = {};
};
export const updateModule = ({ currentModule, currentModelName }) => {
  if (Object.keys(_MODULES_).length) {
    _MODULES_.value[CURRENT_MODULE] = currentModule;
    _MODULES_.value[CURRENT_MODEL_NAME] = currentModelName;
  }
};
