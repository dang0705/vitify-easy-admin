<template>
  <v-dialog
    v-model="show"
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
            v-if="formConfig && formConfig.length"
            v-model="forms[index]"
            in-dialog
            :action-api="actionApi"
            :action="action"
            :module="module"
            :is-new="feedback ? !Object.keys(data).length : isNew"
            :default-params="defaultParams"
            :form-config="formConfig"
            @close-dialog="cancel"
          />
        </template>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { useModuleStore } from 'store/modules-store';
  import dialogProps from './define-props';
  import maybeFunction from 'utils/maybe-function';
  import dialogTitle from './dialog-title';

  defineOptions({
    name: 'ActionDialog',
    model: {
      event: 'update:dialogShow',
      prop: 'dialogShow'
    }
  });

  const props = defineProps(dialogProps);

  const title = dialogTitle(props.title, props.data);

  const emits = defineEmits(['update:dialogShow', 'close-dialog']);

  const formV = ref('');

  const show = computed({
    get: () => props.dialogShow,
    set: (value) => {
      emits('update:dialogShow', value);
    }
  });

  const keyName = inject('keyName', null);
  const module = computed(
    () =>
      props.module || inject('module', null) || useModuleStore().currentModule
  );

  let forms = ref(
    props.multiForms.length
      ? props.multiForms
      : [props.feedback ? { ...props.data } : { ...props.formData }]
  );

  const defaultParams = computed(() => ({
    ...(keyName && !props.isNew ? { [keyName]: props.data[keyName] } : {}),
    ...maybeFunction({ data: props.params, params: [props.data] })
  }));

  const formConfig = computed(() =>
    maybeFunction({ data: props.ele, params: [props.data] })
  );

  const cancel = () => {
    show.value = false;
    formV.value[0].onreset();
    emits('close-dialog');
  };
</script>
