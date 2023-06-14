<template>
  <v-input validate-on-blur :rules="bind.rules" :value="value">
    <Editor :id="id" v-model="value" :init="editorInit" />
  </v-input>
</template>

<script>
  import createUid from 'utils/create-uid';
  import defineInputControl from 'form/controls/mixins/define-input-control';

  import Editor from '@tinymce/tinymce-vue';
  import tinymce from 'tinymce/tinymce';
  import 'tinymce/themes/silver';
  import 'tinymce/icons/default';
  import 'tinymce/skins/ui/oxide/skin.css';
  import 'form/controls/tinymce/lang/editor-zh_CN';

  export default defineInputControl({
    name: 'editor',
    components: {
      Editor
    },
    setup({ config }) {
      const id = `i-editor-${config.key}-${createUid()}`;

      //  tinymce http://tinymce.ax-z.cn/configure/integration-and-setup.php
      const editorInit = {
        branding: false,
        selector: id,
        language: 'zh_CN',
        width: '100%'
      };
      return {
        id,
        editorInit
      };
    }
  });
</script>
