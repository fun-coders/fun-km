<template>
  <el-card class="fe-card z-10 w-full">
    <template #header>
      <h2 class="text-2xl font-bold">登录</h2>
    </template>
    <div class="flex min-h-[600px] min-w-[700px] justify-between p-10">
      <div class="fe-card-left relative w-2/3">
        <div class="relative z-10 mb-20 text-5xl font-bold">
          <div class="mb-3">欢迎进入</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;知识库</div>
        </div>
        <div class="relative z-10 mt-2 text-base">
          <div>如果你还没有注册账号</div>
          <div>
            <span class="align-middle">点击这里-></span>
            <el-button link type="primary">
              <span class="text-xl font-bold">立即注册</span>
            </el-button>
          </div>
        </div>
        <nuxt-img
          class="absolute bottom-0 right-2 z-0 ml-auto"
          src="/images/auth-card.png"
          placeholder
          alt="知识库卡片登录背景"
          sizes="30vw"
          loading="lazy"
        ></nuxt-img>
      </div>
      <div class="flex w-1/3 flex-col justify-center">
        <el-form :model="form" :rules="rules" label-width="0" size="large">
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
        </el-form>
        <div class="flex w-full justify-end">
          <el-button class="mb-5 mt-20" size="large" link>
            <span>忘记密码？</span>
          </el-button>
        </div>
        <el-button class="w-full" size="large" type="primary" @click="handleLogin">
          <span v-if="loading">登录中...</span>
          <span v-else>登录</span>
        </el-button>
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient();

const loading = ref(false);
const router = useRouter();
const form = ref({
  email: '',
  password: '',
});
const rules = ref({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});
const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword(form.value);
    if (error) throw error;
    ElMessage('验证成功，正在跳转...');
    router.push('/');
  } catch (error) {
    ElMessage('登录失败，请检查邮箱和密码是否正确');
  } finally {
    loading.value = false;
  }
};
</script>
<style scoped lang="scss">
.fe-card {
  border-radius: 20px;
  .fe-card-left {
    background: radial-gradient(50% 50% at 50% 50%, var(--el-color-primary-light-5) 0, transparent);
  }
}
</style>
