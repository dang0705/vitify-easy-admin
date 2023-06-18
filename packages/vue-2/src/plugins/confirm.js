import Vue from 'vue';
import isAsyncFn from 'utils/is-async-fn';
import { helpers } from 'utils/helpers';
import { TOAST } from 'definition/emit-event';
import overlayMixins, { initPlugin } from 'plugins/overlay-mixins';
import {
  VOverlay,
  VCard,
  VCardTitle,
  VCardText,
  VSheet,
  VBtn
} from 'vuetify/lib/components';
import { useBus } from 'plugins/bus';

const loadingName = 'confirm';
const CONFIRM = ([
  {
    msg = {
      id: '',
      name: '',
      body: '',
      operate: '',
      multi: false,
      confirmByOperate: true,
      extraMsg: ''
    },
    confirmText = '确认',
    cancelText = '取消',
    hideCancel = false,
    onConfirm = null,
    onCancel = null,
    async = true,
    toast = {}
  }
]) => {
  const template = `
    <v-overlay 
      class='confirm-action'
      v-model="show"
      z-index="50"
      width="100%"
      height="100%"
      scroll-strategy="block"
      close-on-content-click
    >
      <v-card color='#fff' elevation='12' :class='["tw-px-2","tw-pt-4", "md:tw-px-20","tw-animate-scale"] '>
        <v-card-text class='tw-whitespace-pre-line tw-text-16 tw-text-black tw-text-center' v-html='msg' />
        <v-sheet
          color='#fff'
          class='tw-flex tw-justify-center tw-py-4 tw-w-full'
        >
          <v-btn
            v-bind='button'
            @click='onConfirm'
          >
            ${msg.confirmByOperate ? msg.operate : confirmText}
          </v-btn>
          <v-btn
            v-if='${!hideCancel}'
            v-bind='button'
            plain
            @click='onCancel'
          >
            ${cancelText}
          </v-btn>
        </v-sheet>
    </v-card>
    </v-overlay>`;
  const init = (resolve, reject) =>
    new Vue({
      template,
      name: 'confirm',
      components: { VOverlay, VCard, VCardTitle, VCardText, VSheet, VBtn },
      mixins: [overlayMixins],
      computed: {
        msg() {
          if (helpers.isString(msg)) {
            return msg;
          } else {
            const { id, multi, name, body, operate, extraMsg } = msg;
            const confirmBody = multi
              ? '选中'
              : id || name
              ? `${name ? ' 名' : ' ID'}为 <span class='tw-text-primary'>${
                  name || id
                } `
              : '所选';

            return `${`确定将${confirmBody}</span>的${body}<span class='tw-text-blue-400 tw-underline'> ${operate} </span>吗？${
              extraMsg || ''
            }`}`;
          }
        }
      },
      methods: {
        async onConfirm() {
          console.log(isAsyncFn(onConfirm));
          onConfirm
            ? isAsyncFn(onConfirm)
              ? await onConfirm()
              : onConfirm()
            : resolve && resolve();
          this.cancel();
          toast.msg && useBus.emit(TOAST, toast);
        },
        cancel() {
          this.show = false;
          this.destroyTimer = setTimeout(this.destroy, 1200);
        },
        async onCancel() {
          onCancel && (isAsyncFn(onCancel) ? await onCancel() : onCancel());
          this.cancel();
        }
      }
    });

  return initPlugin(async, init);
};

export default {
  install(vue) {
    vue.prototype.$confirm = (...arg) => CONFIRM(arg);
  }
};
export const useConfirm = (...arg) => CONFIRM(arg);
