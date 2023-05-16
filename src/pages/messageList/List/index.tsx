import Options from "./conponents/Options"
import Selector from "@/components/Selector/MessageSelector"
import styles from './index.less'
import { Empty, List, Skeleton } from 'antd'
//@ts-ignore
import { useDispatch, useRequest, useSelector } from "umi"
import { fetchConcatList } from "@/services/concat"
import Avatar from "@/components/Avatar"
import { useEffect, useState, useMemo } from "react"
import classNames from "classnames"
import dayjs from "dayjs"
import { useLocation,useHistory } from "umi"
export default ({socket}: any) => {
  const {state} = useLocation()
  //@ts-ignore
  const { currentChat: {chat},connectList: {list} } = useSelector(({currentChat,connectList}) =>({currentChat,connectList}))
  const [showChangeActiveTab,setShowChangeActiveTab] = useState(true);
  const [activeChat,setActiveChat] = useState<{type: 1 | 2, receiverId: number,name: string}>({...chat.chatInfo});
  const dispatch = useDispatch()
  const onActiveChatChange = ({type,id,name,headpath}: any) => {
    setActiveChat({ type, receiverId: id, name })

    dispatch({
      type: 'currentChat/fetchCurrentChat',
      payload: {
        type,
        receiverId: id,
        name,
        headpath
      }
    })
  }
  useEffect(() => {
    setActiveChat(chat.chatInfo)
  },[chat.chatInfo])

  useEffect(() =>{
    // console.log('socket',state,showChangeActiveTab , list , chat.chatInfo);
    if(state?.event) {
      console.log(history)
      history.replaceState({},"",location.href)
    }
    if(list.length && !list.some((item: any) => item?.type === chat.chatInfo?.type && item?.id === chat.chatInfo?.receiverId)) {
      onActiveChatChange(list[0]);
    }

    // 在页面重新渲染时会自动设置对话窗口为第一项
    if(showChangeActiveTab && list?.length && !state?.event){
      onActiveChatChange(list[0]);
      setShowChangeActiveTab(false)
    }
  },[list])
  return <div className={styles.siderContent}>
    <div className={styles.selectBox}>
      <Selector />
      <Options />
    </div>
    {socket?.readyState === 1 ?<List
      className={styles.listBox}
      dataSource={list}
      locale = {{emptyText: <div className={styles.messageListEmpty}><Empty description='暂无消息' className={styles.emptyIcon}/></div>}}
      renderItem={(item: any,index) => {
        const {id,type,name,lasttime} = item
        const concatTimeTip = dayjs().isSame(lasttime,'day')
          ?dayjs(lasttime).format('HH:mm')
          :dayjs(lasttime).format(dayjs().isSame(lasttime,'year')?'MM/DD':'YYYY/MM/DD')
        console.log('timer',lasttime,dayjs(lasttime));

        return <List.Item
          className={classNames(styles.listItem,{
            [styles.activeChat]: id === activeChat?.receiverId && type === activeChat?.type
          })}
          key={`${type}-${id}-${name}`}
          onClick={() => onActiveChatChange(item)}
        >
          <List.Item.Meta
            avatar={<Avatar headpath={item?.headpath} name={item?.name}/>}
            title={name}
            description={concatTimeTip}
          />
        </List.Item>
      }}
      bordered={false}
      rowKey={(item) => `${item.id}-${item.name}`}
    />:<>
        {/* <div className={styles.skeletonBox}> */}
          <div className={styles.listBox} >
            {
              Array(3).fill(0).map((item,index) => {
                return <div className={styles.itemBox} key={'skeleton'+index}>
                  <Skeleton.Avatar active/>
                  <Skeleton active title={false} paragraph={{rows: 1,width: 70}} className={styles.itemName}/>
                  <Skeleton active title={false} paragraph={{rows: 1,width: 30}} className={styles.itemTime}/>
                </div>
              })
            }
          </div>
        {/* </div> */}
    </>}
  </div>
}