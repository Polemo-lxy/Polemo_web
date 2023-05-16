
export const routeMenu = [
  {
    path: '/messageList',
    name: '消息',
    iconType: 'icon-message'
  },
  {
    path: '/contacts',
    name: '联系人',
    iconType: 'icon-person'
  },
  // {
  //   path: '/calendar',
  //   name: '日程',
  //   iconType: 'icon-calendar',
  // },
  // {
  //   path: '/app1',
  //   name: '子应用1',
  //   iconType: 'icon-message'
  // },
  // {
  //   path: '/app2',
  //   name: '子应用2',
  //   iconType: 'icon-message'
  // }
]


const routerConfig = [
  {
    path: '/login',
    component: '@/pages/login/index'
  },
  {
    path: '/rtcroom',
    component: '@/pages/rtc/index'
  },
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '/messagelist',
        component: '@/pages/messageList/index',
      },
      {
        path: 'contacts',
        component: '@/pages/contactList/index'
      },
      {
        path: 'calendar',
        component: '@/pages/calendar/index'
      },
      // // 插件构建时子应用路由配置
      // {
      //   path: '/app1',
      //   component: '@/pages/childApp1/index',
      // },
      // {
      //   path: '/app2',
      //   component: '@/pages/childApp2/index'
      // },
      // {
      //   path: '/app1',
      //   microApp: 'childApp1'
      // },
      // {
      //   path: '/app2',
      //   microApp: 'childApp2'
      // },
      {
        path: '/',
        redirect: '/messagelist',
        // component: '@/pages/messageList/index',
      },
      {
        component: '@/pages/404'
      }
    ]
  },
  {
    component: './404'
  }
]
export default routerConfig;