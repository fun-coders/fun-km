<template>
  <UCard class="fe-card z-10 w-full">
    <div class="flex min-h-[600px] min-w-[700px] justify-between p-10">
      <div class="fe-card-left relative w-2/3">
        <div class="relative z-10 mb-20 text-5xl font-bold">
          <div class="mb-3">欢迎加入</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;知识库</div>
        </div>
        <div class="relative z-10 mt-2 text-base">
          <div>已有帐号？</div>
          <div>
            <span class="align-middle">点击这里<UIcon name="i-heroicons-arrow-long-right" /></span>
            <ULink to="/login">
              <span class="text-xl font-bold">立即登录</span>
            </ULink>
          </div>
        </div>
        <nuxt-img
          class="absolute bottom-0 right-2 z-0 ml-auto"
          src="/images/auth-card.png"
          alt="知识库卡片登录背景"
          sizes="30vw"
          loading="lazy"
        ></nuxt-img>
      </div>
      <div class="w-1/3">
        <UForm class="flex h-full w-full flex-col justify-center" :validate="validate" :schema="schema" :state="state" @submit="onSubmit">
          <UFormGroup class="h-20" label="" name="email">
            <UInput v-model="state.email" size="xl" placeholder="请输入邮箱" autocomplete="username"></UInput>
          </UFormGroup>
          <UFormGroup class="h-20" label="" name="password">
            <UInput v-model="state.password" size="xl" type="password" placeholder="请输入密码" autocomplete="current-password"></UInput>
          </UFormGroup>
          <UFormGroup class="h-20" label="" name="confirmPassword">
            <UInput v-model="state.confirmPassword" size="xl" type="password" placeholder="请再次输入密码" autocomplete="current-password"></UInput>
          </UFormGroup>
          <UButton class="mt-20" type="submit" block size="xl" :loading="loading">
            <span v-if="loading">注册中...</span>
            <span v-else>注册</span>
          </UButton>
        </UForm>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
import { Schema, z } from 'zod';
import type { FormError, FormSubmitEvent } from '#ui/types';
import { KmResponse, KmResponseCode } from '~/utils/response';
import { KmError } from '~/types/error';

const toast = useToast();

const loading = ref(false);
const router = useRouter();
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
    const data: KmResponse<string> = await $fetch('/api/auth/user/register', {
      method: 'post',
      body: { email: event.data.email, password: event.data.password },
    });
    if (data.statusCode === KmResponseCode.SUCCESS) {
      await router.push('/login');
      toast.add({
        id: 'login-success',
        title: '注册成功',
        description: '现在可以输入邮箱和密码进行登录',
        icon: 'i-heroicons-check-circle',
        color: 'green',
      });
    } else {
      throw data.error;
    }
  } catch (error) {
    const err = error as KmError;
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
<style scoped lang="scss">
.fe-card {
  border-radius: 20px;
  .fe-card-left {
    background: radial-gradient(50% 50% at 50% 50%, rgba(var(--color-primary-300)), transparent);
  }
}
</style>
