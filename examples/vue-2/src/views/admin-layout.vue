<template>
  <v-sheet
    class="tw-w-full tw-pb-2 md:tw-pb-0 tw-flex md:tw-overflow-hidden tw-text-secondary"
  >
    <div>
      <h1 v-text="currentMenuName" class="tw-text-2xl tw-py-4 tw-font-bold" />
      <router-view />
    </div>
  </v-sheet>
</template>

<script setup>
  import { useAdminRoutes } from '@store/dynamic-routes-store';
  import { useModelStore } from '@store/current-route-model-store';

  const { currentMenuName, options } = storeToRefs(useModelStore());
  const { routes } = storeToRefs(useAdminRoutes());

  let dialogActions = ref({});
  const showDialog = ref(null);

  const noticeModel = 'message';
  const notice = async () => {
    showDialog.value = true;
    const key = 'classesId';

    dialogActions.value = {
      title: '发送通知',
      ele: [
        {
          type: 'select',
          key,
          label: '选择课群',
          required: true,
          options: statusOptions(options.value[noticeModel][key], false)
        },
        {
          type: 'text',
          key: 'title',
          label: '标题',
          required: true
        },
        {
          type: 'textarea',
          key: 'content',
          label: '内容',
          required: true
        }
      ]
    };
  };
</script>
