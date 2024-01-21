<template>
  <div class="h-full w-[350px] rounded-r-3xl bg-[--sidebar-bg] p-3">
    <div class="sidebar-header h-[75px]">
      <logo />
    </div>
    <div class="flex h-[calc(100%-75px)] flex-col justify-between">
      <div>
        <UVerticalNavigation :links="topLinks" :ui="verticalNavigationUI" />
        <UDivider />
      </div>
      <div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <UButton icon="i-heroicons-user-solid" size="sm" color="primary" square variant="ghost" />
            <UButton icon="i-heroicons-user-solid" size="sm" color="primary" square variant="ghost" />
            <UButton icon="i-heroicons-user-solid" size="sm" color="primary" square variant="ghost" />
          </div>
          <UButton icon="i-heroicons-cog-6-tooth" size="sm" color="primary" square variant="link" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const topLinks = [
  [
    {
      label: '首页',
      icon: 'i-heroicons-home-solid',
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
