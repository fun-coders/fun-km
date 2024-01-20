<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <Logo class="mb-2 w-full" />
    <AuthLogin />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'desktop-full-screen',
});
</script>
