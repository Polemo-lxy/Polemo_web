import { fetchCurrentUser } from "@/services/getUser"


const CurrentUserModel = {
  namespace: 'currentUser',
  state: {
    user: {}
  },
  effects: {
    *fetchCurrentUser({payload}: any,{call,put}: any){
      const {data} = yield call(fetchCurrentUser)
      yield put({
        type: 'saveCurrentUser',
        payload:data
      })
    },
    // *setCurrentUser({payload}: any,{put}: any){
    //   yield put({
    //     type:'saveCurrentUser',
    //     payload
    //   })
    // }
  },
  reducers: {
    // @ts-ignore
    saveCurrentUser(state,action){
      return {...state,user: action.payload}
    }
  }
}
export default CurrentUserModel