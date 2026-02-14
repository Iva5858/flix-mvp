import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        flix: {
          primary: '#73D700',
          secondary: '#FFAD00',
          background: '#FFFFFF',
          ui: {
            primary: '#31A100',
            primaryLight: '#5CC500',
            primaryDark: '#187D00',
          },
          grayscale: {
            0: '#FFFFFF',
            10: '#FAFAFA',
            20: '#F5F5F5',
            30: '#E8E8E8',
            50: '#A3A3A3',
            70: '#737373',
            90: '#404040',
            100: '#262626',
          },
          feedback: {
            success: '#228F00',
            warning: '#FF5704',
            danger: '#DD2828',
            info: '#016AE7',
          },
        },
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'card-hover': '0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 6px -2px rgb(0 0 0 / 0.04)',
      },
    },
  },
  plugins: [],
}
export default config

