<template>
  <UDropdown class="relative" :items="dropdownItems" :popper="popper" :ui="ui">
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
          <span class="mr-auto truncate">{{ item.label }}</span>
          <UIcon name="i-heroicons-chevron-right-16-solid" class="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
        </div>
      </UDropdown>
    </template>
    <slot></slot>
  </UDropdown>
</template>
<script setup lang="ts">
import type { Database } from '~/types/supabase';

defineProps({
  popper: {
    type: Object,
    default: () => ({
      placement: 'bottom',
      strategy: 'absolute',
    }),
  },
  ui: {
    type: Object,
    default: () => ({
      width: 'w-full min-w-[150px]',
      item: {
        active: 'bg-[--sidebar-hover-bg]',
      },
    }),
  },
});
const globalLayoutStore = useGlobalLayoutStore();
const supabase = useSupabaseClient<Database>();
const router = useRouter();
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
      click: () => {
        router.push('/dashboard/profile');
      },
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
      click: () => {
        supabase.auth.signOut();
        router.push('/');
      },
    },
  ],
]);
const accountsDropdownItems = ref([
  [
    {
      label: '账号一',
      icon: 'i-heroicons-user-solid',
    },
    {
      label: '添加账号',
      icon: 'i-heroicons-plus',
      click: () => globalLayoutStore.addAccountToggle(),
    },
  ],
]);
</script>