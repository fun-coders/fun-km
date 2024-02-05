<template>
  <UModal v-model="globalLayoutStore.globalLoading" :ui="{ background: 'bg-transparent', shadow: 'shadow-none' }" class="" prevent-close>
    <UButton loading variant="link" size="xl">{{ globalLayoutStore.globalLoadingText }}</UButton>
  </UModal>
</template>
<script setup lang="ts">
const globalLayoutStore = useGlobalLayoutStore();
</script>
