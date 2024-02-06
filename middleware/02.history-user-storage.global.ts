export default defineNuxtRouteMiddleware(() => {
  if (process.server) return;
  const user = useSupabaseUser();
  if (!user?.value) return;
  const historyUsers: any[] = JSON.parse(localStorage.getItem(USERS_LOCALSTORAGE_KEY) ?? '[]');
  // 保存登录状态
  const localUser = localStorage.getItem(CURRENT_USER_LOCALSTORAGE_KEY);
  if (historyUsers.length <= 0 && localUser) {
    localStorage.setItem(USERS_LOCALSTORAGE_KEY, JSON.stringify([JSON.parse(localUser)]));
  } else if (localUser) {
    const index = historyUsers.findIndex((u) => u?.user?.id === user?.value?.id);
    if (index === -1) {
      localStorage.setItem(USERS_LOCALSTORAGE_KEY, JSON.stringify([...historyUsers, JSON.parse(localUser)]));
    }
  }
});
