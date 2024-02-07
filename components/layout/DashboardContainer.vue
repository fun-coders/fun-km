<template>
  <UCard
    class="flex h-full flex-col justify-between bg-transparent shadow-none ring-0"
    :ui="{
      body: {
        base: 'mb-auto',
      },
      footer: {
        base: 'mt-auto flex justify-end',
      },
    }"
  >
    <template v-if="props.title || slots.header" #header>
      <h2 v-if="props.title && !slots.header" class="text-3xl font-bold">{{ props.title }}</h2>
      <slot v-if="slots.header" name="header"></slot>
    </template>
    <slot></slot>
    <template v-if="slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </UCard>
</template>
<script setup lang="ts">
const slots = useSlots();
const props = defineProps({
  title: {
    type: String,
    default: '',
    required: false,
  },
});
</script>
