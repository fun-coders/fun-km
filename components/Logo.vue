<template>
  <div class="flex w-full items-center justify-start">
    <nuxt-img src="/images/logo.png" placeholder alt="logo" sizes="100px" loading="lazy"></nuxt-img>
    <div v-if="showTitle" class="text-xl font-bold text-white">FUN-KM</div>
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
