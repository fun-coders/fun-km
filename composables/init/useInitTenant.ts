import type { Database } from '~/types/supabase';
import type { KmResponse } from '~/utils/response';

const initPersonalTenant = async () => {
  const client = useSupabaseClient<Database>();
  const user = useSupabaseUser();
  const toast = useToast();
  const router = useRouter();
  const { initWithUser } = useInitGlobal();
  const globalLayoutStore = useGlobalLayoutStore();
  if (!user.value) {
    await router.push('/login');
    return;
  }
  const { data: userTenantData, error } = await client.from('km_tenant').select('id').eq('created_by', user.value.id).eq('tenant_type', 'personal');
  if ((userTenantData?.length && userTenantData?.length > 0 && !error) || error) {
    return;
  }
  globalLayoutStore.openGlobalLoading('欢迎您第一次进入个人工作台，正在初始化 ......');
  const data: KmResponse<string> = await $fetch('/api/auth/user/init-personal-tenant', {
    headers: useRequestHeaders(['cookie']),
  });
  if (data.statusCode === KmResponseCode.SUCCESS) {
    globalLayoutStore.closeGlobalLoading();
    toast.add({
      id: 'personal-tenant-init-success',
      title: '初始化工作台完成',
      description: '开始体验吧',
      icon: 'i-heroicons-check-circle',
      color: 'green',
    });
    await initWithUser();
  } else {
    toast.add({
      id: 'personal-tenant-init-error',
      title: '初始化工作台失败',
      description: data?.error?.message,
      icon: 'i-heroicons-shield-exclamation',
      color: 'red',
      actions: [
        {
          label: '返回主页',
          variant: 'solid',
          click: () => {
            router.push('/');
          },
        },
      ],
    });
  }
};

export const useInitTenant = () => {
  return { initPersonalTenant };
};
