<template>
  <div class="tw-h-full">
    <action-dialog
      v-if="dialogDefaultStatus.show !== null"
      v-model="dialogDefaultStatus.show"
      v-bind="dialogDefaultStatus"
    />
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="tw--left-50p tw--top-50p tw-fixed tw-h-full tw-w-full tw-translate-x-1/2 tw-translate-y-1/2 tw-transform"
      style="z-index: 9999"
    />
    <v-snackbar
      v-else-if="captureStatus.toast"
      v-model="captureStatus.show"
      v-bind="captureStatus"
    >
      {{ captureStatus.msg }}
      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click="captureStatus.show = false">
          关闭
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay
      v-else
      v-model="captureStatus.show"
      z-index="999"
      width="100%"
      height="100%"
      scroll-strategy="block"
      close-on-content-click
    >
      <v-alert
        v-if="!captureStatus.confirm"
        :type="captureStatus.type"
        colored-border
        dismissible
        elevation="12"
        border="left"
        rounded
        position="fixed"
        width="100vw"
        max-width="500px"
        location="center"
        variant="text"
      >
        {{ captureStatus.msg }}
        <template #close>
          <v-btn
            :color="captureStatus.type === 'error' ? 'primary' : ''"
            @click.passive="captureStatus.show = false"
          >
            知道了
          </v-btn>
        </template>
      </v-alert>
      <v-card v-else width="50vw" color="#fff">
        <v-card-title
          class="tw-flex tw-justify-center tw-text-black"
          v-text="captureStatus.title"
        />
        <v-card-text v-html="captureStatus.msg" class="tw-text-black" />
        <v-sheet
          color="#fff"
          class="tw-flex tw-w-full tw-justify-center tw-py-4"
        >
          <v-btn
            class="tw-mx-2 tw-h-8 tw-py-2"
            elevation="2"
            rounded
            color="primary"
            @click="captureStatus.confirm"
          >
            确 认
          </v-btn>
          <v-btn
            class="tw-mx-2 tw-h-8 tw-py-2"
            elevation="2"
            rounded
            plain
            color="primary"
            @click="captureStatus.show = false"
          >
            取 消
          </v-btn>
        </v-sheet>
      </v-card>
    </v-overlay>
  </div>
</template>

<script setup>
  import ActionDialog from 'components/controls/action-dialog/index.vue';
  import { useBus } from 'plugins/bus';
  import {
    GLOBAL_LOADING,
    TOAST,
    CONFIRM,
    DIALOG
  } from 'definition/emit-event';
  import { useConfirm } from 'plugins/confirm';
  const dialogDefaultStatus = reactive({
    show: null
  });
  const captureStatus = reactive({
    show: false,
    title: '请确认',
    msg: '是否确认',
    type: '',
    confirm: null,
    toast: false,
    timeout: 1500,
    color: 'green'
  });

  const loading = ref(false);

  useBus.on(GLOBAL_LOADING, (isLoading) => (loading.value = isLoading));

  useBus.on('err', ({ msg, type = 'error' }) => {
    captureStatus.show = true;
    captureStatus.msg = msg;
  });

  useBus.on(TOAST, ({ msg, ...props }) => {
    captureStatus.show = captureStatus.toast = true;
    captureStatus.msg = msg;
    for (let prop in props) {
      captureStatus[prop] = props[prop];
    }
  });

  useBus.on(CONFIRM, ({ msg, onConfirm, confirmText, toast, ...others }) => {
    console.log(msg);
    useConfirm({ msg, confirmText, toast, onConfirm, ...others });
  });
  useBus.on(DIALOG, (props) => {
    dialogDefaultStatus.show = true;
    for (let prop in props) {
      dialogDefaultStatus[prop] = props[prop];
    }
  });
</script>
