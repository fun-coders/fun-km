<template>
  <UCard class="fe-card z-10 w-full">
    <div class="flex min-h-[600px] min-w-[700px] justify-between p-10">
      <div class="fe-card-left relative w-2/3">
        <div class="relative z-10 mb-20 text-5xl font-bold">
          <div class="mb-3">欢迎进入</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;知识库</div>
        </div>
        <div class="relative z-10 mt-2 text-base">
          <div>如果你还没有注册账号</div>
          <div>
            <span class="align-middle">点击这里<UIcon name="i-heroicons-arrow-long-right" /></span>
            <ULink to="/register">
              <span class="text-xl font-bold">立即注册</span>
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
        <UForm class="flex h-full w-full flex-col justify-center" :schema="schema" :state="state" @submit="onSubmit">
          <UFormGroup class="h-20" label="" name="email">
            <UInput v-model="state.email" class="shadow-md" size="xl" placeholder="请输入邮箱" autocomplete="username"></UInput>
          </UFormGroup>
          <UFormGroup class="h-20" label="" name="password">
            <UInput
              v-model="state.password"
              class="shadow-md"
              size="xl"
              type="password"
              placeholder="请输入密码"
              autocomplete="current-password"
            ></UInput>
          </UFormGroup>
          <div class="flex w-full justify-end">
            <ULink class="mb-5 mt-20">
              <span>忘记密码？</span>
            </ULink>
          </div>
          <UButton class="shadow-lg" type="submit" block size="xl" :loading="loading">
            <span v-if="loading">登录中...</span>
            <span v-else>登录</span>
          </UButton>
        </UForm>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import type { Database } from '~/types/supabase';
import { initWithUser } from '~/init/init-global';

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const toast = useToast();
const config = useRuntimeConfig();

const loading = ref(false);
const router = useRouter();
const state = reactive({
  email: '',
  password: '',
});
const schema = z.object({
  email: z.string().min(1, '请输入邮箱').email('请检查邮箱格式'),
  password: z.string().min(1, '请输入密码'),
});
type Schema = z.output<typeof schema>;
onBeforeMount(() => {
  // 已经登录则直接跳转
  if (user.value) router.push(config.public.loginRedirect);
});
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword(event.data);
    if (error) throw error;
    await initWithUser();
    await router.push(config.public.loginRedirect);
    toast.add({
      id: 'login-success',
      title: '登录成功',
      description: '欢迎进入知识库',
      icon: 'i-heroicons-check-circle',
      timeout: 2000,
      color: 'green',
    });
  } catch (error) {
    toast.add({
      id: 'login-error',
      title: '登录失败',
      description: '检查邮箱和密码是否正确',
      icon: 'i-heroicons-shield-exclamation',
      color: 'red',
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
