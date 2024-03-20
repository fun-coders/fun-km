import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { KmResponse } from '~/utils/response';
import { KmError } from '~/types/error';
import { Database } from '~/types/supabase';

/**
 * @description 初始化用户的个人空间
 */
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);
  if (!user) {
    return KmResponse.error(new KmError('请先登录'));
  }
  const userId = user?.id;
  const { data: tenantData, error: tenantError } = await client.schema('fun_km').rpc('register', { created_by_val: userId });
  if (!tenantData || tenantError) {
    await client.auth.admin.deleteUser(userId, false);
    return KmResponse.error(new KmError(tenantError?.message ?? '初始化失败', new Error(tenantError?.details)));
  }
  return KmResponse.success(userId);
});
