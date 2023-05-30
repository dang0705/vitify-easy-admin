import { helpers } from '@utils/helpers';
export default (title, data) =>
  helpers.isObject(title)
    ? `将${
        title.name || title.id
          ? `${title.name ? '名' : 'ID'}为 <span class='tw-text-primary'>【 ${
              title.name || title.id
            } 】</span>的`
          : '该'
      }${title.body || '条目'}<span class="tw-text-blue-400">${
        title.operate
      }</span>`
    : helpers.isFunction(title)
    ? title(data)
    : title;
