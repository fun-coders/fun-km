<template>
  <UForm class="flex h-full w-full flex-col justify-center" :validate="validate" :schema="schema" :state="state" @submit="onSubmit">
    <UFormGroup class="h-20" label="" name="email">
      <UInput
        v-model="state.email"
        size="xl"
        placeholder="请输入邮箱"
        autocomplete="username"
        icon="i-heroicons-envelope"
        :disabled="loading"
        autofocus
      ></UInput>
    </UFormGroup>
    <UFormGroup class="h-20" label="" name="password">
      <UInput
        v-model="state.password"
        size="xl"
        type="password"
        placeholder="请输入密码"
        autocomplete="current-password"
        icon="i-heroicons-key"
        :disabled="loading"
      ></UInput>
    </UFormGroup>
    <UFormGroup class="h-20" label="" name="confirmPassword">
      <UInput
        v-model="state.confirmPassword"
        size="xl"
        type="password"
        placeholder="请再次输入密码"
        autocomplete="current-password"
        icon="i-heroicons-key-solid"
        :disabled="loading"
      ></UInput>
    </UFormGroup>
    <UButton class="mt-20" type="submit" block size="xl" :loading="loading">
      <span v-if="loading">注册中...</span>
      <span v-else>注册</span>
    </UButton>
  </UForm>
</template>
<script setup lang="ts">
import { Schema, z } from 'zod';
import type { FormError, FormSubmitEvent } from '#ui/types';
import { useSupabaseClient } from '#imports';
import type { Database } from '~/types/supabase';
import { AuthError } from '@supabase/auth-js';

const toast = useToast();
const loading = ref(false);
const router = useRouter();
const client = useSupabaseClient<Database>();
const state = reactive<RegisterForm>({
  email: '',
  password: '',
  confirmPassword: '',
});
const schema: Schema<RegisterForm> = z.object({
  email: z.string().min(1, '请输入邮箱').email('请检查邮箱格式'),
  password: z.string().min(1, '请输入密码').max(72, '密码长度不能超过72位'),
  confirmPassword: z.string().min(1, '请再次输入密码').max(72, '密码长度不能超过72位'),
});
const validate = (state: RegisterForm): FormError[] => {
  const errors = [];
  if (state.password !== state.confirmPassword) errors.push({ path: 'confirmPassword', message: '两次输入密码不一致' });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<RegisterForm>) {
  try {
    loading.value = true;
    const { error: signUpError } = await client.auth.signUp({
      email: event.data.email,
      password: event.data.password,
    });
    if (!signUpError) {
      await router.push('/login');
      toast.add({
        id: 'login-success',
        title: '注册完成',
        description: '请打开邮箱查看您的验证链接将会自动登录',
        icon: 'i-heroicons-check-circle',
        color: 'green',
      });
    } else {
      throw signUpError;
    }
  } catch (error) {
    const err = error as AuthError;
    console.error(error);
    toast.add({
      id: 'login-error',
      title: '注册失败',
      description: err?.message,
      icon: 'i-heroicons-shield-exclamation',
      color: 'red',
      actions: [
        {
          label: '直接登录',
          variant: 'solid',
          click: () => {
            router.push('/login');
          },
        },
      ],
    });
  } finally {
    loading.value = false;
  }
}
</script>
