import { IConfig } from 'umi';

const proxy: IConfig['proxy'] = {
  '/api/*': {
    target: 'http://localhost:3005/',
    changeOrigin: true,
  },
};

export default proxy;
