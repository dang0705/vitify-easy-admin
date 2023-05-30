<template>
  <v-hover #default="{ hover: isHover }">
    <div
      :class="[
        'tw-max-w-full',
        'tw-overflow-hidden',
        'tw-flex',
        'tw-justify-center',
        {
          'tw-cursor-pointer': !isError && !noPointer
        }
      ]"
      :style="{
        ...initSize('width'),
        ...initSize('height')
      }"
      v-bind="isError ? { title: '图片加载失败' } : {}"
    >
      <v-img
        v-bind="{ ...$attrs, width: '100%', height: '100%' }"
        ref="img"
        :class="[
          animateClass,
          ...animateScale(
            rootHover && !isError ? true : hover ? isHover : false
          )
        ]"
        @error="onError"
      >
        <template #placeholder>
          <div
            class="tw-flex tw-justify-center tw-items-center tw-h-full tw-w-full"
          >
            <v-icon
              v-if="isError"
              :size="brokenIconSize"
              color="grey lighten-1"
            >
              mdi-image-broken-variant
            </v-icon>
            <v-row
              v-else
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular indeterminate color="primary" />
            </v-row>
          </div>
        </template>
      </v-img>
    </div>
  </v-hover>
</template>
<script setup inherit-attrs="false">
  import animateClass from '@/define/animate-class';
  import animateScale from '@front-configs/animate-scale';
  import { helpers } from '@utils/helpers';
  const $attrs = useAttrs();
  const props = defineProps({
    hover: {
      type: Boolean,
      default: false
    },
    rootHover: {
      type: Boolean,
      default: false
    },
    noPointer: {
      type: Boolean,
      default: false
    }
  });
  const isError = ref(false);
  const img = ref('');
  const brokenIconSize = ref(0);
  const onError = (e) => (isError.value = true);

  const initSize = (size) => {
    const { [size]: Size } = $attrs;
    return {
      [size]: Size
        ? (helpers.isString(Size) && Size.includes('%')) ||
          helpers.isNumber(size)
          ? Size
          : `${Size}px`
        : 'unset'
    };
  };

  onMounted(async () => {
    await nextTick();
    brokenIconSize.value = img.value.$el?.offsetWidth;
  });
</script>
