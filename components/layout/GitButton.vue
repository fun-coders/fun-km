<template>
  <UButton
    class="relative"
    icon="i-grommet-icons-github"
    color="primary"
    square
    type="link"
    :variant="variant"
    to="https://github.com/fun-coders/fun-km"
    target="_blank"
  >
  </UButton>
</template>
<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: () => 'solid',
  },
});
</script>
