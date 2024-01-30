import type { Database, TablesInsert } from '~/types/supabase';
import { KmResponse } from '~/utils/response';
import { KmError } from '~/api/error';
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().min(1, '请输入邮箱').email('请检查邮箱格式'),
  password: z.string().min(1, '请输入密码').max(72, '密码长度不能超过72位'),
});

export const register = async (email: string, password: string): Promise<KmResponse<any>> => {
  const client = useSupabaseClient<Database>();
  const validatedResult = userSchema.safeParse({ email, password });
  if (!validatedResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validatedResult.error.message,
    });
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
  const insertRow: TablesInsert<{ schema: 'fun_km' }, 'km_tenant'> = {
    name: '个人空间',
    tenant_type: 'personal',
    created_by: userId,
    is_review_open: false,
    is_share_scope_change_allow: true,
    is_share_action_change_allow: true,
    is_share_scope_default: 'public',
    is_share_action_default: 'editable',
  };
  const { error: tenantError } = await client.schema('fun_km').from('km_tenant').insert(insertRow);
  if (tenantError) {
    await client.auth.admin.deleteUser(userId, false);
    return KmResponse.error(new KmError(tenantError?.message, new Error(tenantError?.details)));
  }
  return KmResponse.success(userId);
};
