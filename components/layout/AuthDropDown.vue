<template>
  <UDropdown class="relative w-full" :items="dropdownItems" :popper="popper" :ui="ui">
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
        :ui="{
          width: 'w-fit min-w-[150px]',
          item: {
            active: 'bg-[--sidebar-hover-bg]',
          },
        }"
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
  <UModal v-model="signOutConfirmModalOpen">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">退出登录</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="() => (signOutConfirmModalOpen = false)" />
        </div>
      </template>
      退出登录将会清除所有已登录的账号信息，确定要退出吗？
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton variant="outline" @click="() => (signOutConfirmModalOpen = false)">取消</UButton>
          <UButton @click="signOut">确定</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
import type { Database } from '~/types/supabase';
import { initWithUser } from '~/init/init-global';

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
const user = useSupabaseUser();
const signOutConfirmModalOpen = ref(false);
const historyUsers = computed(() => {
  const historyLocalUsers: any[] = JSON.parse(localStorage.getItem(USERS_LOCALSTORAGE_KEY) ?? '[]');
  return historyLocalUsers
    .flatMap((localUser) => {
      return {
        label: localUser?.user?.email,
        icon: 'i-heroicons-user-solid',
        click: async () => {
          if (localUser?.user?.id === user.value?.id) {
            return;
          }
          await supabase.auth.setSession({
            access_token: localUser.access_token,
            refresh_token: localUser.refresh_token,
          });
          await initWithUser();
        },
      };
    })
    .filter((localUser) => localUser.label !== user.value?.email);
});
const dropdownItems = computed(() => [
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
      click: () => (signOutConfirmModalOpen.value = true),
    },
  ],
]);
const accountsDropdownItems = computed(() => [
  historyUsers.value,
  [
    {
      label: '添加账号',
      icon: 'i-heroicons-plus',
      click: () => globalLayoutStore.addAccountToggle(),
    },
  ],
]);
const signOut = () => {
  localStorage.removeItem(USERS_LOCALSTORAGE_KEY);
  supabase.auth.signOut();
  router.push('/');
};
</script>
