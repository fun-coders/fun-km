<template>
  <div class="flex items-center justify-start">
    <nuxt-img src="/images/logo.png" alt="logo" width="100px" loading="lazy"></nuxt-img>
    <div v-if="showTitle" class="tfont-bold text-lg drop-shadow-md sm:text-xl lg:text-2xl">FUN - KM</div>
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
