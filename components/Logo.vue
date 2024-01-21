<template>
  <div class="flex items-center justify-start">
    <nuxt-img src="/images/logo.png" placeholder alt="logo" width="120px" loading="lazy"></nuxt-img>
    <div v-if="showTitle" class="text-2xl font-bold">FUN - KM</div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  showTitle: {
    type: Boolean,
    default: true,
    optional: true,
  },
});
</script>
