import type { Config } from 'tailwindcss';

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default <Partial<Config>>{
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
      },
      // https://uicolors.app/
      colors: {
        green: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A',
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052e16',
        },
        blue: {
          50: '#eff3ff',
          100: '#dce3fd',
          200: '#c0cefd',
          300: '#95affb',
          400: '#6486f6',
          500: '#4461f2',
          600: '#2a3de6',
          700: '#212ad4',
          800: '#2124ac',
          900: '#202588',
          950: '#181953',
        },
      },
    },
  },
};
