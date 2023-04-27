import { Dropdown } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import styles from './index.less'
import { IconFont } from '@/components/IconFont'
import AddAccount from '@/components/AddAccount'
import { useState } from 'react'
import GroupOperateModal from '@/components/GroupOperateModal'

export default () => {
  const [addAccountShow,setAddAccount] = useState(false)
  // const [groupOperateModal,setGroupOperateModal] = useState(false)
  // const callback = (value: boolean) => {
  //   setGroupOperateModal(value)
  // } 
  const items: MenuProps['items'] = [
    {
      key: 0,
      label: '群组操作',
      icon: <IconFont type="icon-group"/>,
      // onClick: () => setGroupOperateModal(true)
      onClick: () => GroupOperateModal()
    },
    {
      key: 1,
      label: '添加联系人',
      icon: <IconFont type="icon-add-user"/>,
      onClick: () => setAddAccount(true)
    },
    {
      key: 2,
      label: '创建文档',
      icon: <IconFont type="icon-adddoc"/>
    },
    {
      key: 3,
      label: '加入会议',
      icon: <IconFont type="icon-attendence"/>
    }
  ]
  return <>
    <Dropdown 
        className={styles.dropdownBody} 
        overlayClassName={styles.dropdownList} 
        menu={{items}}
      >
      <PlusOutlined/>
    </Dropdown>
    { addAccountShow && <AddAccount addAccountShow={addAccountShow} setAddAccount={setAddAccount} />}
    {/* { groupOperateModal && <GroupOperateModal groupOperateModal={groupOperateModal} callback={callback}/>} */}
  </>
}