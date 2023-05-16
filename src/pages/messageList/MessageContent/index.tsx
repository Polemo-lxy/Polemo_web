import { IconFont } from '@/components/IconFont'
import { Empty, Layout, List } from 'antd'
//@ts-ignore
import { connect, useDispatch } from 'umi'
import styles from './index.less'
import Header from './components/header'
import Content from './components/content'
import Footer from './components/footer'
import { createWebSocket } from '@/init/websocket'
import { useEffect, useState } from 'react'

const MessageContent = ({chat,socket}: any) => {
  const isEmpty = Object.keys(chat).length === 0;
  const [replyItem,setReplyItem] = useState({})

  return <div className={styles.messageContent}>
    {
      isEmpty
      ?
        <Empty description='您的消息列表空空如也' className={styles.empty} image={<IconFont type='icon-empty' className={styles.messageContentEmpty}/>}/>
      :
        <Layout
          style={{width: '100%',background: '#fff',height: '100vh'}}
        >
          <Header chat={chat}/>
          <Content chat={chat} setReplyItem={setReplyItem} socket={socket}/>
          <Footer chat={chat} socket={socket} replyItem={replyItem} setReplyItem={setReplyItem}/>
        </Layout>
    }
  </div>
}
//@ts-ignore
export default connect(({ currentChat }) => ({chat: currentChat.chat}))(MessageContent);