import Vue from 'vue';
import App from './App.vue';
import Vuetify from '@configs/vuetify';
import router from '@vue-2-router';
import pinia from '@store';

const vuetify = Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#83C337',
        secondary: '#474C70'
      }
    }
  }
});
new Vue({
  pinia,
  render: (h) => h(App),
  vuetify,
  router
}).$mount('#app');
