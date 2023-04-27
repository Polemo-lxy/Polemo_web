import { Form, Input, Upload, Select, Button } from 'antd';
import { PlusOutlined, SwapOutlined } from '@ant-design/icons'
import { getBase64 } from '@/utils/transforeFileIntoBase64';
import type { RcFile } from 'antd/es/upload/interface';
import { createRef, useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { createGroup, fetchConcatPerson } from '@/services/concat';

const { Item } = Form
export default ({destoryModal}: any) => {
  const [headPath,setHeadPath] = useState()
  const onChange = ({file,fileList}: any) => {
    getBase64(file.originFileObj as RcFile, url => {
      file.url = url
      file.status = 'done'
      setHeadPath(fileList?.[0])
    });
  }
  const { data: PersonList } = useRequest(fetchConcatPerson,{
    formatResult: ({data}) => {
      return data.map((item: any) => {
        return {
          label: item.name,
          value: item.id,
          ...item
        }
      })
    }
  })
  const [form] = Form.useForm()
  return <>
    <Form 
      form={form}
      onFinish={async () => {
        const {name,headpath: headpathFile,members} = form.getFieldsValue()
        const headpath = headpathFile?.file?.url;
        await createGroup({name,headpath,members})
        destoryModal()
      }}
    >
      <Item name="name" label="名称" rules={[{required: true,message:'群聊名称不能为空'}]}>
        <Input />
      </Item>
      <Item name="headpath" label="群聊头像">
        <Upload
          listType="picture-card"
          accept="image/jpg,image/png"
          maxCount={1}
          onChange={onChange}
          onRemove={() => true}
        >
          {
          headPath !== undefined
          ?<>
            <SwapOutlined />
            <div>Change</div>
          </>
          :<>
            <PlusOutlined />
            <div>Upload</div>
          </>
        }
        </Upload>
      </Item>
      <Item name="members" label="成员">
        <Select options={PersonList} allowClear mode="multiple"/>
      </Item>
      <Button type="primary" htmlType='submit' style={{display: 'block',margin: '0 auto'}} >立即创建</Button>
    </Form>
  </>
}