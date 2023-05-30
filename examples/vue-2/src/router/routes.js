export default [
  {
    path: '/',
    name: 'admin',
    component: () => import('@vue-2-views/admin-layout.vue'),
    children: []
  }
];
