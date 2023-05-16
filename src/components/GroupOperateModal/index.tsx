import { Modal, Tabs } from 'antd'
import AttendToGroup from './components/AttendToGroup'
import CreateGroup from './components/CreateGroup'



export default function GroupOperateModal({callbackGroup}: any){
  const callback = () => {
    modal.destroy()
  }

  // const NewGroup = () => {

  //   if(socket) {
  //     socket?.send(JSON.stringify({
  //       ...chat.chatInfo,
  //       mesCategory: 'addConcat',
  //       msgInfo: {}
  //     }))
  //   }

  // }
  const modal = Modal.confirm({
    title: null,
    bodyStyle: {paddingTop: 20},
    content: <Tabs
      defaultActiveKey="1"
      destroyInactiveTabPane

      items={[
        {
          label: '加入群组',
          key: "1",
          children: <AttendToGroup callback={callbackGroup}/>
        },
        {
          label: '新建群聊',
          key: "2",
          children: <CreateGroup destoryModal={callback} callback={callbackGroup}/>
        }
      ]}
    />,
    icon: null,
    // onCancel: () => {callback(false)},
    maskClosable: true,
    // 隐藏确定、取消按钮
    cancelButtonProps: {style: {display: 'none'}},
    okButtonProps: {style: {display: 'none'}},
  })
}