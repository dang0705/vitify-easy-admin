<template>
  <div>
    <v-menu v-if="hasLogin" offset-y open-on-hover>
      <template #activator="{ on, attrs }">
        <div
          class="tw-flex tw-items-center tw-cursor-pointer"
          v-on="on"
          v-bind="attrs"
        >
          <v-avatar color="primary " class="tw-mr-2" size="36">
            <v-img v-if="userInfo.photo" :src="userInfo.photo" />
            <v-icon v-else color="white">mdi-account</v-icon>
          </v-avatar>
          <span v-text="`您好，${userInfo.name}`" class="tw-text-sm" />
        </div>
      </template>
      <v-list>
        <v-list-item
          v-for="({ title, action }, index) in menus"
          :key="index"
          class="tw-cursor-pointer"
          @click="action($route)"
        >
          <v-list-item-title>{{ title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      v-else
      color="primary"
      rounded
      @click="
        go2Route({
          from: $route.path,
          replace: true,
          base
        })
      "
    >
      登录
    </v-btn>
  </div>
</template>
<script setup>
  import go2Route from '@router/utils/union-go-2-route';
  import base from '@work-station-router/base';
  import { useUserInfoStore } from '@store/user-info-store';
  import { cookie, domain, TOKEN_KEY } from '@configs/cookies';
  import { useConfirm } from '@plugins/confirm';

  const props = defineProps({
    extraMenus: {
      type: Array,
      default: () => []
    }
  });
  const userInfoStore = useUserInfoStore();
  const { userInfo, hasLogin } = storeToRefs(userInfoStore);

  const logout = [
    {
      title: '退出',
      action: () =>
        useConfirm({
          msg: '是否退出本账号',
          confirmText: '退出',
          onConfirm() {
            cookie.remove(TOKEN_KEY, { path: '/', domain });
            userInfoStore.$patch((state) => (state.userInfo = {}));
            _appName_ === 'work-station' && go2Route();
          },
          toast: {
            msg: '已退出登录'
          }
        })
    }
  ];

  const menus = [...props.extraMenus, ...logout];
</script>
