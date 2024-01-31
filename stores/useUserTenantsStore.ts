export const useUserTenantsStore = defineStore('userTenantsStore', {
  state: () => ({
    // 用户所有的租户信息
    userTenants: [],
    // 侧边栏是否收起
    currentUserTenant: {},
  }),
  actions: {
    setUserTenants(userTenants: any) {
      this.userTenants = userTenants;
    },
    setCurrentUserTenant(currentUserTenant: any) {
      this.currentUserTenant = currentUserTenant;
    },
  },
});
