export const useGlobalLayoutStore = defineStore('globalLayoutStore', {
  state: () => ({
    // 设置弹窗是否打开
    settingsModalOpen: false,
    // 新增账号弹窗是否打开
    addAccountModalOpen: false,
    // 侧边栏是否收起
    sidebarCollapsed: false,
    // 全局loading是否显示
    globalLoading: false,
    // 全局loading文案
    globalLoadingText: '',
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
    openGlobalLoading(text: string) {
      this.globalLoadingText = text;
      this.globalLoading = true;
    },
    closeGlobalLoading() {
      this.globalLoading = false;
      this.globalLoadingText = '';
    },
  },
});
