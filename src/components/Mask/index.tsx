import { useEffect, useMemo, useRef, useState } from "react";
import styles from './index.less'
import { createPortal } from "react-dom";
import { IconFont } from "../IconFont";

type picState = {
  scale: number,
  rotate: number
}
export default ({node,src}: any) => {
  const [maskElement,setMaskElement] = useState<any>(null)
  const [state,setState] = useState({scale: 1,rotate: 0})

  const amplify = () => {
    setState(({scale,rotate}: picState) => {
      if(!ref.current){
        return {rotate,scale}
      }
      if(scale + 0.2 < 5) {
        ref.current.style.scale = String((scale + 0.2));
        return {rotate,scale: scale + 0.2}
      }
      ref.current.style.scale = String(5)
      return {rotate,scale: 5}
    })
    showCover()
  }
  const reduce = () => {
    setState(({scale,rotate}: picState) => {
      if(!ref.current){
        return {scale,rotate}
      }
      if(scale - 0.2 > 0.1) {
        ref.current.style.scale = String(scale - 0.2)
        return {rotate,scale:scale - 0.2}
      }
      ref.current.style.scale = String(0.1)
      return{rotate,scale:0.1}
    })
    showCover()
  }
  const reset = () => {
    setState(({rotate,scale}: picState) => {
      if(ref.current){
        ref.current.style.scale = '1'
        ref.current.style.rotate = ""
        return {rotate: 0,scale: 1}
      }
      return {rotate,scale}
    })
    showCover()
  }
  const turn = () => {
    setState(({rotate,scale}: picState) => {
      if(!ref.current){
        return {rotate,scale}
      }
      ref.current.style.rotate = (rotate - 90)%360 + 'deg'
      return {scale,rotate:(rotate -90) %360}
    })
  }
  const showCover = () => {
    if(!coverRef.current || !ref.current){
      return;
    }
    const {scale} = ref.current.style
    coverRef.current.innerText = Math.floor(Number(scale) * 100) + '%'
    coverRef.current.style.display = 'block';
    setTimeout(() => {
      coverRef.current && (coverRef.current.style.display = 'none')
    },1000)
  }
  useEffect(() => {
    showCover()
  },[state.scale])
  const ref = useRef<HTMLImageElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const onClick = () => {
    const element = <div 
      onWheel={(e) => {
        setState(({scale,rotate}: picState) => {
          if(!ref.current){
            return {scale,rotate}
          }
          const {deltaY} = e.nativeEvent
          if(deltaY > 0){
            const returnValue = scale + 0.1<5?scale + 0.1:5
            ref.current.style.scale = String(returnValue)
            return {rotate,scale: returnValue}
          }else{
            const returnValue = scale - 0.1>0?scale - 0.1:0.1
            ref.current.style.scale = String(returnValue)
            return {rotate,scale: returnValue}
          }
        })
      }} 
      id="pre_view" 
      className={styles.maskPreView} 
      onClick={() => {reset();setMaskElement(null)}}
    >
      <div className={styles.headerBox}>
        <div className={styles.header}>×</div>
      </div>
      <img ref={ref} onClick={(e) => {e.stopPropagation()}} src={src} className={styles.img}/>
      <div className={styles.footerBox}>
        <div className={styles.footer}>
          <IconFont type="icon-ic_zoom_in" onClick={(e) => {e.stopPropagation();amplify()}}/>
          <IconFont type="icon-ic_zoom_out" onClick={(e) => {e.stopPropagation();reduce()}}/>
          <IconFont type="icon-a-nishizhenxuanzhuan90" onClick={(e) => {e.stopPropagation();turn()}}/>
          <IconFont type="icon-huanyuan-shuaxin" onClick={(e) => {e.stopPropagation();reset()}}/>
        </div>
      </div>
      <div className={styles.scaleText} ref={coverRef}></div>
     </div>
     setMaskElement(element)
  }
  return <>
    <div style={{}} onClick={onClick}>{node}</div>
    {createPortal(maskElement,document.body)}
  </>
}