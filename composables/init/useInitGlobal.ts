import { useUserTenantsStore } from '~/stores/useUserTenantsStore';
import { getUserTenantData } from '~/api/auth/tenant/fetch-tenant';

/**
 * @description 初始化
 */
const init = async () => {
  const user = useSupabaseUser();
  if (!user.value) {
    return;
  }
  // 登录后初始化
  await initWithUser();
};

/**
 * @description 用户登录后初始化
 */
const initWithUser = async () => {
  const user = useSupabaseUser();
  if (!user.value) {
    return;
  }
  // 初始化用户租户信息
  await fetchUserTenantData();
};

/**
 * @description 获取用户的租户信息，并设置默认租户
 */
const fetchUserTenantData = async () => {
  const userTenantsStore = useUserTenantsStore();
  const userKmTenants = await getUserTenantData();
  const defaultUserKmTenant = userKmTenants.find((userKmTenant) => {
    // @ts-ignore
    return userKmTenant.km_tenant?.tenant_type === 'personal';
  });
  userTenantsStore.setCurrentUserTenant(defaultUserKmTenant);
  return userKmTenants;
};

export const useInitGlobal = () => {
  return { init, initWithUser };
};
