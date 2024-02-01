import { useUserTenantsStore } from '~/stores/useUserTenantsStore';
import { getUserTenantData } from '~/api/auth/tenant/fetch-tenant';

/**
 * @description 获取用户的租户信息，并设置默认租户
 */
export const fetchUserTenantData = async () => {
  const userTenantsStore = useUserTenantsStore();
  const userKmTenants = await getUserTenantData();
  const defaultUserKmTenant = userKmTenants.find((userKmTenant) => {
    return userKmTenant.km_tenant?.tenant_type === 'personal';
  });
  userTenantsStore.setCurrentUserTenant(defaultUserKmTenant);
  return userKmTenants;
};
