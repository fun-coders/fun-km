import { fetchUserTenantData } from '~/init/tenant/init-tenant';

/**
 * @description 初始化
 */
export const init = async () => {
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
export const initWithUser = async () => {
  const user = useSupabaseUser();
  if (!user.value) {
    return;
  }
  // 初始化用户租户信息
  await fetchUserTenantData();
};
