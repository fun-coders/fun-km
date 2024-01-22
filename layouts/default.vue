<template>
  <div>
    <slot />
  </div>
</template>
<script setup lang="ts">
onBeforeMount(() => {
  setPageLayout('desktop-home-page');
});
</script>
