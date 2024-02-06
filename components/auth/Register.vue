<template>
  <UCard ref="registerCardRef" class="fe-card z-10 h-full w-full">
    <div class="flex h-full justify-between p-10">
      <div v-if="cardWidth > 1000" class="fe-card-left relative w-2/3">
        <div class="relative z-10 mb-20 text-5xl font-bold">
          <div class="mb-3">欢迎加入</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;知识库</div>
        </div>
        <div class="relative z-10 mt-2 text-base">
          <div>已有帐号？</div>
          <div>
            <span class="align-middle">点击这里<UIcon name="i-heroicons-arrow-long-right" /></span>
            <ULink to="/login">
              <span class="text-xl font-bold">立即登录</span>
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
        <AuthPasswordRegister />
        <UDivider class="my-5" label="快速注册并登录" />
        <div class="flex items-center justify-around">
          <UTooltip v-if="registerWay !== RegisterWay.Password" text="密码注册">
            <UButton icon="i-heroicons-key-solid" color="primary" size="xl" @click="() => (registerWay = RegisterWay.Password)" />
          </UTooltip>
          <UTooltip v-if="registerWay !== RegisterWay.EmailMagic" text="邮件一键注册">
            <UButton icon="i-heroicons-envelope-solid" color="primary" size="xl" @click="() => (registerWay = RegisterWay.EmailMagic)" />
          </UTooltip>
          <UTooltip text="Github">
            <AuthGithubLogin />
          </UTooltip>
        </div>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
const registerCardRef = ref<HTMLElement>();
const cardWidth = computed(() => registerCardRef.value?.$el?.offsetWidth);
const enum RegisterWay {
  Password = 'password',
  EmailMagic = 'emailMagic',
  Github = 'github',
}
const registerWay = ref<RegisterWay>(RegisterWay.Password);
</script>
<style scoped lang="scss">
.fe-card {
  border-radius: 20px;
  .fe-card-left {
    background: radial-gradient(50% 50% at 50% 50%, rgba(var(--color-primary-300)), transparent);
  }
}
</style>
