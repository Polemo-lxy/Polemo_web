import { Layout, List,Button } from 'antd'
import Avatar from '@/components/Avatar'
import classNames from 'classnames';
import styles from '../index.less'
import { useDispatch, useSelector } from 'umi';
import { useMutationObserver } from 'ahooks';
import React,{ useRef, useMemo, useCallback, ButtonHTMLAttributes, useEffect } from 'react';
import { FileUnknownOutlined, MessageFilled } from '@ant-design/icons'
import { getMemoryVolume } from '@/utils/getMemoryVolume';
import Mask from '@/components/Mask';
import { host } from '@/scripts/constants';
import dayjs from 'dayjs';
import { IconFont } from '@/components/IconFont';


const { Content } = Layout;
export default ({chat,setReplyItem,socket}: any) => {
  //@ts-ignore
  const {currentUser: {user}} = useSelector(({currentUser}) => ({currentUser}))
  const currentUser = user || {};
  const ref = useRef(null)
  useEffect(() => {
    if(sessionStorage.getItem('chatLogId')){
      const element = document.getElementById(sessionStorage.getItem('chatLogId'))
      element?.scrollIntoView()
      // sessionStorage.removeItem('chatLogId')
      return ;
    }
  })
  useMutationObserver(() => {
    if(sessionStorage.getItem('chatLogId')){
      const element = document.getElementById(sessionStorage.getItem('chatLogId'))
      element?.scrollIntoView()
      sessionStorage.removeItem('chatLogId')
      return ;
    }else{
      // @ts-ignore
      ref.current.scrollTop =ref.current.children[0].scrollHeight
    }

      // const elements = ref.current.children[0].getElementsByClassName('ant-list-items')[0].lastChild

      // const id = elements.id
      // console.log('idssssss',elements,id);

      // document.getElementById(id)?.scrollIntoView(false)
  },ref,{subtree: true,childList: true})
  const dispatch = useDispatch()


  return <>
    <Content ref={ref} className={styles.content}>
      <List
        dataSource={chat.msgList}
        renderItem={(item: any,index) =>{
          if(item.replyInfo){

          }

          let title = item.content
          if(!item.content && !item.systemMessage){
            // debugger
            const suffix = item.imageMes.split('.')[1]
            if([".bpm",".gif",".ico",".jpeg",".jpg",".png",".svg",".tif",".tiff",".webp"]?.includes(`.${suffix}`)){
              title = <Mask
                node={
                  <img
                    style={{maxWidth: 400,maxHeight: 250,borderRadius: 10,cursor:'zoom-in',width: '100%',height:'100%'}}
                    src={host+item.imageMes}
                    draggable="false"
                  />
                }
                src={host+item.imageMes}
              />
            }else if([".avi",".mpeg",".ogv",".webm",".3gp",".3g2",".mp4"]?.includes(`.${suffix}`)) {
              title=<video style={{maxWidth: 400,maxHeight: 250,borderRadius: 10,cursor:'zoom-in',width: '100%',height:'100%'}} src={host+item.imageMes} controls/>;
            }else {
              const [,,size,...rest] = item.imageMes.split('_')
              const name = rest.join('_')
              const fileSizeObj = getMemoryVolume(size)
              title= <div className={styles.FileMediaBox} style={{display: 'flex'}}>
                <FileUnknownOutlined className={styles.icon}/>
                <div>
                  <div>{name}</div>
                  <div>{fileSizeObj.size} {fileSizeObj.vol}</div>
                </div>
              </div>
            }
          }
          const actionArr = [
            {
              key: 'reply',
              icon: <MessageFilled style={{fontSize: 12}}/>,
              onClick: (listItem: any) => {
                setReplyItem(listItem)
              }
            }
          ]


          if(item.sender.id === currentUser.id && dayjs().diff(dayjs(item.sendTime),'minute') < 3){
            actionArr.push(
              {
                key: 'withdraw',
                icon: <IconFont type="icon-withdraw"/>,
                onClick: () => {
                  const newLog = {
                    id: item.logId,
                    mes:`${item.sender.name}撤回了一条消息`,
                  }
                  socket?.send(JSON.stringify({
                    ...chat.chatInfo,
                    newLog,
                    mesCategory: 'changeLog',
                    msgInfo: {}
                  }))
                  dispatch({
                    type: 'currentChat/withdrawChatLog',
                    payload: newLog
                  })
                }
              })
          }
          const actions = actionArr.map((action,index) => {
            return <Button key={'actionButton'+index} onClick={() => action.onClick(item)} style={{width: 'max-content',height: 'max-content',padding: 3,border: 0,color: '#b7b7b7'}} icon={action.icon}/>
          })
          return <List.Item
          key={index}
          id={`type_${chat.chatInfo.type}_id_${chat.chatInfo.receiverId}_logId_${item.logId}`}
          >
            {(item.content || item.imageMes) && <List.Item.Meta
              avatar={<Avatar headpath={item.sender.headpath} name={item.sender.name} />}
              title={<div className={styles.listContent}>
                <span className={styles.listContentTime}>{dayjs(item.sendTime).format('YYYY年MM月DD日 hh:mm')}</span>
                <div className={styles.listContentBody}>
                  <div className={styles.listContentTitle}>
                    {item.replyInfo && <div
                      style={{fontSize: 12,color: '#bfbfbf',whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}
                      onClick ={() => {
                        if(item.replyInfo){
                          const id = `type_${item.receiver.type}_id_${item.receiver.id}_logId_${item.replyInfo.id}`
                          let anchorElement = document.getElementById(id);
                          if (anchorElement) {
                            anchorElement.scrollIntoView()
                          }
                        }
                      }}
                    >
                        | {item.replyInfo.replyTo.name} : {item.replyInfo.content}
                      </div>
                    }
                    {title}
                  </div>
                  <div className={styles.listContentActions}>
                    {actions}
                  </div>
                </div>
              </div>}
              className={classNames(styles.listMeta,{
                [styles.currentUser]: item.sender.id === currentUser.id
              })}

            />}
            {
              item?.systemMessage && <List.Item.Meta
                description={item.systemMessage}
                style={{textAlign:'center'}}
              />
            }
          </List.Item>
        }}
        bordered={false}
        split={false}
      />
    </Content>
  </>
}