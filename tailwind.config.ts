import type { Config } from 'tailwindcss';

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{vue,js,ts,jsx,tsx}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    container: {
      center: true,
    },
  },
  plugins: [],
};
