<template>
  <UDropdown
    class="relative"
    :items="dropdownItems"
    :popper="{
      placement: 'bottom',
      strategy: 'absolute',
    }"
    :ui="ui"
  >
    <template #account="{ item }">
      <UDropdown
        class="relative w-full"
        :items="accountsDropdownItems"
        :popper="{
          placement: 'right-start',
          strategy: 'fixed',
          offsetDistance: 15,
          offsetSkid: -10,
        }"
        mode="hover"
        :ui="ui"
      >
        <div class="group flex w-full items-center gap-2 rounded-md text-sm text-gray-700 dark:text-gray-200">
          <UIcon :name="item.icon" class="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
          <span class="truncate">{{ item.label }}</span>
        </div>
      </UDropdown>
    </template>
    <slot></slot>
  </UDropdown>
</template>
<script setup lang="ts">
defineProps({
  ui: {
    type: Object,
    default: () => ({
      width: 'w-full',
      item: {
        active: 'bg-[--sidebar-hover-bg]',
      },
    }),
  },
});
const globalLayoutStore = useGlobalLayoutStore();
const dropdownItems = ref([
  [
    {
      label: '切换账号',
      slot: 'account',
      icon: 'i-heroicons-arrows-right-left',
    },
  ],
  [
    {
      label: '个人信息',
      icon: 'i-heroicons-user-circle-16-solid',
    },
    {
      label: '操作记录',
      icon: 'i-heroicons-clock',
    },
    {
      label: '设置',
      icon: 'i-heroicons-cog-6-tooth',
      click: () => globalLayoutStore.settingsToggle(),
    },
  ],
  [
    {
      label: '退出登录',
      icon: 'i-heroicons-arrow-right-on-rectangle-20-solid',
    },
  ],
]);
const accountsDropdownItems = ref([
  [
    {
      label: '账号一',
      icon: 'i-heroicons-building-office-2',
    },
    {
      label: '账号二',
      icon: 'i-heroicons-building-office-2',
    },
  ],
]);
</script>
