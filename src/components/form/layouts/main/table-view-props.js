export default {
  createBtnText: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'table'
  },
  thead: {
    type: Array,
    default: () => []
  },
  tbody: {
    type: Array,
    default: () => []
  },
  module: {
    type: String,
    default: null
  },
  sort: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Boolean,
    default: false
  },
  rowActions: {
    type: [Array, Function],
    default: () => []
  },
  searchFormConfig: {
    type: Array,
    default: () => []
  },
  idKey: {
    type: String,
    default: 'id'
  },
  useDetailDialog: {
    type: Boolean,
    default: true
  },
  createFormConfig: {
    type: Object,
    default: () => ({})
  },
  dialogDetailFormConfig: {
    type: Array,
    default: () => []
  },
  itemClass: {
    type: [Function, String],
    default: () => {
      return 'v-tr';
    }
  }
};
