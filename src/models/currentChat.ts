import { fetchChatContent } from '@/services/concat/index'

const CurrentChatModel = {
  namespace: 'currentChat',
  state: {
    chat: {}
  },
  effects: {
    //@ts-ignore
    *fetchCurrentChat({ payload }, { call, put }) {
      const {socket,...rest} = payload
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
    *setCurrentChat({ payload },{ put }) {
      console.log('payload2',payload);
      
      yield put({
        type: 'saveCurrentChat',
        payload
      })
    }
  },
  reducers: {
    //@ts-ignore
    saveCurrentChat(state, action) {
      return { ...state, chat: {...state?.chat,...action.payload} }
    }
  }
}
export default CurrentChatModel
