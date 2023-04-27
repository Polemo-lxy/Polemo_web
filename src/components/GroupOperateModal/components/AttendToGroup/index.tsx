import { AvatarWithWhiteEdge } from '@/components/Avatar';
import { addAccount, fetchRelatedGroups } from '@/services/getUser';
import { Input, message, List, Button } from 'antd'
import { useEffect, useRef, useState } from 'react';
import { useRequest } from 'umi';

const { Search } = Input;
export default () => {
  const ref = useRef(null)
  const [list,setList] = useState([])
  const {data,run} = useRequest((params) => fetchRelatedGroups(params),{
    manual: true,
    onSuccess: (data) => {
      setList(data)
    }
  })
  useEffect(() => {
    ref?.current && ref.current.focus()
  },[])
  return <>
        <Search 
        placeholder='请输入群聊名称/群聊id' 
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
              avatar={<AvatarWithWhiteEdge headpath={item.headPath} name={item.name} />}
              title={item.name}
              description={null}
              style={{alignItems: 'center'}}
            />
            <Button 
              type='link' 
              onClick={async () =>{
                await addAccount({type: 2,receiverId: item.id});
              }}
            >
              添加
            </Button>
          </List.Item>
        }}
      />
  </>
}