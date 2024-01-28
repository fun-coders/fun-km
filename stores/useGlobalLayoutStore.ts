export const useGlobalLayoutStore = defineStore('globalLayoutStore', {
  state: () => ({
    // 设置弹窗是否打开
    settingsModalOpen: false,
    // 侧边栏是否收起
    sidebarCollapsed: false,
  }),
  actions: {
    settingsToggle() {
      this.settingsModalOpen = !this.settingsModalOpen;
    },
    sidebarToggle() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
  },
});
