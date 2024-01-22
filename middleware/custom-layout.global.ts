export default defineNuxtRouteMiddleware((to) => {
  // 根据路由参数选择布局
  if (to.query.layout) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return setPageLayout(to.query.layout);
  }
  // 控制台布局
  const dashboardLayoutPages = ['/dashboard'];
  // 全屏布局
  const fullScreenLayoutPages = ['/login', '/register'];
  for (const dashboardLayoutPage of dashboardLayoutPages) {
    if (to.path.startsWith(dashboardLayoutPage)) {
      return setPageLayout('desktop-dashboard');
    }
  }
  for (const fullScreenLayoutPage of fullScreenLayoutPages) {
    if (to.path.startsWith(fullScreenLayoutPage)) {
      return setPageLayout('desktop-full-screen');
    }
  }
  // 默认布局
  return setPageLayout('desktop-home-page');
});
