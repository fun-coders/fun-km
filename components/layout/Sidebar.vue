<template>
  <div class="sidebar h-full w-[350px] rounded-r-3xl bg-[--sidebar-bg] p-3">
    <div class="sidebar-header pb-3">
      <logo />
    </div>
    <div class="sidebar-menu">
      <UVerticalNavigation :links="topLinks" :ui="verticalNavigationUI" />
    </div>
  </div>
</template>
<script setup lang="ts">
const topLinks = [
  [
    {
      label: '首页',
      icon: 'i-heroicons-home',
      to: '/',
    },
    {
      label: '搜索',
      icon: 'i-heroicons-magnifying-glass',
      to: '/dashboard/search',
    },
    {
      label: '通知',
      icon: 'i-heroicons-bell-alert',
      to: '/dashboard/alert',
    },
  ],
];
const verticalNavigationUI = {
  size: 'text-xl',
  padding: 'px-3 py-2.5',
  icon: {
    base: 'w-5 h-5',
  },
};
</script>
