<template>
  <div class="h-full w-[350px] rounded-r-3xl bg-[--sidebar-bg] p-3">
    <div class="sidebar-header h-[75px]">
      <NuxtLink to="/" class="flex items-center">
        <logo />
      </NuxtLink>
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
            <UTooltip text="个人空间">
              <UButton icon="i-heroicons-user-solid" size="sm" color="primary" square variant="ghost" />
            </UTooltip>
            <UTooltip text="租户一">
              <UButton icon="i-heroicons-building-office-2" size="sm" color="primary" square variant="ghost" />
            </UTooltip>
            <UTooltip text="租户二">
              <UButton icon="i-heroicons-building-office-2" size="sm" color="primary" square variant="ghost" />
            </UTooltip>
          </div>
          <UButton
            icon="i-heroicons-cog-6-tooth"
            size="sm"
            color="primary"
            square
            variant="link"
            @click="() => (settingModalOpen = !settingModalOpen)"
          />
        </div>
      </div>
    </div>
  </div>
  <UModal v-model="settingModalOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">设置</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="settingModalOpen = false" />
        </div>
      </template>
      内容
      <template #footer>
        <div class="flex items-center justify-end">
          <UButton color="primary" square variant="solid">保存</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
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
};
const settingModalOpen = ref(false);
</script>
