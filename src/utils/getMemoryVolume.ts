export const getMemoryVolume = (fileSize: number) => {
  fileSize = Number(fileSize)
  let size = fileSize;
  let Index=0;
  const vArr = ['KB','MB','GB','TB']
  for(let i=0;i<vArr.length;i++){
    size = Number((fileSize / Math.pow(1024,i)).toFixed(2))
    if(size < 1024){
      Index = i
      break;
    }
  }
  return {
    size,
    vol: vArr[Index]
  }
}