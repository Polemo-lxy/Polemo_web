import { Modal, Tabs } from 'antd'
import AttendToGroup from './components/AttendToGroup'
import CreateGroup from './components/CreateGroup'



export default function GroupOperateModal(){
  const callback = () => {
    modal.destroy()
  }
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
          children: <AttendToGroup />
        },
        {
          label: '新建群聊',
          key: "2",
          children: <CreateGroup destoryModal={callback}/>
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