import { Dropdown } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import styles from './index.less'
import { IconFont } from '@/components/IconFont'
import AddAccount from '@/components/AddAccount'
import { useContext, useState } from 'react'
import GroupOperateModal from '@/components/GroupOperateModal'
import { reConnect } from '@/init/websocket'
import { SocketContext } from '@/pages/messageList'
import { useSelector } from 'umi'

export default () => {
  const [addAccountShow,setAddAccount] = useState(false)

  const items: MenuProps['items'] = [
    {
      key: 0,
      label: '群组操作',
      icon: <IconFont type="icon-group"/>,
      onClick: () => GroupOperateModal({callbackGroup})
    },
    {
      key: 1,
      label: '添加联系人',
      icon: <IconFont type="icon-add-user"/>,
      onClick: () => setAddAccount(true)
    },
    // {
    //   key: 2,
    //   label: '创建文档',
    //   icon: <IconFont type="icon-adddoc"/>
    // },
    // {
    //   key: 3,
    //   label: '加入会议',
    //   icon: <IconFont type="icon-attendence"/>
    // }
  ]
  const {socket} = useContext(SocketContext)
  const callbackGroup = () => {
    if(socket) {
      socket?.send(JSON.stringify({
        ...chat.chatInfo,
        mesCategory: 'addGroup',
        msgInfo: {}
      }))
    }
  }
  //@ts-ignore
  const { currentChat: {chat},connectList: {list} } = useSelector(({currentChat,connectList}) =>({currentChat,connectList}))
  const callback = () => {
    if(socket) {
      socket?.send(JSON.stringify({
        ...chat.chatInfo,
        mesCategory: 'addConcat',
        msgInfo: {}
      }))
    }
  }

  return <>
    <Dropdown
        className={styles.dropdownBody}
        overlayClassName={styles.dropdownList}
        menu={{items}}
      >
      <PlusOutlined/>
    </Dropdown>
    { addAccountShow && <AddAccount addAccountShow={addAccountShow} setAddAccount={setAddAccount} callback={callback} />}
  </>
}