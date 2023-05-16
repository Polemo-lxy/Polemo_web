import { useEffect, useState } from "react";
import { request } from './init/request'
import oauth from "./scripts/oauth";
import { fetchCurrentUser } from "./services/getUser";

async function getInitialState() {
  console.log('LoginPage',oauth.isLoginPage())
  //@ts-ignore
  if(oauth.isLoginPage()) {
    return {}
  }
  const {data: userInfo} = await fetchCurrentUser()
  return {
    userInfo
  }
}

// // 运行时动态注册子应用
// export const qiankun = new Promise((resolve,reject) => {

//   resolve({
//     apps: [
//       {
//         name: 'childApp1',
//         entry: '//localhost:3005',
//         // 拉取entry时是否需要携带cookie
//         credential: false,
//         // 主应用传递给子应用的数据——父子应用通信
//         props: {
//           userInfo: {
//             name: 'lxy',
//             age: 21
//           }
//         }
//       },
//       {
//         name: 'childApp2',
//         entry: '//localhost:3006',
//         credential: false,
//       }
//     ],
//     liftCycles: {
//       afterMount: (props: any) => {
//         console.log(props);
//       }
//     },
//     routes: [
//       {
//         path: '/app1',
//         // 关联的微应用名称
//         microApp: 'childApp1',
//         // 微应用的配置
//         microAppProps: {
//           // 设置loading动画的开启与关闭，<MicroApp/>中也有此属性
//           autoSetLoading: false,
//           className: 'lxy',
//           wrapperClassName: 'lxy_wrapper',
//         }
//       },
//       {
//         path: '/app2',
//         microApp: 'childApp2',
//         microAppProps: {
//         }
//       }
//     ],
//     // sandbox: {
//     //   strictStyleIsolation: true
//     // },
//     // sandbox: {
//     //   experimentalStyleIsolation: true
//     // },
//     // sandbox: false, // 保证子应用间样式隔离，但是没办法保证父子间样式隔离


//     // 是否开启预加载 true | false | all | string[]
//     // true 开启预预加载，在第一个子应用mount后预加载第二个子应用
//     // all 主应用start后立即预加载所有子应用的静态资源
//     // string[] 第一个子应用mount后预加载数组内的子应用资源
//     // function() 自定义微应用的资源加载时机
//     // prefetch: ['childApp2'],
//   })
// })

// export function useQiankunStateForSlave(){
//   const [userInfo,setUserInfo] = useState({
//     name: 'lxy',
//     age: 21
//   })
//   return {
//     userInfo,
//     setUserInfo
//   }
// }
export { request, getInitialState }