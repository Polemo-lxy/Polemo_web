import { useEffect, useRef, useState } from 'react';
import styles from './index.less'
import { Modal, Input, List, message,Button } from 'antd'
import { useRequest } from 'ahooks';
import { addAccount, fetchRelatedAccounts } from '@/services/getUser';
import { AvatarWithWhiteEdge } from '../Avatar';

const { Search } = Input;

interface accountType {
  headPath?: string,
  id?: string | number;
  name?: string
}
export default ({addAccountShow,setAddAccount, callback}: any) => {
  const ref = useRef<any>(null)
  const [list,setList] = useState<accountType[]>([])
  const {data,run} = useRequest((params) => fetchRelatedAccounts(params),{
    manual: true,
    onSuccess: ({data}) => {
      setList(data)
    }
  })
  useEffect(() => {
    ref?.current && ref.current.focus()
  },[])
  return <>
    <Modal 
      destroyOnClose 
      title={null} 
      footer={null} 
      onCancel={() => setAddAccount(false)} 
      maskClosable 
      open={addAccountShow} 
      closable={false}
      bodyStyle={{minHeight: 250}}
    >
      <Search 
        placeholder='请输入昵称/账户id/手机号/邮箱' 
        autoFocus 
        ref={ref} 
        onSearch={(e) => {
          if(e){
            run(e)
          }else{
            message.warning('搜索值不能为空')
          }
        }} 
        autoComplete="off"
      />
      <List 
        dataSource={list}
        renderItem={(item) => {
          return <List.Item>
            <List.Item.Meta
              avatar={<AvatarWithWhiteEdge headpath={item.headPath} name={item.name}/>}
              title={item.name}
              description={null}
              style={{alignItems: 'center'}}
            />
            <Button 
              type='link' 
              onClick={async () =>{
                await addAccount({type: 1,receiverId: item.id});
                setAddAccount(false)
                callback?.()
              }}
            >
              添加
            </Button>
          </List.Item>
        }}
      />
    </Modal>
  </>
}