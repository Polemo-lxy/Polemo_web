// import queryString from "query-string";


const { protocol, host, pathname, origin, search } = window.location;
const LOGOUT_URL = '/login';
const STATE = `${protocol}//${host}${pathname}${search}`

class Oauth {
  // 登录方法
  static login() {
    // 清除本地已有的token
    Oauth.removeStoreToken();
    window.location.href = `/login?state=${STATE}`
    // window.location.href = queryString.stringifyUrl({
    //   url: '/login',
    //   query:{
    //     state: STATE
    //   }
    // })
  }
  // 退出账号
  static logout() {
    Oauth.removeStoreToken()
    window.location.href = LOGOUT_URL
  }
  // 从后端获取对应的token
  // static async getAccessToken(code:string) {
  //   const { data } = await fetchOauthToken({
  //     code,
  //     redirectUri: '/login'
  //   })
  // }

  // 从本地获取token
  static getStoreToken() {
    return window.localStorage.getItem('token')
  }
  // 存储token
  static setStoreToken(token: string) {
    if(!token)return;
    window.localStorage.setItem('token',token)
  }
  // 清除存储的token
  static removeStoreToken() {
    window.localStorage.removeItem('token')
  }
  // 是否登录页面
  static isLoginPage() {
    return window.location.pathname === '/login'
  }
}

export default Oauth;