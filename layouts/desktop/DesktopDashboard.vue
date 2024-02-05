<template>
  <div class="flex h-full w-full items-center justify-center">
    <layout-sidebar />
    <UContainer>
      <slot />
    </UContainer>
  </div>
</template>
<script setup lang="ts">
const initTenant = useInitTenant();
initTenant.initPersonalTenant();
</script>
