import { Layout } from 'antd'
import { useState } from 'react';
import styles from './index.less'
import List from './List'
import MemberList from './MemberList';

const { Sider, Content } = Layout;
export default () => {
  const [ tab, setTab ] = useState('person')
  return <>
    <Layout className={styles.messageListBox}>
      <Sider theme='light' width={300} defaultCollapsed={false} collapsible={false} className={styles.sider}>
        <List tab={tab} setTab={setTab}/>
      </Sider>
      <Content>
        <MemberList tab={tab}/>
      </Content>
    </Layout>
  </>
}