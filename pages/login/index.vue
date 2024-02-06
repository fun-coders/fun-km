<template>
  <div class="flex w-full flex-col items-center justify-center">
    <div class="mb-2 flex w-full items-end justify-between">
      <NuxtLink to="/" class="flex items-center">
        <logo />
      </NuxtLink>
      <div class="flex items-center justify-end gap-2">
        <UHorizontalNavigation :links="links" />
        <layout-git-button />
        <layout-theme-change-button />
      </div>
    </div>
    <AuthLogin />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'desktop-full-screen',
});
useHead({
  title: '登录',
});
const links = [
  {
    label: '注册',
    to: '/register',
  },
  {
    label: '登录',
    to: '/login',
  },
];
</script>
