// tw v1.9× document  https://v1.tailwindcss.com/
module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  important: '#app',
  prefix: 'tw-',
  purge: ['./src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        // use vuetify theme
        primary: 'var(--v-primary-base)',
        secondary: 'var(--v-secondary-base)'
      }
    }
  },
  variants: {},
  plugins: []
};
