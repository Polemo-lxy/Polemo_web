import { fetchConcatGroup, fetchConcatPerson } from '@/services/concat'
import { Button, List, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useRequest } from 'umi'
import Avatar from '@/components/Avatar'
import styles from './index.less'
import AddAccount from '@/components/AddAccount'
import { DeleteOutlined, ExportOutlined } from '@ant-design/icons'
import { deleteAccount } from '@/services/getUser'

const { Item } = List;
export default ({ tab }: any) => {
  const { run: getContactPerson, data: PersonList } = useRequest(fetchConcatPerson,{
    manual: true
  })
  const { run: getContactGroup,data: groupList } = useRequest(fetchConcatGroup,{
    manual: true
  })
  useEffect(() => {
    if(tab === 'person'){
      getContactPerson()
    }else {
      getContactGroup()
    }
  },[tab])
  const[addAccountShow,setAddAccount] = useState(false)
  return <>
    <header className={styles.header}>
      {
        tab === 'person'
        ?<>
          联系人
          <Button onClick={() => setAddAccount(true)}>添加联系人</Button>
        </>
        :'我的群组'
      }
    </header>
    <List 
      itemLayout='horizontal'
      dataSource={tab === 'person'?PersonList:groupList}
      renderItem={(item,index) => {
        return <Item>
          <Link to={'/messageList'} className={styles.listItem}>
            <Item.Meta
              avatar={<Avatar headpath={item?.headpath} name={item?.name}/>}
              title={item.name}
              description={''}
            />
          </Link>
          <Button 
            type="link" 
            danger 
            icon={tab === 'person'?<DeleteOutlined />: <ExportOutlined />} 
            style={{paddingRight: 10}}
            onClick={() => {
              const isPerson = tab === 'person'
              const personConfig = {
                content: '确定要删除该好友吗？',
                okText: '删除',
                onOk: async () => {
                  await deleteAccount({type: 1,receiverId: item?.id})
                  getContactPerson()
                }
              }
              const groupConfig = {
                content: '确定退出该群组吗？',
                okText: '退出',
                onOk: async () => {
                  await deleteAccount({type: 0,receiverId: item?.id})
                  getContactGroup()
                }
              }
              Modal.warning(isPerson?personConfig:groupConfig)
            }}
          />
        </Item>
      }}
    />
    { addAccountShow && <AddAccount callback={() => getContactPerson()} addAccountShow={addAccountShow} setAddAccount={setAddAccount} />}
  </>
}