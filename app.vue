<template>
  <div class="mx-auto flex h-dvh w-dvw items-center justify-center">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <!-- global Pop-up box start -->
  <UNotifications />
  <Settings />
  <AuthAddAccount />
  <!-- global Pop-up box end-->
  <!-- analytics start -->
  <SpeedInsights />
  <!-- analytics end -->
</template>
<script setup lang="ts">
import { init } from '~/init/init-global';
import { useCssVar } from '@vueuse/core';
import { rgbToHex } from '~/utils/color';
import { SpeedInsights } from '@vercel/speed-insights/vue';

const colorMode = useColorMode();
colorMode.preference = 'light';
// 初始化全局数据
init();
let defaultColor = '#517a7b';
const rgbIndex: number[] = useCssVar('--color-primary-DEFAULT')
  .value?.split(' ')
  .map((item) => Number(item));
if (rgbIndex && rgbIndex.length === 3) {
  defaultColor = rgbToHex(rgbIndex[0], rgbIndex[1], rgbIndex[2]);
}
defineOgImageComponent('NuxtSeo', {
  theme: defaultColor,
});
</script>
