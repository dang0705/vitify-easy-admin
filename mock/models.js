export default [
  {
    actions: {},
    children: [],
    includes: ['list'],
    model: 'classes',
    name: '任课课程',
    options: {}
  },
  {
    actions: {},
    children: [],
    includes: ['list'],
    model: 'electives',
    name: '选修课程',
    options: {}
  },
  {
    children: [],
    includes: ['list', 'create'],
    model: 'message',
    name: '历史通知',
    options: { 196351: '上海开放大学数字马院' }
  }
];
