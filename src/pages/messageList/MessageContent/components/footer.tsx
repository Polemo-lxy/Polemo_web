import { Layout, Input, Button,Popover,Dropdown,Modal } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../index.less'
import { PictureOutlined, SmileOutlined, PlusCircleOutlined,FolderAddOutlined,IdcardOutlined, FileUnknownOutlined,CloseOutlined } from '@ant-design/icons'
import { IconFont } from '@/components/IconFont';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data'
import { getBase64 } from '@/utils/transforeFileIntoBase64';
import type { RcFile } from 'antd/es/upload/interface';
import { getMemoryVolume } from '@/utils/getMemoryVolume';
import filePickerOptions from '@/utils/filePickerOptions';

const { Footer } = Layout;
const { TextArea } = Input;
export default ({chat,socket,replyItem,setReplyItem}: any) => {
  const [sendMes, setSendMes] = useState<string>('')
  const onKeyDown = async (e: any) => {
    if(e.shiftKey && e.keyCode === 13) {
      return;
    }
    if(e.keyCode === 13){
      e.preventDefault()
      if(sendMes) {
        socket?.send(JSON.stringify({
          ...chat.chatInfo,
          msgInfo: {
            content: sendMes,
            sendTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss.ms'),
            replyId: replyItem.logId
          },
        }))
        setSendMes('')
        setReplyItem({})
        //@ts-ignore
        document.getElementById('polemo-footer-textarea').style.paddingTop = '4px'
      }
    }
  }
  const [emojiModalVisibal,setEmojiModalVisibal] = useState(false)
  const moreOperations = [
    {
      key: 'pic',
      label: '图片/视频',
      icon: <PictureOutlined />,
      onClick: async () => {
        const files = await filePickerOptions({
          config: {
            multiple: false,
            accept: {
              "image/*": [".png", ".gif", ".jpeg", ".jpg"],
              "video/*": [".avi",".mpeg",".mpg",".rm",".ram",".mp4"]
            }
          }
        })
        console.log('aaaaa',files);
        const file = files[0]
        const isImage = file.type.search(/^image/) !== -1

        Modal.confirm({
          icon: null,
          title: '确定发送以下图片/视频吗？',
          content: <div className={styles.mediaBox}>
            {
              isImage
                ?<img style={{width: 300}} src={URL.createObjectURL(file)}/>
                :<video style={{width: 300}} src={URL.createObjectURL(file)} controls/>
            }
          </div>,
          okText: '发送',
          cancelText: '取消',
          maskClosable: true,
          onOk: () => {
            getBase64(file as RcFile, url => {
              const fileSplitArr = file.name.split('.')
              const suffix = '.' + fileSplitArr[fileSplitArr.length - 1]
              socket?.send(JSON.stringify({
                ...chat.chatInfo,
                msgInfo: {
                  imageMes: {suffix,name: file.name,size: file.size, content: encodeURIComponent(url)},
                  sendTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss.ms')
                },
              }))
            });
          }
        })
      }
    },
    {
      key: 'file',
      label: '本地文件',
      icon: <FolderAddOutlined />,
      onClick: async () => {
        //@ts-ignore
        const arr = await window.showOpenFilePicker({
          types: [
            {
              description: "Files",
              accept: {
                "application/*": [".abw",".arc",".azw",".bin",".bz",".bz2",".csh",".doc",".docx",".eot",".epub",".jar",".json",".jsonld",".mpkg",".odp",".ods",".odt",".ogx",".pdf",".ppt",".pptx",".rar",".rtf",".sh",".swf",".tar",".vsd",".xhtml",".xls",".xlsx",".xml",".xul",".zip",".7z"],
                "audio/*": [".aac",".mid",".midi",".mp3",".oga",".wav",".weba"],
                "video/*": [".avi",".mpeg",".ogv",".webm",".3gp",".3g2"],
                "image/*": [".bpm",".gif",".ico",".jpeg",".jpg",".png",".svg",".tif",".tiff",".webp"],
                "text/*": [".css",".csv",".html",".htm",".ics",".js",".mjs",".txt"],
                "font/*": [".otf",".ttf",".woff",".woff2"]
              }
            }
          ],
          excludeAcceptAllOption: true,
          multiple: false
        })
        const file = await arr[0].getFile();
        const fileSizeObj =  getMemoryVolume(file.size)
        Modal.confirm({
          title: '发送文件',
          icon: null,
          okText: '发送',
          cancelText: '取消',
          maskClosable: true,
          content: <div className={styles.FileMediaBox} style={{display: 'flex'}}>
            <FileUnknownOutlined className={styles.icon}/>
            <div>
              <div>{file.name}</div>
              <div>{fileSizeObj.size} {fileSizeObj.vol}</div>
            </div>
          </div>,
          onOk: () => {
            getBase64(file as RcFile, url => {
              const fileSplitArr = file.name.split('.')
              const suffix = '.' + fileSplitArr[fileSplitArr.length - 1]
              socket?.send(JSON.stringify({
                ...chat.chatInfo,
                msgInfo: {
                  imageMes: {suffix,name: file.name,size: file.size,content: encodeURIComponent(url)},
                  sendTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss.ms')
                },
              }))
            });
          }
        })
        console.log('file',file);

      }
    },
    {
      key: 'personCard',
      label: '个人名片',
      icon: <IdcardOutlined />
    }
  ]
  const actions = <div className={styles.footerActions}>
    <Popover
      open={emojiModalVisibal}
      destroyTooltipOnHide={false}
      trigger="click"
      title={null}
      content={
        <Picker
          data={data}
          onEmojiSelect={(e: any) => {
            setSendMes((str) => str+e.native);
          }}
        />
      }
    >
      <SmileOutlined
        onClick={() => setEmojiModalVisibal((visible) => !visible)}
        // 做了延迟处理，保证表情选择事件能被执行
        onBlur={() => {setTimeout(() => {setEmojiModalVisibal(false)},300)}}
      />
    </Popover>
    {/* <IconFont
      type='icon-aite'
    /> */}
    <Dropdown menu={{items: moreOperations}} trigger={['click']}>
      <PlusCircleOutlined />
    </Dropdown>

    {/* <Button type='link' icon={<PictureOutlined />}></Button> */}
  </div>
  const replyElement = useMemo(() => {
    console.log('ref',replyItem);

    if(!Object.keys(replyItem)?.length || !document.getElementById('polemo-footer-textarea')){
      return null
    }
    //@ts-ignore
    document.getElementById('polemo-footer-textarea').style.paddingTop = '30px'
    return <div className={styles.reply} >
      <span
        onClick={() => {
          //@ts-ignore
          document.getElementById('polemo-footer-textarea').style.paddingTop = '4px'
          setReplyItem({})
        }}
        className={styles.closeReply}
      >
        <CloseOutlined />
      </span>
      <span style={{whiteSpace: 'nowrap',flex:1,textOverflow: 'ellipsis',overflow: 'hidden'}}> | 回复 {replyItem?.sender?.name} : {replyItem?.content}</span>
    </div>
  },[replyItem])
  return <>
    <Footer
      className={styles.footer}
    >
        {replyElement}
        <TextArea
          value={sendMes}
          placeholder={`发送给 ${chat.chatInfo.name}`}
          autoSize={{minRows: 1,maxRows: 5}}
          size="middle"
          onKeyDown={onKeyDown}
          onChange={(e) => {
            setSendMes(e.target.value)
          }}
          id="polemo-footer-textarea"
        />
        {
          actions
        }
    </Footer>
  </>
}