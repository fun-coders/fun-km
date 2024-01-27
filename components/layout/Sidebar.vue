<template>
  <div class="h-full w-[350px] rounded-r-3xl bg-[--sidebar-bg] py-3">
    <div class="sidebar-header h-[75px]">
      <NuxtLink to="/" class="flex items-center">
        <logo v-if="isExpand" />
        <nuxt-img v-else src="/images/logo-square.png" alt="logo-square" width="60px" loading="lazy"></nuxt-img>
      </NuxtLink>
    </div>
    <div class="m-3 mt-0 h-[60px]">
      <LayoutAuthDropDown class="h-full w-full">
        <UButton class="h-full w-full bg-[--sidebar-bg] text-black hover:bg-[--sidebar-hover-bg]" variant="ghost">
          <div class="mx-4 flex w-full items-center justify-between">
            <UAvatar size="md" src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
            <div class="ml-3 mr-auto flex flex-col items-start justify-between">
              <div class="text-xl font-semibold">彭于晏</div>
              <div class="text-xs">mail@lichong.host</div>
            </div>
            <UIcon name="i-heroicons-arrows-up-down-solid" />
          </div>
        </UButton>
      </LayoutAuthDropDown>
    </div>
    <div class="flex h-[calc(100%-135px)] flex-col justify-between">
      <div>
        <UVerticalNavigation :links="topLinks" :ui="verticalNavigationUI" />
        <UDivider />
      </div>
      <div>
        <UDivider />
        <div class="flex items-center justify-between px-3">
          <div>
            <UTooltip text="个人空间">
              <UButton icon="i-heroicons-user-solid" color="primary" square variant="ghost" />
            </UTooltip>
            <UTooltip text="租户一">
              <UButton icon="i-heroicons-building-office-2" color="primary" square variant="ghost" />
            </UTooltip>
            <UTooltip text="租户二">
              <UButton icon="i-heroicons-building-office-2" color="primary" square variant="ghost" />
            </UTooltip>
          </div>
          <UTooltip text="收起">
            <UButton class="rotate-[90deg]" icon="i-heroicons-bars-arrow-down-solid" color="primary" square variant="link" />
          </UTooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const isExpand = ref(true);
const topLinks = [
  [
    {
      label: '首页',
      icon: 'i-heroicons-home-solid',
      to: '/dashboard',
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
  rounded: 'rounded-none rounded-r-lg',
  active: 'bg-gradient-to-r to-transparent from-[--sidebar-active-bg] before:!static !font-semibold',
  inactive: ' before:!static hover:bg-[--sidebar-hover-bg] dark:hover:bg-gray-800',
};
</script>
