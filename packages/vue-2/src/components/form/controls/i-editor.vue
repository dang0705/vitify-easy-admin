<template>
  <v-input v-bind="vProps" :value="value">
    <Editor :id="id" v-model="value" :init="options" />
  </v-input>
</template>

<script>
  import createUid from 'utils/create-uid';
  import defineInputControl from 'form/controls/mixins/define-input-control';

  import Editor from '@tinymce/tinymce-vue';
  import tinymce from 'tinymce/tinymce';
  import 'tinymce/themes/silver';
  import 'tinymce/icons/default';
  import 'form/controls/tinymce/lang/editor-zh_CN';

  export default defineInputControl({
    components: {
      Editor
    },
    setup({ config }, _, { vProps }) {
      const id = vProps.value.id;
      //  tinymce http://tinymce.ax-z.cn/configure/integration-and-setup.php
      const options = {
        branding: false,
        content_css: '',
        skin_url: '/tinymce/skins/ui/oxide',
        selector: id,
        language: 'zh_CN',
        width: '100%'
      };
      return {
        id,
        options
      };
    }
  });
</script>
