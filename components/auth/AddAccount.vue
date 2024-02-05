<template>
  <UModal v-model="globalLayoutStore.addAccountModalOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">添加账号</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="close()" />
        </div>
      </template>
      <div v-if="step === 0" class="flex flex-col gap-2 rounded-2xl border p-3">
        <UButton variant="soft" icon="i-heroicons-user-plus" size="xl" @click="() => (step = 1)">加入已有团队</UButton>
        <UButton variant="soft" icon="i-heroicons-user-group" size="xl" @click="() => (step = 2)">创建新团队</UButton>
      </div>
      <div v-if="step === 1" class="flex flex-col gap-2 rounded-2xl border p-3">TODO 加入已有团队</div>
      <div v-if="step === 2" class="flex flex-col gap-2 rounded-2xl border p-3">
        <div class="flex flex-col gap-5">
          <UInput
            v-model="newTenantName"
            :disabled="loading"
            class="shadow-md"
            variant="outline"
            size="xl"
            placeholder="团队名称"
            icon="i-heroicons-user-group-solid"
          />
        </div>
      </div>
      <AuthLogin v-if="step === 3" :success-callback="successLoginCallback" />
      <template #footer>
        <div v-if="step === 0" class="flex items-center justify-center">
          <UButton color="primary" variant="link" @click="() => (step = 3)">使用其他邮箱登录</UButton>
        </div>
        <div v-if="[1, 2, 3].includes(step)" class="flex items-center justify-end gap-2">
          <UButton color="primary" variant="outline" :disabled="loading" @click="() => (step = 0)">上一步</UButton>
          <UButton v-if="[1, 2].includes(step)" color="primary" variant="solid" :loading="loading" @click="submit">确认</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
import type { Database } from '~/types/supabase';
import { useUserTenantsStore } from '~/stores/useUserTenantsStore';
import { getUserTenantData } from '~/api/auth/tenant/fetch-tenant';

const globalLayoutStore = useGlobalLayoutStore();
const userTenantsStore = useUserTenantsStore();
const user = useSupabaseUser();
const client = useSupabaseClient<Database>();
const toast = useToast();
const initTenant = useInitTenant();
const step = ref(0);
const newTenantName = ref('');
const loading = ref(false);
/**
 * 表单初始化值
 */
const initForm = () => {
  newTenantName.value = '';
  step.value = 0;
};
/**
 * 提交表单
 */
const submit = async () => {
  loading.value = true;
  try {
    if (!user.value?.id) return;
    if (step.value === 2) {
      // 创建新团队
      const { data: tenantId, error: tenantError } = await client
        .schema('fun_km')
        .rpc('create_new_tenant', { created_by_val: user.value?.id, tenant_name: newTenantName.value });
      if (!tenantId || tenantError) {
        toast.add({
          id: 'create-tenant-error',
          title: '创建团队失败',
          description: tenantError?.message ?? tenantError?.details,
          icon: 'i-heroicons-shield-exclamation',
          color: 'red',
        });
        return;
      }
      toast.add({
        id: 'create-tenant-success',
        title: '创建团队成功',
        description: `正在切换至 ${newTenantName.value}`,
        icon: 'i-heroicons-check-circle',
        timeout: 2000,
        color: 'green',
      });
      const userKmTenants = await getUserTenantData();
      const defaultUserKmTenant = userKmTenants.find((userKmTenant) => {
        // @ts-ignore
        return userKmTenant.km_tenant?.id === tenantId;
      });
      userTenantsStore.setCurrentUserTenant(defaultUserKmTenant);
      globalLayoutStore.addAccountToggle();
    } else if (step.value === 1) {
      // TODO 加入已有团队
    }
  } finally {
    initForm();
    loading.value = false;
  }
};
/**
 * 登录成功回调
 */
const successLoginCallback = async () => {
  await initTenant.initPersonalTenant();
  globalLayoutStore.addAccountToggle();
};
const close = () => {
  globalLayoutStore.addAccountToggle();
  initForm();
};
</script>
