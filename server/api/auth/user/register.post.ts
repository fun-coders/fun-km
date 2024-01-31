import { serverSupabaseClient } from '#supabase/server';
import { z } from 'zod';
import { KmResponse } from '~/utils/response';
import { KmError } from '~/types/error';
import { Database } from '~/types/supabase';

const userSchema = z.object({
  email: z.string().min(1, '请输入邮箱').email('请检查邮箱格式'),
  password: z.string().min(1, '请输入密码').max(72, '密码长度不能超过72位'),
});
/**
 * @description 注册用户，并创建租户
 */
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const validatedResult = await readValidatedBody(event, (body) => userSchema.safeParse(body));
  if (!validatedResult.success) {
    return KmResponse.error(new KmError(validatedResult.error.message, new Error(validatedResult.error.stack)));
  }
  const { data: signUpData, error: signUpError } = await client.auth.signUp({
    email: validatedResult.data.email,
    password: validatedResult.data.password,
  });
  if (signUpError) {
    return KmResponse.error(new KmError(signUpError?.message, signUpError));
  }
  const userId = signUpData?.user?.id;
  if (!userId) {
    return KmResponse.error(new KmError('注册失败'));
  }
  const { data: tenantData, error: tenantError } = await client.schema('fun_km').rpc('register', { created_by_val: userId });
  if (!tenantData || tenantError) {
    await client.auth.admin.deleteUser(userId, false);
    return KmResponse.error(new KmError(tenantError?.message ?? '注册失败', new Error(tenantError?.details)));
  }
  return KmResponse.success(userId);
});
