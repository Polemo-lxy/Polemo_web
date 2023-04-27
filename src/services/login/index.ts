import { request } from "umi";

export const fetchOauthToken = () => 
  request('/api/getToken',{
    method: 'GET'
  })
export const getIdentifyCode = () => 
  request('/api/identifyCode',{
    method: 'GET'
  })
export const LoginSystem = (data: any) => 
  request('/api/login',{
    method: 'POST',
    data,
  })
export const SendEmailIdentifyCode = (data: any) => 
  request('/api/emailIdentifyCode',{
    method: 'POST',
    data
  })

export const RegisterAccount = (data: any) => 
  request('/api/register',{
    method: 'POST',
    data,
  })
