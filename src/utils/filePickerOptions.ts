
export default async ({config}: any): Promise<any[]> => {
  const {multiple,accept} = config;

  return new Promise(async (resolve) => {
    let files: any = [];
    if(window.showOpenFilePicker){
      const arr =await window.showOpenFilePicker({
        types: [
          {
            description: "Images",
            accept
          },
        ],
        excludeAcceptAllOption: true,
        multiple
      })

      for(let item of arr) {
        const file = await item.getFile()
        files.push(file)
      }
      resolve(files)
    }else {
      const inputElement = document.createElement('input')
      inputElement.type='file';
      inputElement.style.display = 'none'
      document.body.appendChild(inputElement)
      inputElement.accept = Object.keys(accept).join(',')
      inputElement.multiple = multiple
      inputElement.click()
      function changeFile () {
        if(inputElement.files){
          files = Array.from(inputElement.files)
          resolve(files)
        }

        inputElement.remove()
      }
      inputElement.addEventListener('change',changeFile,{once: true})


    }
  })
}