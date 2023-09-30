import React, {useEffect, useState} from 'react'
import toast from 'react-hot-toast'


export default function PDFViewer(props) {
    const [pdfUrl, setPdfUrl] = useState('')

    useEffect(()=> {
        fetch('http://localhost:3000/chats/getChatPdf', {
          method:'POST',
          headers:{'Content-Type': 'application/json'}, 
          body:JSON.stringify({chatId:props.chatId})
        }).then((response)=> response.json())
        .then((data)=> {
          if(data.result) {
            
            setPdfUrl(data.pdfUrl)
        
          } else {
            console.log(data)
            toast.error('No chats founds')
            redirect('/')
          }
          
        })
        
      },[props.chatId])

      if(pdfUrl === undefined) {
        return <div>{toast.loading('récupération du pdf...')}</div>
      }
  return (
    <div className='w-full h-full'>
    <object width="100%" height="100%" data={pdfUrl} type="application/pdf">   </object>
    
    </div>
  )
}
