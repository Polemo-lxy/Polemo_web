import { Avatar } from 'antd'
import styles from './index.less'

export const AvatarWithWhiteEdge = ({headpath,name,...props}: any) => {

  return <div className={styles.EdgeAvatar}>
    <Avatar
      children={headpath?
        <img 
          style={{width:'100%',objectFit:'cover'}} 
          src={`http://localhost:3005${headpath}`}
        />
        :name?.slice(-2)
      }
      {...props}
    />
  </div>
}

export default ({headpath,name,...props}: any) => {
  return <Avatar 
    children={headpath?
      <img 
        style={{width:'100%',objectFit:'cover'}} 
        src={`http://localhost:3005${headpath}`}
      />
      :name?.slice(-2)
    }
    className={styles.avatar}
    {...props}
  />
}