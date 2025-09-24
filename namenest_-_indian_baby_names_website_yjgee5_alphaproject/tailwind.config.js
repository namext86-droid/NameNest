/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#ff9933',
          600: '#ea580c',
          700: '#c2410c'
        },
        emerald: {
          500: '#138808',
          600: '#0f7006',
          700: '#0c5804'
        },
        navy: {
          500: '#000080',
          600: '#000070',
          700: '#000060'
        }
      },
      fontFamily: {
        'devanagari': ['Noto Sans Devanagari', 'sans-serif']
      },
      animation: {
        'bounce-gentle': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [],
}
