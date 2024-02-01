import type { Config } from 'tailwindcss';

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
      },
      // https://uicolors.app/
      colors: {
        aztec: {
          '50': '#f5f8f7',
          '100': '#ddeae9',
          '200': '#bcd3d2',
          '300': '#92b6b4',
          '400': '#6b9696',
          '500': '#517a7b',
          '600': '#3f6162',
          '700': '#354f50',
          '800': '#2e4041',
          '900': '#293738',
          '950': '#121b1c',
        },
        corduroy: {
          '50': '#f5f6f6',
          '100': '#e4e9e9',
          '200': '#ccd5d5',
          '300': '#a9b7b7',
          '400': '#7e9292',
          '500': '#5d6f6f',
          '600': '#556465',
          '700': '#495455',
          '800': '#414849',
          '900': '#393f40',
          '950': '#232829',
        },
        'green-smoke': {
          '50': '#f6f6ef',
          '100': '#ebecdb',
          '200': '#d9dbbb',
          '300': '#bfc492',
          '400': '#a4ab6d',
          '500': '#889052',
          '600': '#6a723e',
          '700': '#525833',
          '800': '#43482c',
          '900': '#3a3e29',
          '950': '#1e2112',
        },
      },
    },
  },
};
