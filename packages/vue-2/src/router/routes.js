export const adminRoot = 'admin';
export default [
  {
    path: '/',
    name: adminRoot,
    component: () => import('views/admin-layout.vue'),
    children: []
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('views/test/detail.vue')
  }
];
