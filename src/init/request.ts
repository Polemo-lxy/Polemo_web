import Oauth from '@/scripts/oauth';
import { RequestConfig } from 'umi'
import type { RequestInterceptor } from 'umi-request'

const authHeaderInterceptor:RequestInterceptor = (url,options) => {
  const token = Oauth.getStoreToken() as string;
  const authHeader = { Authorization: token };
  const customHeaders = JSON.stringify(options.headers) === '{}' ? authHeader : options.headers;
  // const customHeaders = authHeader
  return {
    url,
    options: { ...options, interceptors: true, headers: customHeaders },
  };
}

export const request:RequestConfig = {
  errorHandler: (error) => {
    if(error?.response) {
      const { status, url } = error?.response;
      const { method } = error.request?.options || {};
      if(status === 401) {
        method === 'GET' && Oauth.login();
        return null
      }
    }
    console.log(error);
  },
  requestInterceptors: [authHeaderInterceptor]
}