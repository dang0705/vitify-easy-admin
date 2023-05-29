// for async component
export default {
  InputText: () => import('./text.vue'),
  InputTextarea: () => import('./textarea.vue'),
  // InputNumber: () => import('./number.vue'),
  InputSelect: () => import('./select.vue'),
  // InputSwitch: () => import('./switch.vue'),
  InputCheckbox: () => import('./checkbox.vue'),
  InputRadio: () => import('./radio.vue'),
  // InputRangepicker: () => import('./rangepicker.vue'),
  InputUpload: () => import('./upload-file.vue')
};
