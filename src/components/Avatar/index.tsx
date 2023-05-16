import { Avatar } from 'antd'
import styles from './index.less'
import { host } from '@/scripts/constants'

export const AvatarWithWhiteEdge = ({headpath,name,...props}: any) => {
  return <div className={styles.EdgeAvatar}>
    <Avatar
      children={headpath?
        <img
          style={{width:'100%',objectFit:'cover'}}
          src={`${host}${headpath}`}
        />
        :name?.slice(-2)
      }
      style={{background: 'mediumpurple'}}
      {...props}
    />
  </div>
}

export default ({headpath,name,...props}: any) => {
  return <Avatar
    children={headpath?
      <img
        style={{width:'100%',objectFit:'cover'}}
        src={`${host}${headpath}`}
      />
      :name?.slice(-2)
    }
    style={{background: 'mediumpurple'}}
    className={styles.avatar}
    {...props}
  />
}