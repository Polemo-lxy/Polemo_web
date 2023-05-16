import { PageHeader, Button } from 'antd'
import Avatar from '@/components/Avatar'
import { IconFont } from '@/components/IconFont'
import styles from '../index.less'
import { stringify, stringifyUrl } from 'query-string'
import { useSelector } from 'umi'

export default ({chat}: any) => {
  console.log('chatt',chat);
  const {currentUser:{user}} = useSelector(({currentUser}: any) =>({currentUser}))
  return <>
    <PageHeader
      avatar={{
        children: <Avatar headpath={chat.chatInfo?.headpath} name={chat.chatInfo.name}/>,
        icon: null,
        className: styles.TalkContentAvatar
      }}
      title={chat.chatInfo.name}
      style={{width: '100%',height:60,borderBottom: '1px solid #f0f0f0'}}
      // extra={[
      //   <Button
      //     onClick={() => {
      //       const url = stringifyUrl({
      //         url: '/rtcroom',
      //         query: {
      //           receiver: stringify(chat.chatInfo),
      //           user: stringify(user)
      //         }
      //       })
      //       console.log(url);

      //       window.open(url,'__blank')
      //     }}
      //     key='video'
      //     style={{border: 'none'}}
      //     icon={<IconFont type='icon-video'/>}
      //   />,
      //   <Button key='addPeople' style={{border: 'none'}} icon={<IconFont type='icon-AddPeople'/>}/>,
      //   <Button key='yes' style={{border: 'none'}} icon={<IconFont type='icon-yes'/>}/>
      // ]}
    />
  </>
}