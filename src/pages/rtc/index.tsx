import { parse } from "query-string";
import { useDispatch, useSelector ,connect} from "umi";
import { List } from 'antd'
import { AvatarWithWhiteEdge } from "@/components/Avatar";
import { host } from "@/scripts/constants";


export default () => {
  const {receiver: receiverStr,user: userStr}: any = parse(window.location.search)
  const receiver = parse(receiverStr)
  const user = parse(userStr)
  let memberArray = [user,user];
  console.log(receiver,user);

  return <div style={{width: '100vw',height: '100vh',background: '#21d0e3'}}>
    <div style={{display: 'flex',alignItems: 'center',justifyContent: 'space-around',flexWrap: 'wrap',width: 'inherit',height: 'inherit'}}>
      {
        memberArray.map( item => {
          return <>
          {
            item?.headpath
            ? <div style={{width: 100,aspectRatio: '1',display:'flex',padding: 5,background: '#edff00',overflow: 'hidden'}}>
                <img src={host+item.headpath} style={{width: '100%',height: '100%',objectFit: 'cover'}}/>
              </div>
            : <div style={{width: 100,aspectRatio: '1',display:'flex',padding: 5,background: '#edff00',overflow: 'hidden',fontSize: 25,fontWeight: 600,alignItems: 'center',justifyContent: 'center',color: 'white'}}>
                {item.name.slice(-2)}
              </div>
          }
          {/* <div style={{aspectRatio: '1',width: 100,background: '#fff'}}>{item.name}</div> */}
          </>
        })
      }
    </div>
  </div>
}