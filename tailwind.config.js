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
    extend: {}
  },
  plugins: [require('tailwindcss-gradients'), require('tailwindcss-typography')]
};
