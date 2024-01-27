<template>
  <UModal v-model="globalLayoutStore.settingsModalOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">设置</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="() => globalLayoutStore.settingsToggle()" />
        </div>
      </template>
      内容
      <template #footer>
        <div class="flex items-center justify-end">
          <UButton color="primary" square variant="solid">保存</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
const globalLayoutStore = useGlobalLayoutStore();
</script>
