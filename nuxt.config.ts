// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 15500,
  },
  app: {
    head: {
      title: process.env.NUXT_PUBLIC_APP_TITLE || '知识库',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'zh-cn',
      },
    },
  },
  runtimeConfig: {
    public: {},
  },
  modules: ['@nuxtjs/eslint-module', '@nuxt/image', '@nuxtjs/google-fonts', '@nuxtjs/supabase', '@element-plus/nuxt', '@nuxtjs/tailwindcss'],
  css: ['~/assets/styles/main.scss', '@fortawesome/fontawesome-svg-core/styles.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/styles/global/element.scss" as element;`,
        },
      },
    },
  },
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons',
    ],
  },
  image: {
    format: ['webp'],
  },
  // https://supabase.nuxtjs.org/
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_SUPABASE_KEY,
    serviceKey: process.env.NUXT_SUPABASE_SERVICE_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/',
      exclude: [],
    },
  },
  elementPlus: {
    importStyle: 'scss',
  },
  tailwindcss: {
    cssPath: '~/assets/styles/global/tailwind.scss',
    configPath: 'tailwind.config.ts',
    injectPosition: 'last',
  },
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  eslint: {
    cache: true,
    emitWarning: false,
  },
  googleFonts: {
    download: true,
    families: {
      Roboto: true,
      'Noto+Serif+Simplified+Chinese': true,
    },
    display: 'swap',
    preload: true,
  },
});
