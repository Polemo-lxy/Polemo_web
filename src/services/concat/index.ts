import { stringifyUrl } from "query-string";
//@ts-ignore
import { request } from "umi";

// 获取消息列表
export const fetchConcatList =async () => 
  request('/api/getConcatList',{
    method: 'GET'
  })
// type为1代表双方会话，type为2代表群组对话
// 根据id 获取消息
export const fetchChatContent =async ({type,receiverId}: any) => 
  await request(stringifyUrl({
    url: '/api/getChatContent',
    query: {
      type,
      receiverId
    }}),
    {
      method: 'GET'
    })

    
// 联系人列表
export const fetchConcatPerson =async () => 
  request('/api/getConcatPerson',{
    method: 'GET'
  })
// 群组列表
export const fetchConcatGroup =async () => 
  request('/api/getConcatGroup',{
    method: 'GET'
  })

// 发送消息
export const sendChatMessage = async (data: any) => 
  request('/api/insertChatMessage',{
    method: 'POST',
    data
  })


// 创建群聊
export const createGroup = async (data: any) => 
  request('/api/createGroup',{
    method: 'POST',
    data
  })