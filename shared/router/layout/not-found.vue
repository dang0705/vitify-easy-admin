<template>
  <div class="tw-flex tw-items-center tw-mt-12 tw-flex-col">
    <div class="tw-text-3xl tw-mb-4">
      &#128517; &nbsp;找不到您要去的页面哦！
    </div>
    <router-link class="hover:tw-underline" :to="{ name: 'admin' }">
      点击此处返回首页
    </router-link>
  </div>
</template>
<script setup></script>
