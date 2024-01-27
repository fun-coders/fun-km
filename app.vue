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
const colorMode = useColorMode();
colorMode.preference = 'light';
</script>
