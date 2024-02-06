<template>
  <UCard ref="loginCardRef" class="fe-card z-10 h-full w-full">
    <div class="flex h-full justify-between p-10">
      <div v-if="cardWidth > 1000" class="fe-card-left relative w-2/3">
        <div class="relative z-10 mb-20 text-5xl font-bold">
          <div class="mb-3">欢迎进入</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;知识库</div>
        </div>
        <div class="relative z-10 mt-2 text-base">
          <div>如果你还没有注册账号</div>
          <div>
            <span class="align-middle">点击这里<UIcon name="i-heroicons-arrow-long-right" /></span>
            <ULink to="/register">
              <span class="text-xl font-bold">立即注册</span>
            </ULink>
          </div>
        </div>
        <nuxt-img
          class="absolute bottom-0 right-2 z-0 ml-auto"
          src="/images/auth-card.png"
          alt="知识库卡片登录背景"
          sizes="30vw"
          loading="lazy"
        ></nuxt-img>
      </div>
      <div :class="cardWidth > 1000 ? 'w-1/3' : 'w-full'" class="h-full">
        <AuthPasswordLogin v-if="loginWay === LoginWay.Password" :success-callback="props.successCallback" />
        <AuthEmailMagicLogin v-if="loginWay === LoginWay.EmailMagic" />
        <UDivider class="my-5" label="其他登录方式" />
        <div class="flex items-center justify-around">
          <UTooltip v-if="loginWay !== LoginWay.Password" text="密码登录">
            <UButton icon="i-heroicons-key-solid" color="primary" size="xl" @click="() => (loginWay = LoginWay.Password)" />
          </UTooltip>
          <UTooltip v-if="loginWay !== LoginWay.EmailMagic" text="邮件一键登录">
            <UButton icon="i-heroicons-envelope-solid" color="primary" size="xl" @click="() => (loginWay = LoginWay.EmailMagic)" />
          </UTooltip>
          <AuthGithubLogin />
        </div>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
const props = defineProps({
  successCallback: {
    type: Function,
    default: () => {},
  },
});
const enum LoginWay {
  Password = 'password',
  EmailMagic = 'emailMagic',
  Github = 'github',
}
const user = useSupabaseUser();
const config = useRuntimeConfig();
const loginWay = ref<LoginWay>(LoginWay.Password);
const loginCardRef = ref<HTMLElement>();
const cardWidth = computed(() => loginCardRef.value?.$el?.offsetWidth);
const router = useRouter();
onBeforeMount(() => {
  // 已经登录则直接跳转
  if (user.value) router.push(config.public.loginRedirect);
});
</script>
<style scoped lang="scss">
.fe-card {
  border-radius: 20px;
  .fe-card-left {
    background: radial-gradient(50% 50% at 50% 50%, rgba(var(--color-primary-300)), transparent);
  }
}
</style>
