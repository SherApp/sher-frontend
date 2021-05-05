const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette')
  .default;

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
      gridTemplateColumns: {
        upload: '32px repeat(auto-fit, minmax(20px, 1fr))'
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
  plugins: [
    require('tailwindcss-gradients'),
    require('tailwindcss-typography'),
    // https://github.com/tailwindlabs/tailwindcss/pull/560#issuecomment-670045304
    ({ addUtilities, _, theme, variants }) => {
      const colors = flattenColorPalette(theme('borderColor'));
      delete colors['default'];

      const colorMap = Object.keys(colors).map((color) => ({
        [`.border-t-${color}`]: { borderTopColor: colors[color] },
        [`.border-r-${color}`]: { borderRightColor: colors[color] },
        [`.border-b-${color}`]: { borderBottomColor: colors[color] },
        [`.border-l-${color}`]: { borderLeftColor: colors[color] }
      }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants('borderColor'));
    }
  ]
};
