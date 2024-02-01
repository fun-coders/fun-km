<template>
  <div class="h-full rounded-r-3xl bg-[--sidebar-bg] py-3" :class="sidebarCollapsed ? 'w-[60px]' : 'w-[350px]'">
    <div class="sidebar-header" :class="sidebarCollapsed ? 'h-[45px]' : 'h-[75px]'">
      <NuxtLink to="/" class="flex items-center">
        <logo :show-title="!sidebarCollapsed" />
      </NuxtLink>
    </div>
    <div class="mt-0 h-[60px]" :class="sidebarCollapsed ? 'm-0' : 'm-3'">
      <LayoutAuthDropDown class="h-full w-full">
        <UButton
          class="h-full w-full bg-[--sidebar-bg] text-black hover:bg-[--sidebar-hover-bg]"
          variant="ghost"
          :class="sidebarCollapsed ? 'p-0' : ''"
        >
          <div class="flex w-full items-center" :class="sidebarCollapsed ? 'mx-0 justify-center' : 'mx-4 justify-between'">
            <UAvatar size="md" icon="i-heroicons-user-solid" :alt="user?.user_metadata?.nickname ?? user?.email" />
            <div class="ml-3 mr-auto flex flex-col items-start justify-between" :class="sidebarCollapsed ? 'hidden' : ''">
              <div class="text-xl font-semibold">{{ user?.user_metadata?.nickname }}</div>
              <div class="text-xs">{{ user?.email }}</div>
            </div>
            <UIcon name="i-heroicons-arrows-up-down-solid" :class="sidebarCollapsed ? 'hidden' : ''" />
          </div>
        </UButton>
      </LayoutAuthDropDown>
    </div>
    <div class="flex flex-col justify-between" :class="sidebarCollapsed ? 'h-[calc(100%-105px)]' : 'h-[calc(100%-135px)]'">
      <div>
        <UVerticalNavigation :links="topLinks" :ui="verticalNavigationUI" />
        <UVerticalNavigation
          v-if="currentUserTenant.is_manager && currentUserTenant.km_tenant?.tenant_type !== 'personal'"
          :links="tenantLinks"
          :ui="verticalNavigationUI"
        />
      </div>
      <div>
        <UDivider class="mb-[3px]" />
        <div class="flex items-center justify-between px-3" :class="sidebarCollapsed ? 'flex-col' : ''">
          <AuthTenantList :class="sidebarCollapsed ? 'flex flex-col items-center justify-center' : ''" />
          <UTooltip :class="sidebarCollapsed ? '' : 'ml-auto'" text="主题切换">
            <LayoutThemeChangeButton variant="link" />
          </UTooltip>
          <UTooltip :text="sidebarCollapsed ? '展开' : '收起'">
            <UButton
              class="rotate-90"
              :icon="sidebarCollapsed ? 'i-heroicons-bars-arrow-up-solid' : 'i-heroicons-bars-arrow-down-solid'"
              color="primary"
              square
              variant="link"
              @click="() => globalLayoutStore.sidebarToggle()"
            />
          </UTooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const user = useSupabaseUser();
const globalLayoutStore = useGlobalLayoutStore();
const userTenantsStore = useUserTenantsStore();
const sidebarCollapsed = computed(() => globalLayoutStore.sidebarCollapsed);
const currentUserTenant = computed(() => userTenantsStore.currentUserTenant);
const topLinks = [
  [
    {
      label: '首页',
      icon: 'i-heroicons-home-solid',
      to: '/dashboard',
      labelClass: sidebarCollapsed ? '' : 'hidden',
    },
    {
      label: '搜索',
      icon: 'i-heroicons-magnifying-glass',
      to: '/dashboard/search',
      labelClass: sidebarCollapsed ? '' : 'hidden',
    },
    {
      label: '通知',
      icon: 'i-heroicons-bell-alert',
      to: '/dashboard/alert',
      labelClass: sidebarCollapsed ? '' : 'hidden',
    },
  ],
  [],
];
const tenantLinks = [
  [
    {
      label: '团队管理',
      icon: 'i-heroicons-user-group',
      to: '/dashboard/tenant/manage',
      labelClass: sidebarCollapsed ? '' : 'hidden',
      hidden: true,
    },
  ],
  [],
];
const verticalNavigationUI = {
  size: 'text-xl',
  padding: 'px-3 py-2.5',
  icon: {
    base: 'w-5 h-5',
  },
  rounded: 'rounded-2xl',
  active: 'bg-gradient-to-r to-transparent from-[--sidebar-active-bg] before:!static !font-semibold',
  inactive: 'before:!static hover:bg-gradient-to-r hover:to-transparent hover:from-[--sidebar-hover-bg] before:!static',
};
</script>
