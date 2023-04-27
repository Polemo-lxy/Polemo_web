import { Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less'
const { Search } = Input;
export default () => {
  return <div className={styles.searchEntry}>
    <SearchOutlined/>
    <span>搜索</span>
  </div>
}