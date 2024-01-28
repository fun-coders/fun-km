/**
 * 此文件为pm2配置文件
 */
module.exports = {
  apps: [
    {
      name: 'fun-km',
      port: '8888',
      // 集群启动
      exec_mode: 'cluster',
      // 日志文件前增加日期
      time: true,
      // 节点数与CPU核心数一致
      instances: 0,
      // 启动文件
      script: './.output/server/index.mjs',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      env: {
        // 应用名称
        NUXT_PUBLIC_APP_TITLE: '知识库',
        NUXT_PUBLIC_LOGIN_REDIRECT: '/dashboard',
      },
      env_dev: {
        NODE_ENV: 'development',
        NUXT_PUBLIC_SUPABASE_URL: 'http://192.168.3.6:8000',
        NUXT_PUBLIC_SUPABASE_KEY:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzA1NTA3MjAwLAogICJleHAiOiAxODYzMzYwMDAwCn0.lLdp7BX1DD2vwZlQEw0QbFuaxI_pv2G1bI2eis6wNVs',
        NUXT_SUPABASE_SERVICE_KEY:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogInNlcnZpY2Vfcm9sZSIsCiAgImlzcyI6ICJzdXBhYmFzZSIsCiAgImlhdCI6IDE3MDU1MDcyMDAsCiAgImV4cCI6IDE4NjMzNjAwMDAKfQ.gPkkfxbWcaISV_jAaaELdQWqWYrfF1xn7J5GoQ4wMrc',
      },
      env_prod: {
        NODE_ENV: 'production',
        NUXT_PUBLIC_SUPABASE_URL: 'http://192.168.3.6:8000',
        NUXT_PUBLIC_SUPABASE_KEY:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzA1NTA3MjAwLAogICJleHAiOiAxODYzMzYwMDAwCn0.lLdp7BX1DD2vwZlQEw0QbFuaxI_pv2G1bI2eis6wNVs',
        NUXT_SUPABASE_SERVICE_KEY:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogInNlcnZpY2Vfcm9sZSIsCiAgImlzcyI6ICJzdXBhYmFzZSIsCiAgImlhdCI6IDE3MDU1MDcyMDAsCiAgImV4cCI6IDE4NjMzNjAwMDAKfQ.gPkkfxbWcaISV_jAaaELdQWqWYrfF1xn7J5GoQ4wMrc',
      },
      error_file: './logs/app-err.log',
      out_file: './logs/app-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
