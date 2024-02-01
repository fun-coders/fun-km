export const useGlobalLayoutStore = defineStore('globalLayoutStore', {
  state: () => ({
    // 设置弹窗是否打开
    settingsModalOpen: false,
    // 新增账号弹窗是否打开
    addAccountModalOpen: false,
    // 侧边栏是否收起
    sidebarCollapsed: false,
  }),
  actions: {
    settingsToggle() {
      this.settingsModalOpen = !this.settingsModalOpen;
    },
    addAccountToggle() {
      this.addAccountModalOpen = !this.addAccountModalOpen;
    },
    sidebarToggle() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
  },
});
