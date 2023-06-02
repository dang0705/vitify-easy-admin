import Vue, { defineAsyncComponent } from 'vue';

const components = [
  {
    name: 'TableView',
    component: () => import('form/layouts/main/Table-view.vue')
  },
  {
    name: 'FormView',
    component: () => import('form/layouts/minor/Form-view.vue')
  },
  {
    name: 'ListStatus',
    component: () => import('form/function/List-status.vue')
  }
];
components.forEach(({ name, component }) =>
  Vue.component(name, defineAsyncComponent(component))
);
