<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <div class="flex h-[100px] w-full justify-between px-10 pt-5 text-3xl">
      <NuxtLink to="/" class="flex items-center">
        <logo class="w-[230px]" />
      </NuxtLink>
      <nav class="">
        <ol class="relative z-10 flex h-full w-full items-center justify-center gap-9">
          <li v-for="(item, index) in navList" :key="index" class="flex h-3/5 flex-col justify-between drop-shadow-md">
            <NuxtLink :to="item.path" class="transition delay-100 ease-in-out hover:-translate-y-1 hover:scale-105 hover:drop-shadow-2xl">{{
              item.name
            }}</NuxtLink>
            <UDivider v-if="item.path === route.path" />
          </li>
        </ol>
      </nav>
      <div class="relative z-10 flex h-full items-center justify-end gap-1 text-xl drop-shadow-md">
        <UTooltip text="主题切换" :popper="{ placement: 'bottom', offsetDistance: 10, offsetSkid: 0, strategy: 'absolute' }">
          <layout-theme-change-button class="relative" variant="ghost" />
        </UTooltip>
        <template v-if="!user">
          <NuxtLink to="/register">注册</NuxtLink>
          /
          <NuxtLink class="inline-flex items-center" to="/login">登录<UIcon name="i-heroicons-arrow-right-end-on-rectangle" /></NuxtLink>
        </template>
        <template v-else>
          <UTooltip text="工作台" :popper="{ placement: 'bottom', offsetDistance: 10, offsetSkid: 0, strategy: 'absolute' }">
            <UButton class="relative" icon="i-heroicons-computer-desktop-solid" color="primary" to="/dashboard" square variant="ghost"> </UButton>
          </UTooltip>
          <UDropdown :items="dropdownItems" :popper="{ placement: 'bottom', offsetDistance: 10, offsetSkid: 0, strategy: 'absolute' }">
            <UButton class="relative" color="white" :label="user.email" trailing-icon="i-heroicons-chevron-down-20-solid" variant="link" />
          </UDropdown>
        </template>
      </div>
    </div>
    <div class="flex h-[calc(100%-100px)] w-full flex-col items-center justify-center">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();
const navList = [
  {
    name: '首页',
    path: '/',
  },
  {
    name: '关于我们',
    path: '/about',
  },
];
const dropdownItems = [
  [
    {
      label: '个人信息',
      icon: 'i-heroicons-user-16-solid',
      click: () => {
        router.push('/dashboard/profile');
      },
    },
  ],
  [
    {
      label: '退出登录',
      icon: 'i-heroicons-arrow-right-circle-20-solid',
      click: () => {
        supabase.auth.signOut();
        router.push('/');
      },
    },
  ],
];
</script>
