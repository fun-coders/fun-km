<template>
  <LayoutDashboardContainer title="个人信息">
    <div>
      <h3 class="mb-3 text-xl font-bold">基本资料</h3>
      <div class="space-y-4">
        <UFormGroup label="姓名" name="display_name" size="lg">
          <UInput v-model="userProfile.display_name" />
        </UFormGroup>
        <UFormGroup label="头像" name="avatar" size="lg">
          <UInput v-model="userProfile.avatar" type="file" accept=".png, .jpg, .jpeg, .ico, .svg" @change="pushAvatar" />
        </UFormGroup>
        <UFormGroup label="生日" name="birthday" size="lg">
          <CommonDatePicker v-model="userProfile.birthday" />
        </UFormGroup>
        <UFormGroup label="个人简介" name="introduction" size="lg">
          <UTextarea v-model="userProfile.introduction" />
        </UFormGroup>
        <UFormGroup label="血型" name="blood_type" size="lg">
          <USelect v-model="userProfile.blood_type" :options="bloodTypes" />
        </UFormGroup>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <UButton>保存</UButton>
      </div>
    </template>
  </LayoutDashboardContainer>
</template>
<script setup lang="ts">
import type { Database } from '~/types/supabase';
import { useSupabaseClient } from '#imports';

const userProfile = ref<UserProfile>({});
const client = useSupabaseClient<Database>();
const bloodTypes = ['A', 'B', 'AB', 'O'];
const pushAvatar = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  console.log(e, file, userProfile.value.avatar);
};
const kmStorage = await client.storage.getBucket('fun_km');
console.log('aaa', kmStorage.data);
</script>
