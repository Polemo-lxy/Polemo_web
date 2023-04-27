import { parseUrl,stringifyUrl } from "query-string";
import { request } from "umi";

// 获取当前用户
export const fetchCurrentUser = async () =>
  request('/api/getCurrentUser',{
    method: 'GET'
  })

// 搜索联系人
export const fetchRelatedAccounts = async (params: string) => 
  request(stringifyUrl({
    url: '/api/fetchRelatedAccounts',
    query:{search:params}
  }),{
    method: 'GET'
  })

// 搜索群组
export const fetchRelatedGroups = async (params: string) => 
  request(stringifyUrl({
    url: '/api/fetchRelatedGroups',
    query: {search: params}
  }),{
    method: 'GET'
  })

// 添加联系人或者群组
export const addAccount = async (data: any) => 
  request('/api/addAccount',{
    method: 'POST',
    data
  })

// 加入群聊
export const attentToGroup = async (data: any) => 
  request('/api/attendToGroup',{
    method: 'POST',
    data
  })

// 删除好友
export const deleteAccount = async (data: any) => 
  request('/api/deleteAccount',{
    method: 'DELETE',
    data
  })


// 更改头像
export const changeSelfHeadPath = async (url: any) => 
  request('/api/changeHeadPath',{
    method: 'POST',
    data: {
      url
    }
  })