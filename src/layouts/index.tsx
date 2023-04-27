import { ProLayout } from "@ant-design/pro-layout"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { IconFont } from '@/components/IconFont'
import { history, useModel, useSelector,connect, useDispatch } from "umi"
import { routeMenu } from "../../config/routes"
import styles from './index.less'
import { AvatarWithWhiteEdge } from "@/components/Avatar"
import { LogoutOutlined,PlusOutlined } from "@ant-design/icons"
import { Button,Tooltip,Modal, Input,Upload, Image } from 'antd'
import Oauth from "@/scripts/oauth"
import { getBase64 } from "@/utils/transforeFileIntoBase64"
import type { RcFile } from 'antd/es/upload/interface';
import { changeSelfHeadPath } from "@/services/getUser"


export default ({ children }: { children: React.ReactNode }) => {
  console.log('layout')
  const onCurrentMenuChange = (targetMenu: route) => {
    history.push(targetMenu?.path || '/')
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'currentUser/fetchCurrentUser'
    })
  },[])
  //@ts-ignore
  const {currentUser:{user}} = useSelector(({currentUser}) =>({currentUser}))
  const currentUser = user || {};
  const [modal,setModal] = useState(false)
  const [headPath,setHeadPath] = useState<any>()
  const onChange = ({file,fileList}: any) => {
    getBase64(file.originFileObj as RcFile, url => {
      file.url = url
      file.status = 'done'
      setHeadPath(file)
    });
  }
  const changeHeadPathRequest = async ()  => {
    await changeSelfHeadPath(encodeURIComponent(headPath?.url))
    dispatch({
      type: 'currentUser/fetchCurrentUser'
    })
    setModal(false)
  }
  return <ProLayout
    style={{minHeight: '100%'}}
    // 侧边栏高度适应窗口高度
    fixSiderbar
    // 侧边栏宽度
    siderWidth={80}
    //侧边栏折叠
    collapsed={false}
    //侧边栏折叠按钮
    collapsedButtonRender={false}
    // navTheme="light"
    route={{
      routes: routeMenu
    }}
    menuItemRender={(item) => {
      return <div className={styles.routerIcon} onClick={() => onCurrentMenuChange(item)}>
        <IconFont type={item?.iconType}  style={{fontSize: 30,color: '#fff'}}/>
      </div>
    }}
    logo={<>
      <Button onClick={() => setModal(true)} type="link" style={{padding: 0,border: 0,height: 37}}>
        <AvatarWithWhiteEdge 
          headpath={currentUser.headpath}
          name={currentUser.name}
        />
      </Button>
    </>}
    title={false}
    headerRender={false}
    // 不适合在此处用，如果页面上内容很少，不足以撑开100vh，但是页面仍然可以出现滚动条
    // contentStyle={{
    //   minHeight: '100vh'
    // }}
    className={styles.layoutBox}
    contentStyle={{margin: 0}}
    menuFooterRender={(menuProps) => {
      return <>
        <Button 
          title='退出登录' 
          type='link'
          onClick={() => {
            Oauth.logout()
          }}
        >
          <LogoutOutlined className={styles.logout} />
        </Button>
      </>
    }
    }
  >
    {children}
    { modal && <Modal
      onOk={changeHeadPathRequest}
      okText='更换'
      open={modal}
      maskClosable
      onCancel={() => setModal(false)}
      destroyOnClose
    >
      <Upload
        listType="picture-card"
        accept="image/jpg,image/png"
        maxCount={1}
        onChange={onChange}
      >
        {
          <>
            <PlusOutlined />
            <div>Upload</div>
          </>
        }
      </Upload>
    </Modal>}
  </ProLayout>
}