<template>
  <LayoutDashboardContainer title="个人信息">
    <div>
      <h3 class="mb-3 text-xl font-bold">基本资料</h3>
      <div class="space-y-4">
        <UFormGroup label="姓名" name="name" size="lg">
          <UInput />
        </UFormGroup>
        <UFormGroup label="Email" name="email" size="lg" required>
          <UInput />
        </UFormGroup>
        <UFormGroup label="生日" name="age" size="lg">
          <CommonDatePicker v-model="birthday" />
        </UFormGroup>
      </div>
    </div>
  </LayoutDashboardContainer>
</template>
<script setup lang="ts">
const birthday = ref(new Date());
</script>
