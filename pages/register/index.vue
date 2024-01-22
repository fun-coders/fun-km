<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <div class="mb-2 flex w-full items-end justify-between">
      <NuxtLink to="/" class="flex items-center">
        <logo />
      </NuxtLink>
      <div>
        <layout-theme-change-button />
      </div>
    </div>
    <AuthRegister />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'desktop-full-screen',
});
</script>
