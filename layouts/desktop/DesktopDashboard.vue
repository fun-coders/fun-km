<template>
  <div class="flex h-full w-full items-center justify-center">
    <layout-sidebar class="shadow-xl" />
    <div class="h-full w-full px-3 py-3">
      <div class="h-full w-full rounded-xl bg-[var(--main-container-bg)] px-3 py-3 shadow-2xl">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const initTenant = useInitTenant();
initTenant.initPersonalTenant();
</script>
