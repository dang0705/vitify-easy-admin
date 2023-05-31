<template>
  <v-footer :app="app" :class="[...paddingX, 'tw-py-8']" elevation="4">
    <ul class="tw-flex tw-w-full tw-items-center">
      <li class="tw-flex-shrink-0">
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
          沪ICP备15046059号-9
        </a>
      </li>
      <li class="tw-ml-auto tw-items-center">
        <ul class="tw-flex tw-flex-wrap">
          <li v-for="{ img, href } in imgLink" class="tw-ml-2">
            <component :is="href ? 'a' : 'div'" :href="href" target="_blank">
              <v-img :src="img" />
            </component>
          </li>
        </ul>
      </li>
    </ul>
  </v-footer>
</template>
<script setup>
  const imgLink = [
    {
      img: 'https://www.yooc.me/static/themes/yiban/img/new-foot/hugongwang.png',
      href: 'https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011002000230'
    },
    {
      img: 'https://www.yooc.me/static/themes/yiban/img/new-foot/12377.png',
      href: 'https://www.12377.cn/'
    },
    {
      img: 'https://www.yooc.me/static/themes/yiban/img/new-foot/jubao.png',
      href: 'https://www.12377.cn/node_548446.htm'
    },
    {
      img: 'https://www.yooc.me/static/themes/yiban/img/new-foot/sh12377.gif',
      href: 'https://www.shjbzx.cn/'
    },
    {
      img: 'https://www.yooc.me/static/themes/yiban/img/new-foot/962110.jpg',
      href: ''
    },
    {
      img: 'https://www.yooc.me/static/themes/yiban/img/jubao3.jpg',
      href: 'https://www.12377.cn/'
    }
  ];
  import paddingX from '@/define/padding-x';
  const props = defineProps({
    app: {
      type: Boolean,
      default: true
    }
  });
</script>
