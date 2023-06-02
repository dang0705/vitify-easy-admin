<template>
  <ui-input-field
    v-show="display"
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <v-sheet>
      <v-btn
        class="tw-relative tw-box-border tw-px-0 tw-mt-6"
        elevation="2"
        color="primary"
      >
        <v-icon> mdi-cloud-upload </v-icon>
        &nbsp;点击上传
        <input
          type="file"
          :accept="
            $vuetify.breakpoint.mobile
              ? `${config.fileType || 'image'}/*`
              : accept.map((file) => `.${file}`)
          "
          :multiple="config.multiple"
          @change="onChangeFile"
          class="tw-opacity-0 tw-absolute tw-w-full tw-h-full tw-cursor-pointer tw-text-0"
        />
      </v-btn>

      <div v-text="suggestion" class="tw-my-4 tw-text-primary tw-text-sm" />

      <v-row>
        <v-col v-for="{ url, name } in value" :key="name">
          <v-img
            :src="url"
            :width="imgDisplaySize.width"
            :height="imgDisplaySize.height"
            class="tw-rounded-md tw-bg-primary"
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-sheet>
    <slot :name="afterSlotName" />
  </ui-input-field>
</template>

<script>
  import UiInputField from '@admin-controls-mixins/input-field.vue';
  import collection2Array from '@utils/collection-2-array';
  import formItemMixin from '@admin-controls-mixins/form-item';
  import { useBus } from '@bus';
  import getFileExt from '@utils/get-file-ext';
  import qiniuUpload from '@utils/qiniu-upload';
  import { $http } from '@plugins/http';

  export default {
    name: 'InputUpload',
    mixins: [formItemMixin],
    components: { UiInputField },
    data() {
      return {
        name: '',
        ext: ''
      };
    },
    computed: {
      imgDisplaySize() {
        return {
          width: this.config.previewWidth || 225,
          height: this.config.previewHeight || 130
        };
      },
      size() {
        return (+this.config.size || 10) * 1024 * 1024;
      },
      sizeSemantics() {
        return `${this.size / (1024 * 1024)}M`;
      },
      accept() {
        const accept = [];
        switch (this.config.fileType) {
          case 'audio':
            accept.push('mp3', 'wmv');
            break;
          case 'video':
            accept.push('mp4');
            break;
          default:
            accept.push('jpg', 'jpeg', 'png', 'bmp');
        }
        return accept;
      },
      suggestion() {
        return `建议尺寸：${this.config.sizeInfo || '225 × 130'}`;
      },
      multiple() {
        return this.config.multiple;
      }
    },
    methods: {
      validImg(files) {
        let err = '';
        const isImgInvalid = files.some(({ size, path, name }) => {
          this.ext = getFileExt(path || name);
          this.name = name;
          const overSize = size > this.size;
          const notAccept = !this.accept.includes(this.ext);
          switch (true) {
            case overSize:
              err = `上传的文件${
                this.config.count > 1 ? '中，有一些' : ''
              }超出了${this.sizeSemantics}大小的限制`;
              break;
            case notAccept:
              err = '不支持所传文件';
              break;
          }
          return overSize || notAccept;
        });
        if (isImgInvalid) {
          useBus.emit('err', err);
          return false;
        } else {
          return true;
        }
      },
      async onChangeFile({ target: { files } }) {
        const arrayifyFiles = collection2Array(files);
        const value = [];
        if (this.validImg(arrayifyFiles)) {
          const { token } = await $http.get('/qiniu/token/get');
          arrayifyFiles.forEach(async ({ name }) => {
            try {
              const responsedFile = await qiniuUpload({
                ext: this.ext,
                files,
                token
              });
              value.push({ name, url: responsedFile });
              this.value = value;
            } catch (e) {
              this.$emit('on-err', '服务器繁忙，请稍后');
            } finally {
              this.$bus.emit('off-loading');
            }
          });
        }
      }
    }
  };
</script>
<style scoped lang="postcss">
  .yooc-field--upload {
    ::v-deep .v-btn__content {
      width: 100%;
      height: 100%;
      margin: 0 12px 0;
      cursor: pointer;
    }
  }
</style>
