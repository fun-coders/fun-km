<template>
  <UPopover :popper="{ placement: 'bottom-start', strategy: 'absolute' }">
    <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'yyyy-MM-dd')" />
    <template #panel="{ close }">
      <VDatePicker v-model="date" @close="close" />
    </template>
  </UPopover>
</template>
<script setup lang="ts">
import VDatePicker from '~/components/common/date/VDatePicker.vue';
import type { PropType } from 'vue';
// @ts-ignore
import type { DatePickerDate, DatePickerRangeObject } from 'v-calendar/dist/types/src/use/datePicker';

const props = defineProps({
  modelValue: {
    type: [Date, Object] as PropType<DatePickerDate | DatePickerRangeObject | null>,
    default: new Date(),
  },
});

const emit = defineEmits(['update:model-value', 'close']);

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:model-value', value);
    emit('close');
  },
});
</script>
