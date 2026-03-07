import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0EA5E9',
        dark: '#0A0A0A',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
