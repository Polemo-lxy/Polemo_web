import { PageHeader, Button } from 'antd'
import Avatar from '@/components/Avatar'
import { IconFont } from '@/components/IconFont'
import styles from '../index.less'

export default ({chat}: any) => {
  return <>
    <PageHeader
      avatar={{
        children: <Avatar headpath={chat.chatInfo?.headpath} name={chat.chatInfo.name}/>,
        icon: null,
        className: styles.TalkContentAvatar
      }}
      title={chat.chatInfo.name}
      style={{width: '100%',height:60,borderBottom: '1px solid #f0f0f0'}}
      extra={[
        <Button key='video' style={{border: 'none'}} icon={<IconFont type='icon-video'/>}/>,
        <Button key='addPeople' style={{border: 'none'}} icon={<IconFont type='icon-AddPeople'/>}/>,
        <Button key='yes' style={{border: 'none'}} icon={<IconFont type='icon-yes'/>}/>
      ]}
    />
  </>
}