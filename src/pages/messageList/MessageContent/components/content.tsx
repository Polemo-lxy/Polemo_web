import { Layout, List } from 'antd'
import Avatar from '@/components/Avatar'
import classNames from 'classnames';
import styles from '../index.less'
import { useSelector } from 'umi';
import { useMutationObserver } from 'ahooks';
import React,{ useRef } from 'react';
import { FileUnknownOutlined } from '@ant-design/icons'
import { getMemoryVolume } from '@/utils/getMemoryVolume';
import Mask from '@/components/Mask';
import { host } from '@/scripts/constants';

const { Content } = Layout;
export default ({chat}: any) => {
  // const { initialState } = useModel("@@initialState")
  //@ts-ignore
  const {currentUser: {user}} = useSelector(({currentUser}) => ({currentUser}))
  const currentUser = user || {};
  const ref = useRef(null)
  useMutationObserver(() => {
    // @ts-ignore
      ref.current.scrollTop =ref.current.children[0].scrollHeight
  },ref,{subtree: true,childList: true})

  return <>
    <Content ref={ref} className={styles.content}>
      <List
        dataSource={chat.msgList}
        renderItem={(item: any,index) =>{
          let title = item.content
          if(!item.content && !item.systemMessage){
            // debugger
            const suffix = item.imageMes.split('.')[1]
            if([".bpm",".gif",".ico",".jpeg",".jpg",".png",".svg",".tif",".tiff",".webp"]?.includes(`.${suffix}`)){
              title = <Mask
                node={
                  <img
                    style={{maxWidth: 400,height: 250,borderRadius: 10,cursor:'zoom-in'}}
                    src={host+item.imageMes}
                    draggable="false"
                  />
                }
                src={host+item.imageMes}
              />
            }else if([".avi",".mpeg",".ogv",".webm",".3gp",".3g2",".mp4"]?.includes(`.${suffix}`)) {
              title=<video style={{height: 300}} src={host+item.imageMes} controls/>;
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
          return <List.Item key={index}>
            {(item.content || item.imageMes) && <List.Item.Meta
              avatar={<Avatar headpath={item.sender.headpath} name={item.sender.name} />}
              title={title}
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