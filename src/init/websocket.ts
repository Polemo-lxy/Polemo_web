import Oauth from "@/scripts/oauth";

let lockReconnect = false; // 是否允许重新建立连接
let timeout = 1000 * 20; // 心跳间隔
let reTimeout = 1000 * 10; // 重连间隔
let timeoutTimer = null; // 心跳定时器
let reTimeoutTimer: any = null; // 重连定时器
let webSocket = null; 

export const createWebSocket = (props: any) => {
  
  const token = Oauth.getStoreToken()
  if(!token){
    window.location.href = '/login';
    return;
  }
  const { onMessageCallback,onMesListCallback } = props;
  let webSocket = new WebSocket('ws://localhost:8080/api/getChatContent',token)
  webSocket.binaryType = 'arraybuffer';
  webSocket.onerror = function () {
    console.log('连接失败...');
    reConnect(props);
  }
  webSocket.onmessage = (event) => {
    if(event.data) {
      // 可以写一个回调函数
      let {content,contacts} = JSON.parse(event.data);
      contacts && onMesListCallback(contacts)
      content && onMessageCallback(content)
    }
  }
  webSocket.onclose = (event) => {
    console.log('连接已关闭...')
    console.log('websocket 断开: ' + event.code + ' ' + event.reason + ' ' + event.wasClean);
    reConnect(props)
  }
  return webSocket
}
export const reConnect = (props: any) => {
  if(lockReconnect) {
    return;
  }
  lockReconnect = true;
  reTimeoutTimer && clearTimeout(reTimeoutTimer)
  reTimeoutTimer = setTimeout(function () {
    createWebSocket(props)
    lockReconnect = false
  }, reTimeout)
}