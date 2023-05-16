import { fetchChatContent } from '@/services/concat/index'
import {isEqual} from 'lodash'

const CurrentChatModel = {
  namespace: 'currentChat',
  state: {
    chat: {}
  },
  effects: {
    //@ts-ignore
    *fetchCurrentChat({ payload }, { call, put }) {
      console.log('dddddddddddddddd',payload);
      const {socket,...rest} = payload
      console.log('dddddddddddddddd',payload);

      const { data } = yield call(fetchChatContent, rest)
      yield put({
        type: 'saveCurrentChat',
        payload: {
          chatInfo: rest,
          msgList: data
        }
      })
    },
    // @ts-ignore
    *setCurrentChat({ payload },{ put,select }) {
      const chat: {chatInfo?: any,msgList?: any} = yield select(({currentChat}: any) => currentChat.chat)
      const user: {id: number} = yield select(({currentUser}: any) => currentUser.user)
      console.log('type,id',payload);
      const {type,id} = payload.msgList?.[0].receiver
      const itemSenderId = payload.msgList?.[0].sender.id

      // 防止在收到第三方消息时，当前群组对话框内容混乱，只适用于群组
      if(type === 2 && id === chat.chatInfo.receiverId) {
        yield put({
          type: 'saveCurrentChat',
          payload
        })
      }
      // 防止双人对话框内容混乱
      if(type ===1 && [user.id,chat.chatInfo.receiverId].every(item => [id,itemSenderId].includes(item))) {
        yield put({
          type: 'saveCurrentChat',
          payload
        })
      }
    },
    //@ts-ignore
    *withdrawChatLog({payload},{ put,select }) {
      const chat: {chatInfo?: any,msgList?: any} = yield select(({currentChat}: any) => currentChat.chat)
      const msgList = chat.msgList.map((item: any) => {
        if(item.logId === payload.id){
          item = {
            ...item,
            content: null,
            imageMes: null,
            systemMessage: payload.mes
          }
        }
        return item
      })
      yield put({
        type: 'saveCurrentChat',
        payload: {
          ...chat,
          msgList
        }
      })
    }
  },
  reducers: {
    //@ts-ignore
    saveCurrentChat(state, action) {
      // console.log('type,id',state?.chat,action.payload);

      return { ...state, chat: {...state?.chat,...action.payload} }
    }
  }
}
export default CurrentChatModel
