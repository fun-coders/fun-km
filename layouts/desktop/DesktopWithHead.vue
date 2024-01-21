<template>
  <div class="flex h-full w-full flex-col items-center justify-center text-white">
    <div class="flex h-[100px] w-full justify-between pl-10 pr-20 pt-5 text-3xl">
      <logo class="w-[230px]"></logo>
      <nav class="w-[calc(100%-440px)]">
        <ol class="relative z-10 flex h-full w-full items-center justify-center gap-9">
          <li v-for="(item, index) in navList" :key="index" :class="item.path === route.path ? 'underline decoration-4 underline-offset-8 ' : ' '">
            <NuxtLink :to="item.path">{{ item.name }}</NuxtLink>
          </li>
        </ol>
      </nav>
      <div class="relative z-10 flex h-full w-[210px] items-center justify-center">
        <template v-if="!user">
          <NuxtLink to="/register">注册</NuxtLink>
          /
          <NuxtLink to="/login">登录&nbsp;→</NuxtLink>
        </template>
        <NuxtLink v-else to="/dashboard">控制台</NuxtLink>
      </div>
    </div>
    <div class="flex h-[calc(100%-100px)] w-full flex-col items-center justify-center">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const user = useSupabaseUser();
const route = useRoute();
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
</script>
