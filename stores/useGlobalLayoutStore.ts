export const useGlobalLayoutStore = defineStore('globalLayoutStore', {
  state: () => ({
    // 设置弹窗是否打开
    settingsModalOpen: false,
  }),
  actions: {
    settingsToggle() {
      this.settingsModalOpen = !this.settingsModalOpen;
    },
  },
});
