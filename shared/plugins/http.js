import axios from 'axios';
import { useBus } from '@bus';
import { baseURL, statusCodes } from '@/define/http';

const base = import.meta.glob('/src/configs/http-base.js', {
  eager: true,
  import: 'default'
});
const headersConfig = import.meta.glob('/src/configs/http-headers-config.js', {
  eager: true,
  import: 'default'
});

const http = axios.create({
  baseURL: base['/src/configs/http-base.js'] || baseURL
});

const errorHandler = ({ msg, code }) => useBus.emit('err', { msg, code });

http.interceptors.request.use(
  async (config) => {
    const configHeaders = headersConfig['/src/configs/http-headers-config.js'];
    configHeaders && configHeaders(config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  async (response) => {
    const {
      data: { code, data, message },
      config: { third },
      status
    } = response;
    if (code && code === statusCodes.OK) {
      return Promise.resolve(data);
    } else {
      errorHandler({ code, msg: message });
      return Promise.reject({ code, message });
    }
  },
  (error) => {
    errorHandler({ msg: '服务器繁忙，请稍后' });
    return Promise.reject(error);
  }
);

export default {
  install(app) {
    app.prototype.$http = http;
  }
};
export const $http = http;
