// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  devServer: {
    host: '0.0.0.0',
    port: 15500,
  },
  app: {
    head: {
      title: process.env.NUXT_PUBLIC_APP_TITLE ?? '知识库',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'zh-cn',
      },
    },
  },
  runtimeConfig: {
    supabaseServiceKey: process.env.NUXT_SUPABASE_SERVICE_KEY,
    public: {
      appTitle: process.env.NUXT_PUBLIC_APP_TITLE ?? '知识库',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
      loginRedirect: process.env.NUXT_PUBLIC_LOGIN_REDIRECT ?? '/dashboard',
      routeWhiteList: process.env.NUXT_ROUTE_WHITE_LIST ?? '/login,/register,/about,/',
    },
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@formkit/auto-animate/nuxt',
  ],
  css: ['~/assets/styles/main.scss'],
  image: {
    format: ['webp'],
  },
  // https://supabase.nuxtjs.org/
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    serviceKey: process.env.NUXT_SUPABASE_SERVICE_KEY,
    redirectOptions: {
      login: '/login',
      callback: process.env.NUXT_PUBLIC_LOGIN_REDIRECT ?? '/dashboard',
      exclude: process.env.NUXT_ROUTE_WHITE_LIST?.split(',') ?? ['/login', '/register', '/about', '/'],
    },
    clientOptions: {
      auth: {
        debug: false,
        // 自动刷新token
        autoRefreshToken: true,
        // 是否将登录会话保留到localStorage中
        persistSession: true,
        // 浏览器localStorage的自定义key
        storageKey: 'fun_km_supabase',
      },
      db: {
        // 设置默认的schema
        schema: 'fun_km',
      },
    },
  },
  eslint: {
    cache: true,
    emitWarning: false,
  },
  googleFonts: {
    download: true,
    families: {
      Poppins: true,
      Roboto: true,
      'Noto+Serif+Simplified+Chinese': true,
    },
    display: 'swap',
    preload: true,
  },
});
