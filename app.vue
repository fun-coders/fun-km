<template>
  <div class="mx-auto flex h-screen w-screen items-center justify-center">
    <el-config-provider :locale="zhCn">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import { zhCn } from 'element-plus/es/locale';
</script>
