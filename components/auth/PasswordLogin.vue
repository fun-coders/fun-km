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
      ></UInput>
    </UFormGroup>
    <UFormGroup class="h-20" label="" name="password">
      <UInput
        v-model="state.password"
        class="shadow-md"
        size="xl"
        type="password"
        placeholder="请输入密码"
        autocomplete="current-password"
        icon="i-heroicons-key"
        :disabled="loading"
      ></UInput>
    </UFormGroup>
    <UButton class="shadow-lg" type="submit" block size="xl" :loading="loading">
      <span v-if="loading">登录中...</span>
      <span v-else>登录</span>
    </UButton>
  </UForm>
</template>
<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import type { Database } from '~/types/supabase';
import { isAuthError } from '@supabase/gotrue-js';

const props = defineProps({
  successCallback: {
    type: Function,
    default: () => {},
  },
});
const supabase = useSupabaseClient<Database>();
const toast = useToast();
const config = useRuntimeConfig();
const { initWithUser } = useInitGlobal();

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
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword(event.data);
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
    const historyUsers: any[] = JSON.parse(localStorage.getItem(USERS_LOCALSTORAGE_KEY) ?? '[]');
    // 保存登录状态
    const localUser = localStorage.getItem(CURRENT_USER_LOCALSTORAGE_KEY);
    if (historyUsers.length <= 0 && localUser) {
      localStorage.setItem(USERS_LOCALSTORAGE_KEY, JSON.stringify([JSON.parse(localUser)]));
    } else if (localUser) {
      const index = historyUsers.findIndex((u) => u?.user?.id === data?.user?.id);
      if (index === -1) {
        localStorage.setItem(USERS_LOCALSTORAGE_KEY, JSON.stringify([...historyUsers, JSON.parse(localUser)]));
      }
    }
    props.successCallback();
  } catch (error) {
    let description = '检查邮箱和密码是否正确';
    if (isAuthError(error)) {
      description = error.message;
    }
    toast.add({
      id: 'login-error',
      title: '登录失败',
      description,
      icon: 'i-heroicons-shield-exclamation',
      color: 'red',
    });
  } finally {
    loading.value = false;
  }
}
</script>
