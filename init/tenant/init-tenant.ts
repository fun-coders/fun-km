import type { Database } from '~/types/supabase';
import type { QueryData } from '@supabase/supabase-js';
import { useUserTenantsStore } from '~/stores/useUserTenantsStore';

/**
 * @description 获取用户的租户信息
 */
export const fetchUserTenantData = async () => {
  const client = useSupabaseClient<Database>();
  const user = useSupabaseUser();
  const userTenantsStore = useUserTenantsStore();
  const userId = user?.value?.id;
  if (!userId) {
    throw new Error('用户未登录');
  }
  const userKmTenantsQuery = client
    .schema('fun_km')
    .from('km_tenant_users')
    .select(
      `
      id,
      created_at,
      is_manager,
      updated_at,
      user_id,
      km_tenant (
        id,
        created_at,
        created_by,
        favicon_path,
        invitation_code,
        is_review_open,
        is_share_action_change_allow,
        is_share_action_default,
        is_share_scope_change_allow,
        is_share_scope_default,
        logo_path,
        name,
        tenant_type,
        updated_at
      )`,
    )
    .eq('user_id', userId);
  type UserKmTenants = QueryData<typeof userKmTenantsQuery>;
  const { data, error } = await userKmTenantsQuery;
  if (error) throw error;
  const userKmTenants: UserKmTenants = data;
  userTenantsStore.setUserTenants(userKmTenants);
  const defaultUserKmTenant = userKmTenants.find((userKmTenant) => {
    // supabase的TS类型定义有问题，这里外键绑定的是id，查出来只有一个对象，不是数组，所以需要重新定义一下类型
    const tenant: any = userKmTenant.km_tenant;
    return tenant.tenant_type === 'personal';
  });
  userTenantsStore.setCurrentUserTenant(defaultUserKmTenant);
  return userKmTenants;
};
