<template>
  <div>
    <slot />
  </div>
</template>
<script setup lang="ts">
onBeforeMount(() => {
  setPageLayout('desktop-basic');
});
</script>
