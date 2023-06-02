//来源于 list 页面配置的 rowActions
export default {
  dialogShow: {
    type: Boolean,
    default: false
  },
  action: {
    type: String,
    default: ''
  },
  actionApi: {
    type: String,
    default: ''
  },
  isNew: {
    type: Boolean,
    default: false
  },
  modelName: {
    type: String,
    default: ''
  },
  title: {
    type: [String, Object],
    default: ''
  },
  helper: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default: () => ({})
  },
  ele: {
    type: [Array, Function],
    default: () => []
  },
  confirmConfig: {
    type: Object,
    default: () => ({})
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  onConfirm: {
    type: Function,
    default: null
  },
  onOpen: {
    type: Function,
    default: null
  },
  async: {
    type: Boolean,
    default: false
  },
  multiForms: {
    type: Array,
    default: () => []
  },
  formData: {
    type: Object,
    default: () => ({})
  },
  actionName: {
    type: String,
    default: ''
  },
  params: {
    type: Object,
    default: () => ({})
  },
  width: {
    type: [Number, String],
    default: 600
  },
  feedback: {
    type: Boolean,
    default: false
  },
  cb: {
    type: Function,
    default: null
  }
};
