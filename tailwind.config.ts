import typographyPlugin from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#7743A9',
          100: '#c3a9dd',
          200: '#b697d5',
          300: '#aa84ce',
          400: '#9d72c7',
          500: '#905fc0',
          600: '#844db8',
          700: '#7743a9',
          800: '#6a3c97',
          900: '#502d72',
        },
        secondary: {
          DEFAULT: '#2A174B',
        },
        tertiary: {
          DEFAULT: '#281931',
        },
      },
      spacing: {
        18: '4.5rem',
        112: '28rem',
        120: '30rem',
      },
    },
  },
  plugins: [typographyPlugin],
} satisfies Config
