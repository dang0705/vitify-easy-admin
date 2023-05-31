<template>
  <div>
    <v-app-bar
      app
      :height="height[mobile ? 'mobile' : 'default']"
      color="#fff"
      class="tw-z-20"
      prominent
    >
      <div
        :class="[
          'tw-flex',
          'tw-items-center',
          'tw-justify-between',
          'tw-w-full',
          'tw-h-full',
          ...paddingX
        ]"
      >
        <img
          :src="globalImages[logo]"
          style="height: 60%"
          class="tw-cursor-pointer"
          @click="
            go2Route({
              path: '/',
              selfApp: 'front'
            })
          "
        />

        <div class="tw-flex tw-items-center tw-justify-around">
          <div class="tw-flex tw-items-center" v-if="app === 'front'">
            <!--      todo 搜索功能暂时推迟-->
            <v-text-field
              clearable
              outlined
              rounded
              dense
              hide-details
              placeholder="请输入关键词搜索"
              v-model="query"
              @keydown.enter="
                /*  go2Route({
                path: '/search',
                selfApp: 'front',
                query: { query }
              })*/
              "
            >
              <template #append>
                <v-icon
                  class="tw-cursor-pointer hover:tw-text-primary tw-px-2"
                  @click="
                    /* go2Route({
                    path: '/search',
                    selfApp: 'front',
                    query: { query }
                  })*/
                  "
                >
                  mdi-magnify
                </v-icon>
              </template>
            </v-text-field>
          </div>

          <LoginUserInfo v-if="!mobile" class="tw-mx-10" />

          <div
            v-if="navigation"
            class="tw-flex tw-items-center tw-cursor-pointer tw-group"
            @click.stop="drawer.show = true"
          >
            <v-icon class="group-hover:tw-text-primary">mdi-menu</v-icon>
            <span
              class="tw-text-14 group-hover:tw-text-primary tw-flex-shrink-0"
              v-if="!mobile"
            >
              &nbsp; 更多功能
            </span>
          </div>
        </div>
      </div>
    </v-app-bar>
    <slot name="navigation" v-bind="{ drawer }" />
    <!--    <DrawerNavMenu
      v-if="drawerItems.length"
      v-model="drawer"
      fixed
      temporary
      right
      :menus="drawerItems"
    >
      <template #prepend v-if="__MOBILE">
        <LoginUserInfo />
      </template>
    </DrawerNavMenu>-->
  </div>
</template>

<script setup>
  import paddingX from '@/define/padding-x';
  import go2Route from '@router/utils/union-go-2-route';
  import height from '@/define/app-top-bar-height';
  import LoginUserInfo from '@components/function/Login-user-info.vue';

  const props = defineProps({
    logo: {
      type: String,
      default: 'logo'
    },
    navigation: {
      type: Boolean,
      default: false
    }
  });

  const app = ref(_appName_);
  const {
    proxy: {
      $vuetify: {
        breakpoint: { mobile }
      }
    }
  } = getCurrentInstance();

  let query = ref('');
  let drawer = ref({ show: false });
  const group = ref(null);

  const search = ($router) =>
    query.value && $router.push({ name: 'search', params: { query } });
</script>
