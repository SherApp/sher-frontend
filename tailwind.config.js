module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
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
    })
  },
  variants: {
    extend: {},
    scrollbar: ['rounded']
  },
  plugins: [
    require('tailwindcss-gradients'),
    require('tailwindcss-typography'),
    require('tailwind-scrollbar')
  ]
};
