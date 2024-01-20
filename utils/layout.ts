/**
 * @description: 判断是否为移动端设备
 */
export const isMobile = () => {
  // 服务端渲染情况下，直接返回null
  if (process.server) return null;
  return (
    RegExp(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
    ).exec(navigator.userAgent) !== null
  );
};
