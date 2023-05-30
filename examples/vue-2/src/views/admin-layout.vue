<template>
  <v-sheet
    class="tw-w-full tw-pb-2 md:tw-pb-0 tw-flex md:tw-overflow-hidden tw-text-secondary"
  >
    <Drawer-nav-menu
      color="secondary"
      shaped
      static
      expend
      :menus="routes"
      v-if="!__MOBILE"
    >
      <template #list-icon="{ name }">
        <v-icon color="white" v-text="menuIcons[name.split('.')[0]]" />
      </template>
      <template #list-Name="{ name }">
        <v-list-item-title v-text="name" class="tw-text-white" />
      </template>
    </Drawer-nav-menu>
    <div :class="[...layoutClasses, 'md:tw-overflow-auto']">
      <h1 v-text="currentMenuName" class="tw-text-2xl tw-py-4 tw-font-bold" />
      <router-view />
    </div>
  </v-sheet>
</template>

<script setup>
  import { useAdminRoutes } from '@work-station-store/dynamic-routes-store';
  import { useModelStore } from '@store/current-route-model-store';
  import { useUserInfoStore } from '@store/user-info-store';
  import statusOptions from '@admin-utils/status-options';
  import menuIcons from '@work-station-configs/menu-icons';
  import DrawerNavMenu from '@components/layouts/Drawer-nav-menu.vue';
  import layoutClasses from '@work-station-configs/layout-classes';

  const { currentMenuName, options } = storeToRefs(useModelStore());
  const { userInfo, isTeacher } = storeToRefs(useUserInfoStore());
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
