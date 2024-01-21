<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <div class="mb-2 flex w-full items-end justify-between">
      <logo />
      <div>
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
