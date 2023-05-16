// import { fetchChatContent } from '@/services/concat/index'

const CurrentChatModel = {
  namespace: 'connectList',
  state: {
    list: []
  },
  effects: {
    //@ts-ignore
    // *fetchCurrentChat({ payload }, { call, put }) {
    //   const {socket,...rest} = payload
    //   const { data } = yield call(fetchChatContent, rest)
    //   yield put({
    //     type: 'saveCurrentChat',
    //     payload: {
    //       chatInfo: rest,
    //       msgList: data
    //     }
    //   })
    // },
    // @ts-ignore
    *setConnectList({ payload },{ put }) {
      yield put({
        type: 'saveConnectList',
        payload
      })
    }
  },
  reducers: {
    //@ts-ignore
    saveConnectList(state, action) {
      return { ...state, list: action.payload }
    }
  }
}
export default CurrentChatModel
