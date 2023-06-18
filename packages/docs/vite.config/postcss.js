export default {
  plugins: [
    require('postcss-preset-env')({
      features: { 'nesting-rules': true }
    }),
    require('cssnano')({
      preset: ['advanced', {}]
    }),
    require('tailwindcss')
  ]
};
