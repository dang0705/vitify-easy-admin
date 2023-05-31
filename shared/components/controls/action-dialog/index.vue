<template>
  <v-dialog
    v-model="show"
    :fullscreen="__MOBILE || fullscreen"
    :max-width="width"
    @keydown.esc="show = false"
    scrollable
    persistent
  >
    <v-card>
      <template v-if="title">
        <v-card-title class="tw-flex tw-justify-between">
          <div v-html="title" />
          <v-icon @click="show = false">mdi-window-close</v-icon>
        </v-card-title>
        <v-divider />
      </template>
      <v-card-text class="tw-p-6">
        <template v-for="(_, index) in forms">
          <form-view
            ref="formV"
            v-if="formConfigs && formConfigs.length"
            v-model="forms[index]"
            in-dialog
            :action-api="actionApi"
            :action="action"
            :model="model"
            :is-new="feedback ? !Object.keys(data).length : isNew"
            :default-params="defaultParams"
            :form-config="formConfigs"
            @close-dialog="cancel"
          />
        </template>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { CLOSE_DIALOG } from '@/define/emit-event';
  import { useModelStore } from '@store/current-route-model-store';
  import dialogProps from '@controls/action-dialog/define-props';
  import maybeFunctional from '@utils/maybe-functional';
  import dialogTitle from '@controls/action-dialog/dialog-title';

  defineOptions({
    name: 'ActionDialog',
    model: {
      event: 'update:dialogShow',
      prop: 'dialogShow'
    }
  });

  const props = defineProps(dialogProps);

  const title = dialogTitle(props.title, props.data);

  const emits = defineEmits(['update:dialogShow', CLOSE_DIALOG]);

  const formV = ref('');

  const show = computed({
    get: () => props.dialogShow,
    set: (value) => {
      emits('update:dialogShow', value);
    }
  });

  const keyName = inject('keyName', null);
  const model =
    props.modelName || inject('model', null) || useModelStore().currentModel;

  let forms = ref(
    props.multiForms.length
      ? props.multiForms
      : [props.feedback ? { ...props.data } : { ...props.formData }]
  );

  const defaultParams = computed(() => ({
    ...(keyName && !props.isNew ? { [keyName]: props.data[keyName] } : {}),
    ...maybeFunctional({ data: props.params, params: [props.data] })
  }));

  const formConfigs = computed(() =>
    maybeFunctional({ data: props.ele, params: [props.data] })
  );

  const cancel = () => {
    show.value = false;
    formV.value[0].onreset();
    emits(CLOSE_DIALOG);
  };
</script>
