// import Options from "./conponents/Options"
import Selector from "@/components/Selector/MessageSelector"
import styles from './index.less'
import { Empty,Menu } from 'antd'
import { IconFont } from "@/components/IconFont"
import classNames from "classnames"

interface TabPropsType {
  tab: string,
  setTab: any
}
export default ({ tab, setTab }: TabPropsType) => {
  const onTabChange = ({key}: {key: string}) => {
    setTab(key)
  }
  return <div className={styles.siderContent}>
    <div className={styles.selectBox}>
      <Selector />
    </div>
    <Menu defaultSelectedKeys={['person']} onClick={onTabChange}>
      <Menu.Item className={styles.menuItem} key='person' icon={<IconFont type='icon-person'/>}>联系人</Menu.Item>
      <Menu.Item className={styles.menuItem} key='group' icon={<IconFont type='icon-group'/>}>我的群组</Menu.Item>
    </Menu>
  </div>
}