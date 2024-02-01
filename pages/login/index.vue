<template>
  <div class="flex w-full flex-col items-center justify-center">
    <div class="mb-2 flex w-full items-end justify-between">
      <NuxtLink to="/" class="flex items-center">
        <logo />
      </NuxtLink>
      <div class="flex gap-2">
        <layout-git-button />
        <layout-theme-change-button />
      </div>
    </div>
    <AuthLogin />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'desktop-full-screen',
});
</script>
