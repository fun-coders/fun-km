<template>
  <div class="mx-auto flex h-screen w-screen items-center justify-center">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <UNotifications />
</template>
<script setup lang="ts">
const colorMode = useColorMode();
colorMode.preference = 'light';
</script>
