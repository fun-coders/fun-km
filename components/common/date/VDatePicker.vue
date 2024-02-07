<template>
  <VCalendarDatePicker
    v-if="date && typeof date === 'object' && (date.start || date.end)"
    v-model.range="date"
    :columns="2"
    v-bind="{ ...attrs, ...$attrs }"
  />
  <VCalendarDatePicker v-else v-model="date" v-bind="{ ...attrs, ...$attrs }" />
</template>
<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import type { PropType } from 'vue';
// @ts-ignore
import type { DatePickerDate, DatePickerRangeObject } from 'v-calendar/dist/types/src/use/datePicker';

const props = defineProps({
  modelValue: {
    type: [Date, Object] as PropType<DatePickerDate | DatePickerRangeObject | null>,
    default: null,
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
console.log('date', date.value, typeof date.value);

const attrs = {
  transparent: true,
  borderless: true,
  color: 'primary',
  'is-dark': { selector: 'html', darkClass: 'dark' },
  'first-day-of-week': 2,
};
</script>
