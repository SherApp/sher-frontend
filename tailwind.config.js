module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        purple: '#8A0CE1',
        pink: '#EC38BC'
      },
      boxShadow: {
        button: '0 5px 20px 0 #EC38BC94'
      },
      zIndex: {
        '-10': '-10'
      },
      animation: {
        slideInTop: 'slideInTop 0.5s forwards ease-in-out'
      },
      keyframes: {
        slideInTop: {
          '0%': {
            transform: 'translateY(50px)',
            opacity: 0
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1
          }
        }
      }
    },
    fontFamily: {
      handwriting: 'Sacramento',
      sans: 'Oswald'
    },
    linearGradientColors: (theme) => ({
      'purple-pink': [theme('colors.purple'), theme('colors.pink')]
    }),
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '8rem',
        '2xl': '10rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwindcss-gradients'), require('tailwindcss-typography')]
};
