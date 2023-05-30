import { scripts } from '../../package.json';
export default (cb) => {
  const apps = [];
  let app = '';
  Object.keys(scripts).forEach((script) => {
    if (script.startsWith('app:')) {
      app = script.split(':')[1].split('--')[0];
      !apps.includes(app) && apps.push(app);
      cb && cb(app);
    }
  });
  return apps;
};
