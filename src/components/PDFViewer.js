import React, {useEffect, useState} from 'react'
import toast from 'react-hot-toast'


export default function PDFViewer(props) {
    const [pdfUrl, setPdfUrl] = useState('')
    
    useEffect(()=> {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}chats/getChatPdf/${props.token}`, {
          method:'GET',
        }).then((response)=> response.json())
        .then((data)=> {
          if(data.result) {
            
            setPdfUrl(data.pdfUrl)
        
          } else {
            
            toast.error('No chats founds')
            redirect('/')
          }
          
        })
        
      },[props.token])

      if(pdfUrl === undefined) {
        return <div>{toast.loading('récupération du pdf...')}</div>
      }
  return (
    <div className='w-full h-full'>
    <object width="100%" height="100%" data={pdfUrl} type="application/pdf">   </object>
    
    </div>
  )
}
