import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
            10: '#F7F7F7',
            30: '#E1E1E1',
            50: '#C8C8C8',
            70: '#646464',
            90: '#444444',
            100: '#353535',
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
        'card': '16px',
        'button': '12px',
      },
    },
  },
  plugins: [],
}
export default config

