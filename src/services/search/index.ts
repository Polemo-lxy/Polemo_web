import { request } from "umi";

export const fetchSearch = (text: string) =>
  request('/api/search',{
    method: 'GET',
    params: {
      search: text
    }
  })