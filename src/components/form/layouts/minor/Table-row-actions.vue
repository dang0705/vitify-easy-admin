<template>
  <div class="table-row-actions tw-flex tw-items-center">
    <template v-for="({ show, text, target, type, url }, index) in actions">
      <component
        :is="isTagA(url)"
        :key="text"
        v-bind="
          isTagA(url) === 'a'
            ? {
                href: url,
                target: target || '_blank',
                rel: 'noopener'
              }
            : {}
        "
        v-text="actionText(text)"
        v-if="show ? show(data) : true"
        :class="[
          'tw-text-primary',
          'tw-cursor-pointer',
          'hover:tw-underline',
          { 'tw-ml-2': index }
        ]"
        @click="
          isTagA(url) === 'a'
            ? null
            : rowActions({ type, action: actions[index] })
        "
      />
    </template>
  </div>
</template>

<script setup>
  import { DELETE } from 'module-utils/CRUD';
  import cfl from 'utils/capitalize-the-first-letter';
  import maybeFunctional from 'utils/maybe-functional';
  import getModelActionApi from 'module-utils/get-model-action-api';

  const idField = inject('idField', null);
  const module = inject('module', null);
  const refreshData = inject('refreshData', null);

  const props = defineProps({
    actionConfig: {
      type: [Array, Function],
      default: () => []
    },
    data: {
      type: Object,
      default: () => ({})
    },
    useDetailDialog: {
      type: Boolean,
      default: false
    }
  });

  const actions = computed(() =>
    maybeFunctional({
      data: props.actionConfig,
      params: [props.data, refreshData]
    })
  );
  const isTagA = (url) => (url ? 'a' : 'span');
  const actionText = (text) =>
    maybeFunctional({ data: text, params: [props.data] });

  const confirmMsg = ({
    body,
    id,
    showName,
    nameField,
    dataIdField,
    operate = '删除',
    confirmByOperate,
    otherMessage
  }) => ({
    msg: {
      body,
      name: showName ? props.data[nameField] || '' : '',
      id: id
        ? maybeFunctional({ data: id, params: [props.data] })
        : props.data[dataIdField],
      operate,
      confirmByOperate,
      otherMessage
    }
  });

  const emit = defineEmits(['open-action-dialog']);
  const methods = {
    async handleAction({ cb = null, action = null, params }) {
      await $http.post(getModelActionApi(module, action), params);
      cb && cb();
    },
    async handleEdit(action) {
      emit('open-action-dialog', {
        type: 'detail',
        data: props.data,
        action
      });
    },
    async handleDelete(action) {
      const {
        paramsIdField = idField,
        dataIdField = idField,
        multiple = false,
        model = '',
        operate = '删除',
        params = {}
      } = action;
      const { useConfirm } = await import('plugins/confirm');
      await useConfirm({
        ...confirmMsg(action),
        async onConfirm() {
          await DELETE(
            model || module,
            Object.assign({}, maybeFunctional({ data: params }), {
              [paramsIdField]: multiple
                ? [props.data[dataIdField]]
                : props.data[dataIdField]
            })
          );
          refreshData && refreshData();
        },
        toast: {
          msg: `${operate}成功`,
          shaped: true
        }
      });
    },
    async handleConfirm(action) {
      const { useConfirm } = await import('plugins/confirm');
      await useConfirm({
        ...confirmMsg(action),
        async onConfirm() {
          await $http.post(
            getModelActionApi(action.module || module, action),
            action.params
          );
          refreshData && refreshData();
        },
        toast: {
          msg: `${action.msg.operate || '操作'}成功`,
          shaped: true
        }
      });
    },
    async handleDialog(action) {
      useBus.emit('open-action-dialog', {
        type: 'action',
        action,
        data: props.data
      });
    }
  };
  const rowActions = ({ type, action }) =>
    methods[`handle${cfl(type)}`](action);
</script>
