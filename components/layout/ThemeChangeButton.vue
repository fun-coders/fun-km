<template>
  <UButton
    :icon="colorMode.preference === 'light' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
    color="primary"
    square
    :variant="variant"
    @click="changeTheme"
  >
  </UButton>
</template>
<script setup lang="ts">
const colorMode = useColorMode();
const changeTheme = () => {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
};
defineProps({
  variant: {
    type: String,
    default: () => 'solid',
  },
});
</script>
