import { Button, Input,Modal,List,Empty,Tooltip,Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less'
import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import footer from '@/pages/messageList/MessageContent/components/footer';
import Avatar from '@/components/Avatar';
import {debounce} from 'lodash'
import { fetchSearch } from '@/services/search';
import { useDispatch, useRequest } from 'umi';
import dayjs from 'dayjs';
const { Search } = Input;

const SearchTitle = ({fetchData}: any) => {
  const ref = useRef<any>(null)
  useEffect(() =>{
    ref.current && ref.current.focus()
  },[ref])

  // 防抖
  const onChange = debounce(() => {
    fetchData(ref.current.input.value)
  },1000,{leading: true})

  return <div>
    <Input ref={ref} onChange={onChange} autoFocus style={{border: '0px'}} placeholder='查找会话、消息'/>
  </div>
}
export default () => {
  const [modalVisible,setModalVisible] = useState(false)
  const defaultList = {
    concats: [],
    chatRecords: [],
    groupRecords:[]
  }
  const [listDatas,setListDatas] = useState<any>(defaultList)
  const {run} = useRequest((params) => fetchSearch(params),{
    manual: true,
    onSuccess: (res) => {
      setListDatas(res)
    }
  })
  const dispatch = useDispatch()
  const listItem = (item: any,isPerson: boolean) => {
    const {info,receiver,sender} = item;
    return <List.Item
      key={item.id}
      className={styles.recordsItem}
      onClick={() => {
        setModalVisible(false)
        setListDatas(defaultList)
        dispatch({
          type: 'currentChat/fetchCurrentChat',
          payload: {
            type: isPerson?1:2,
            receiverId: receiver.id,
            name: receiver.name,
            path: receiver.headpath
          }
        })
        sessionStorage.setItem('chatLogId',`type_${isPerson?1:2}_id_${receiver.id}_logId_${info.id}`)
      }}
    >
      <Avatar headpath={receiver.headpath} name={receiver.name}/>
      <span style={{marginLeft: 10}}>{receiver.name}</span>
      <span style={{fontSize: 12}}>{sender.name}</span>
      <Tooltip title={info.content} placement='topLeft'>
        <span className={styles.infoContent}>{info.content}</span>
      </Tooltip>
      <span className={styles.infoTime}>{dayjs(info.sendTime).format('YYYY/MM/DD')}</span>
    </List.Item>
  }

  return <div className={styles.searchEntry} onClick={(e) => {setModalVisible(true)}}>
      <SearchOutlined/>
      <span>搜索</span>
      {
        modalVisible && <div onClick={(e) => {
          e.stopPropagation()
          return false;
        }}>
        <Modal
          title={<SearchTitle fetchData={run}/>}
          maskClosable
          footer={null}
          className={styles.searchOfModal}
          onCancel={() => {setModalVisible(false);setListDatas(defaultList)}}
          open={modalVisible}
          closable={false}
        >
          {
            listDatas?.concats.length !== 0 && <List
              header="联系人/群组"
              dataSource={listDatas?.concats}
              renderItem={(item: any) => {
                const isPerson = item.type ===1
                return <List.Item key={item.id}
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                    setModalVisible(false);
                    setListDatas(defaultList)
                    dispatch({
                      type: 'currentChat/fetchCurrentChat',
                      payload: {
                        type: isPerson?1:2,
                        receiverId: item.id,
                        name: item.name,
                        path: item.headpath
                      }
                    })
                  }}
                >
                  <List.Item.Meta avatar={<Avatar headpath={item.headpath} name={item.name}/>} title={item.name} style={{alignItems: 'center'}}/>
                  <Tag color={isPerson?'purple':'gold'}>{isPerson?'联系人':'群组'}</Tag>
                </List.Item>
              }}
              className={styles.list}
            />
          }
          {
            listDatas?.chatRecords.length !== 0 && <List
              header="聊天记录"
              dataSource={listDatas?.chatRecords}
              renderItem={(e) => listItem(e,true)}
              className={styles.list}
            />
          }
          {
            listDatas?.groupRecords.length !== 0 && <List
              header="群聊记录"
              dataSource={listDatas?.groupRecords}
              renderItem={(e) => listItem(e,false)}
              className={styles.list}
            />
          }
          {listDatas?.concats?.length + listDatas?.chatRecords?.length + listDatas?.groupRecords?.length === 0 && <Empty description="暂无数据"></Empty>}
        </Modal>
      </div>
      }
    </div>
}