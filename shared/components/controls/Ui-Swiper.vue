<template>
  <v-hover #default="{ hover: globalHover }">
    <Swiper :options="swiperOptions" ref="mySwiper">
      <SwiperSlide
        v-for="({ img, url, ...others } = {}, _) in slides"
        :key="img"
        :class="[{ 'swiper-no-swiping': disable }, 'tw-cursor-pointer']"
      >
        <slot v-bind="{ img, url, others }">
          <v-hover #default="{ hover }">
            <div>
              <ui-img
                :src="img"
                :aspect-ratio="aspectRatio"
                :root-hover="hover"
                width="100%"
              />
              <slot name="info" v-bind="others" />
            </div>
          </v-hover>
        </slot>
      </SwiperSlide>
      <template #button-prev v-if="showNavigation">
        <div :class="navigationAnimate('left', globalHover)" />
      </template>
      <template #button-next v-if="showNavigation">
        <div :class="navigationAnimate('right', globalHover)" />
      </template>
      <template #pagination v-if="showPagination">
        <div class="swiper-pagination" />
      </template>
    </Swiper>
  </v-hover>
</template>

<script setup>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import animateClass from '@/define/animate-class';
  import animateScale from '@front-configs/animate-scale';
  import 'swiper/css/swiper.css';
  import openInNewTab from '@utils/open-in-new-tab';
  import maybeFunctional from '@utils/maybe-functional';
  import capitalizeTheFirstLetter from '@utils/capitalize-the-first-letter';
  import { getCurrentInstance } from 'vue';

  const event = 'change';
  defineOptions({
    model: {
      prop: 'activeIndex',
      event: 'change'
    }
  });
  const emit = defineEmits(['change']);

  const props = defineProps({
    activeIndex: {
      type: [String, Number],
      default: 0
    },
    aspectRatio: {
      type: [String, Number],
      default: 0
    },
    slides: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    },
    navigation: {
      type: Boolean,
      default: false
    },
    outsideNavigation: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    touch: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    hoverClass: {
      type: [Array, Function],
      default: () => animateScale
    }
  });
  const {
    proxy: { __DEVICE, __MOBILE }
  } = getCurrentInstance();

  const mySwiper = ref('');
  const swiperRef = computed(() => mySwiper.value.$swiper);
  const isTouch = ref(false);
  // todo 如要左右箭头移出swiper, 对outside做样式处理
  const navigationClass = props.outsideNavigation ? 'outside' : '';

  const slidedPerView = computed(() => {
    const { slidesPerView } = props.options;
    return slidesPerView
      ? __DEVICE !== 'lg' && __DEVICE !== 'xl'
        ? (slidesPerView / 2) % 2 === 0
          ? slidesPerView / 2
          : slidesPerView
        : slidesPerView
      : 1;
  });
  const swiperOptions = computed(() => ({
    loop: props.loop,
    on: {
      ...(props.touch && props.loop
        ? {
            touchMove: function () {
              isTouch.value = true;
              setTimeout(() => emit(event, this.realIndex), 10);
            },
            touchEnd: () => {
              setTimeout(() => (isTouch.value = false), 10);
            }
          }
        : {
            transitionEnd: function () {
              emit(event, this.activeIndex);
            }
          })
    },
    ...(props.navigation
      ? {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      : {}),
    ...(props.pagination
      ? {
          pagination: {
            el: '.swiper-pagination'
          }
        }
      : {}),
    ...props.options,
    slidesPerView: slidedPerView.value
  }));
  const showNavigation = computed(
    () => props.navigation && props.slides.length > (slidedPerView.value || 1)
  );
  const showPagination = computed(
    () => props.pagination && props.slides.length > 1
  );

  // animate__backInLeft
  const navigationAnimate = (dir, hover) => {
    const left = dir === 'left';
    return [
      navigationClass,
      'tw-p-4',
      `swiper-button-${left ? 'prev' : 'next'}`,
      `tw-rounded-${left ? 'r' : 'l'}`,
      'tw-rounded-b',
      ...(__MOBILE
        ? []
        : [
            animateClass,
            'animate__faster',
            `animate__bounce${hover ? 'In' : 'Out'}${capitalizeTheFirstLetter(
              dir
            )}`
          ])
    ];
  };

  watch(
    () => props.activeIndex,
    (index) => {
      if (!swiperRef.value) return;
      props.loop
        ? (isTouch.value
            ? !(!index || index === props.slides.length - 1)
            : true) && swiperRef.value.slideToLoop(index)
        : swiperRef.value.slideTo(index);
    },
    {
      immediate: true
    }
  );
</script>
<style lang="postcss">
  :root {
    --swiper-theme-color: var(--v-primary-base);
  }
  .swiper-container {
    [role='button'] {
      &:after {
        padding: 16px;
        background-color: rgba(0, 0, 0, 0.35);
        border-radius: inherit;
      }
    }
  }
</style>
