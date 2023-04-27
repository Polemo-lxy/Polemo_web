import { request, useRequest } from 'umi'
import { Typography, Form, Input, Button,message } from 'antd'
import {  useEffect, useLayoutEffect, useMemo, useState } from 'react'
import styles from './index.less'
import { getIdentifyCode, LoginSystem, RegisterAccount, SendEmailIdentifyCode } from '@/services/login'
import classnames from 'classnames'
import Oauth from '@/scripts/oauth'
import queryString from 'query-string'

const { Title } =  Typography
const { Item } = Form
const { Password } = Input

interface urlObjType {
  url?: string,
  query: {
    state?: string
  }
}
export default () => {
  const {query: { state }}: urlObjType = queryString.parseUrl(window.location.search)
  const [pageType,setPageType] = useState('login');
  const [form] = Form.useForm()
  const { data: captchaInfo , run: getCaptcha } = useRequest(getIdentifyCode,{
    manual: true,
  })
  
  const getCaptchaFun = async () => {
    await getCaptcha()
  }
  useLayoutEffect(() => {
    getCaptchaFun()
  },[])
  const svgDom = useMemo(() => {
    return (
      <div className={styles.svgDom}>
        <div
          dangerouslySetInnerHTML={{__html: captchaInfo?.img}}
          onClick={async () => {
            await getCaptchaFun()
          }}
        />
        <a 
          onClick={async () => {
            await getCaptchaFun()
          }}
        >
          看不清换一张
        </a>
      </div>
    )
  },[captchaInfo])
  const onLoginFinish = async (value: any) => {
    const {data: token} = await LoginSystem({...value,captchaId: captchaInfo.id})
    Oauth.setStoreToken(token)
    if(token){
      window.location.href = state || '/'
    }
  }
  const sendEmailIdentifyCode = async () => {
    form.validateFields(['email']).then(async (res) => {
      await SendEmailIdentifyCode(res)
      timer()
    })
  }
  const onRegisterFinish = async (value: any) => {
    await RegisterAccount(value)
    message.success('注册成功！')
    toLogin()
  }
  const toRegister = () => {
    setPageType('register')
  }
  const toLogin = () => {
    setPageType('login')
  }
  const [registerCode,setRegisterCode] = useState<number | string>('发送验证码')
  const timer = () => {
    const id = setInterval(() => {
      setRegisterCode((code: number| string) => {
        if(typeof code !== 'number'){
          return 60
        }
        if(code !==  0){
          return code -1
        }
        clearInterval(id)
        return '重发验证码'
      })
    },1000)
  }
  return <div className={styles.page}>
    <div className={styles.loginBox}>
      <Title className={styles.loginTitle}>
        柚子Room | 谈笑风生
      </Title>
      <Form 
        className={classnames(styles.form,{
          [styles.formHidden]: pageType === 'register'
        })}
        onFinish={onLoginFinish}
      >
        <Item 
          name='accountNumber' 
          label='账号' 
          validateTrigger='onBlur'
          rules={[
            {
              required: true, 
              whitespace: true,
              message: '请输入账号哦！'
            },
            {
              validateTrigger: 'onBlur',
              validator: (rule,value: string) => {
                const phoneReg = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
                const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                if (!value?.match(phoneReg) && !value?.match(emailReg) && value?.replaceAll(' ','').length){
                  return Promise.reject()
                }
                return Promise.resolve()
              },
              message: '请输入正确的账号'
            }
          ]}
        >
          <Input placeholder='请输入手机或者邮箱账号'/>
        </Item>
        <Item 
          name='password' 
          label='密码' 
          rules={[
            {
              required: true,
              whitespace: true,
              message: '请输入密码哦！'
            }
          ]}
        >
          <Password placeholder='请输入账号对应密码'/>
        </Item>
        <div className={styles.CaptchaComponent}>
          <Item 
            label='验证码'
            name='captchaText'
            rules={[
              {
                required: true,
                whitespace: true,
                message: '您遗漏了验证码哦！'
              }
            ]}
          >
            <Input className={styles.captchaInput}/>
          </Item>
          {
            svgDom
          }
        </div>
        <Item>
          <Button type='primary' htmlType='submit' >登录</Button>
          <Button type='link' onClick={toRegister}>去注册</Button>
        </Item>
      </Form>
      <Form
        onFinish={onRegisterFinish}
        form={form}
        className={classnames(styles.form,{
          [styles.formHidden]: pageType === 'login'
        })}
      >
        <Item
          label='昵称'
          name='nickname'
          rules={[{
            required: true,
            message: '请输入自定义昵称！'
          }]}
        >
          <Input />
        </Item>
        <div className={styles.CaptchaComponent} style={{position: 'relative'}}>
          <Item
            label='邮箱'
            name='email'
            rules={[{
              required: true,
              message: '请输入邮箱！'
            }]}
            style={{width: '100%'}}
          >
            <Input type='email' />
          </Item>
          <Button 
            disabled={typeof registerCode === 'number'} 
            style={{position: 'absolute',right: -105}} 
            onClick={sendEmailIdentifyCode}
          >
            {typeof registerCode === 'number'?`${registerCode}s后重发`:registerCode}
          </Button>
          {/* <a style={{position: 'absolute',right: -80}} onClick={sendEmailIdentifyCode}>{registerCode}</a> */}
        </div>
        <Item
          label='密码'
          name='password'
          rules={[{
            required: true,
            message: '请输入密码！'
          }]}
        >
          <Input/>
        </Item>
        <Item
          label='验证码'
          name='captcha'
          rules={[{
            required: true,
            message: '请输入邮箱验证码！'
          }]}
        >
          <Input/>
        </Item>
        <Item>
          <Button type='primary' htmlType='submit' >注册</Button>
          <Button type='link' onClick={toLogin}>去登录</Button>
        </Item>
      </Form>
    </div>
  </div>
}