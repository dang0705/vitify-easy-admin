export default () =>
  Math.floor((1 + Math.random()) * 0x10000).toString(16) + '-' + Date.now();
