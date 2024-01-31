<template>
  <div class="mx-auto flex h-screen w-screen items-center justify-center">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <!-- global Pop-up box start -->
  <UNotifications />
  <Settings />
  <!-- global Pop-up box end-->
</template>
<script setup lang="ts">
import { init } from '~/init/init-global';

const colorMode = useColorMode();
colorMode.preference = 'light';
// 初始化全局数据
init();
</script>
