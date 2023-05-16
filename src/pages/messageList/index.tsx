import { Layout,Skeleton } from 'antd'
import styles from './index.less'
import MessageContent from './MessageContent';
import { connect, useDispatch } from 'umi';
import { createWebSocket } from '@/init/websocket';
import { useCallback, useEffect, useMemo, useState,lazy,Suspense, createContext, useContext } from 'react';
import List from './List'

const { Sider, Content } = Layout;
// const List = lazy(() => import('./List'));

export const SocketContext = createContext<{socket?: any}>({})

export const MessageList =  ({chat,list}: any) => {
  const dispatch = useDispatch()
  const messageChange = (list: any) => {
    dispatch({
      type: 'currentChat/setCurrentChat',
      payload: {
        ...chat,
        msgList: list
      }
    })
  }

  const onMesListCallback = (list: any) => {
    dispatch({
      type: 'connectList/setConnectList',
      payload: list
    })
  }
  let context = useContext(SocketContext)
  const [socket,setSocket] = useState<WebSocket>()
  useEffect(() => {
    const socket = createWebSocket({onMessageCallback: messageChange,onMesListCallback})
    setSocket(socket)
    context.socket = socket
  },[])

  return <>
    <Layout className={styles.messageListBox}>
      <Sider theme='light' width={350} defaultCollapsed={false} collapsible={false} className={styles.sider}>
        {/* <Suspense
          fallback={() => {
            return <>
              <div className={styles.skeletonBox}>
                  <div className={styles.searchBox} >
                    <Skeleton.Input active className={styles.input} />
                    <Skeleton.Button active className={styles.button} />
                  </div>
                  <div className={styles.listBox} >
                    {
                      Array(5).fill(0).map(item => {
                        return <Skeleton.Input className={styles.input} active />
                      })
                    }
                  </div>
                </div>
              </>
          }}
        >
          <List socket={socket}/>
        </Suspense> */}
        <List socket={socket}/>
      </Sider>
      <Content>
        <MessageContent socket={socket}/>
      </Content>
    </Layout>
  </>
}

//@ts-ignore
export default connect(({ currentChat,connectList }) => ({chat: currentChat.chat,list: connectList.list}))(MessageList);