// for async component
export default {
  InputText: () => import('./text.vue'),
  InputTextarea: () => import('./textarea.vue'),
  InputSelect: () => import('./select.vue'),
  InputCheckbox: () => import('./checkbox.vue'),
  InputRadio: () => import('./radio.vue'),
  InputUpload: () => import('./upload-file.vue')
};
