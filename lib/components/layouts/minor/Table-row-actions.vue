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

<script>
  import { deleteModel } from '@admin-utils/model-CRUD';
  import { OPEN_ACTION_DIALOG } from '@/define/emit-event';
  import cfl from '@utils/capitalize-the-first-letter';
  import tableActionConfig from '@admin-utils/table-action-config';
  import maybeFunctional from '@utils/maybe-functional';
  import getModelActionApi from '@admin-utils/get-model-action-api';
  import { useBus } from '@bus';

  export default {
    name: 'TableRowActions',
    mixins: [tableActionConfig],
    inheritAttrs: false,
    props: {
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
    },
    data() {
      return {
        OPEN_ACTION_DIALOG
      };
    },

    computed: {
      actions() {
        return maybeFunctional({
          data: this.actionConfig,
          params: [this.data, this.refreshData]
        });
      }
    },
    methods: {
      isTagA(url) {
        return url ? 'a' : 'span';
      },
      rowActions({ type, action }) {
        return this[`handle${cfl(type)}`](action);
      },
      confirmMsg(action) {
        const {
          body,
          id,
          showName,
          nameField,
          dataIdField,
          operate = '删除',
          confirmByOperate,
          otherMessage
        } = action;
        return {
          msg: {
            body,
            name: showName ? this.data[nameField] || '' : '',
            id: id
              ? maybeFunctional({ data: id, params: [this.data] })
              : this.data[dataIdField],
            operate,
            confirmByOperate,
            otherMessage
          }
        };
      },
      async handleAction({ cb = null, action = null, params }) {
        await this.$http.post(getModelActionApi(this.model, action), params);
        cb && cb();
      },
      async handleEdit(action) {
        this.$emit(OPEN_ACTION_DIALOG, {
          type: 'detail',
          data: this.data,
          action
        });
      },
      async handleDelete(action) {
        const {
          paramsIdField = this.keyName,
          dataIdField = this.keyName,
          multiple = false,
          model = '',
          operate = '删除',
          params = {}
        } = action;
        const { useConfirm } = await import('@plugins/confirm');
        await useConfirm({
          ...this.confirmMsg(action),
          async onConfirm() {
            await deleteModel(
              model || this.model,
              Object.assign({}, maybeFunctional({ data: params }), {
                [paramsIdField]: multiple
                  ? [this.data[dataIdField]]
                  : this.data[dataIdField]
              })
            );
            this.refreshData();
          },
          toast: {
            msg: `${operate}成功`,
            shaped: true
          }
        });
      },
      async handleConfirm(action) {
        const { useConfirm } = await import('@plugins/confirm');
        await useConfirm({
          ...this.confirmMsg(action),
          async onConfirm() {
            await this.$http.post(
              getModelActionApi(action.model || this.model, action),
              action.params
            );
            this.refreshData();
          },
          toast: {
            msg: `${action.msg.operate || '操作'}成功`,
            shaped: true
          }
        });
      },
      async handleDialog(action) {
        useBus.emit(OPEN_ACTION_DIALOG, {
          type: 'action',
          action,
          data: this.data
        });
      },

      actionText(text) {
        return maybeFunctional({ data: text, params: [this.data] });
      }
    }
  };
</script>
