/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#d4af37',
          light: '#e8c869',
          dark: '#a8861e'
        },
        ink: {
          900: '#050505',
          800: '#0a0a0a',
          700: '#111111',
          600: '#1a1a1a',
          500: '#222222'
        },
        cream: {
          50: '#fdfcf8',
          100: '#f7f3e9',
          200: '#efe7d2'
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cairo: ['Cairo', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
        inter: ['Inter', 'sans-serif']
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.9s ease forwards',
        'shimmer': 'shimmer 2.5s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    }
  },
  plugins: []
};
