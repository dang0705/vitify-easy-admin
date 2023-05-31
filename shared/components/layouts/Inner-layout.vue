<template>
  <div
    :class="[
      'inner-layout',
      'tw-flex',
      'tw-flex-col',
      { 'tw-h-full': fullHeight }
    ]"
  >
    <v-img v-if="topBanner" :src="topBanner" contain style="flex-grow: unset" />
    <div
      v-if="crumbs.length > 1"
      :class="[
        ...(breadCrumbsClass.length ? breadCrumbsClass : paddingX),
        'tw-flex',
        'tw-flex-col'
      ]"
    >
      <v-breadcrumbs :items="crumbs" class="tw-pb-0 tw-pl-0 tw-pt-4">
        <template #divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <template #item="{ item: { to, text } }">
          <v-breadcrumbs-item
            exact-path
            :to="{ name: to }"
            :disabled="text === crumbs[crumbs.length - 1].text"
          >
            {{ text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <v-divider class="tw-my-4" />
    </div>

    <div :class="paddingX">
      <slot />
    </div>
    <slot name="bottom" />
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useModelStore } from '@store/current-route-model-store';
  import paddingX from '@/define/padding-x';
  import { getCurrentInstance } from 'vue';

  const {
    proxy: { globalImages }
  } = getCurrentInstance();

  const props = defineProps({
    banner: {
      type: String,
      default: ''
    },
    fullwidth: {
      type: Boolean,
      default: false
    },
    fullHeight: {
      type: Boolean,
      default: false
    },
    breadCrumbsClass: {
      type: Array,
      default: () => []
    }
  });
  const { crumbs, currentRoute } = storeToRefs(useModelStore());

  const topBanner = computed(() => props.banner || globalImages[currentRoute]);
</script>
