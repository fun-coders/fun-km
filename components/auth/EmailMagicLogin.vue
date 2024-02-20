<template>
  <UForm class="flex h-full w-full flex-col justify-center" :schema="schema" :state="state" @submit="onSubmit">
    <UFormGroup class="h-20" label="" name="email">
      <UInput
        v-model="state.email"
        class="shadow-md"
        size="xl"
        placeholder="请输入邮箱"
        autocomplete="username"
        icon="i-heroicons-envelope"
        :disabled="loading"
        autofocus
      ></UInput>
    </UFormGroup>
    <div class="flex w-full items-center justify-end text-gray-500">
      <UIcon name="i-heroicons-information-circle" class="text-gray-500" />
      <span>如果账号不存在将会自动无密码注册</span>
    </div>
    <UButton class="mt-5 shadow-lg" type="submit" block size="xl" :loading="loading">
      <span v-if="loading">发送中...</span>
      <span v-else>发送邮件</span>
    </UButton>
  </UForm>
</template>
<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import type { Database } from '~/types/supabase';
import { isAuthError } from '@supabase/gotrue-js';

const supabase = useSupabaseClient<Database>();
const toast = useToast();

const loading = ref(false);
const state = reactive({
  email: '',
});
const schema = z.object({
  email: z.string().min(1, '请输入邮箱').email('请检查邮箱格式'),
});
type Schema = z.output<typeof schema>;
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: event.data?.email,
      options: {
        shouldCreateUser: true,
      },
    });
    if (error) throw error;
    toast.add({
      id: 'login-success',
      title: '发送邮件成功',
      description: '请打开邮箱查看您的验证链接将会自动登录',
      icon: 'i-heroicons-check-circle',
      timeout: 2000,
      color: 'green',
    });
  } catch (error) {
    let description = '检查邮箱是否正确';
    if (isAuthError(error)) {
      description = error.message;
    }
    toast.add({
      id: 'login-error',
      title: '发送邮件失败',
      description,
      icon: 'i-heroicons-shield-exclamation',
      color: 'red',
    });
  } finally {
    loading.value = false;
  }
}
</script>
