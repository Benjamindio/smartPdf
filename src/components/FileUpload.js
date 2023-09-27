'use client'
import { Inbox } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function FileUpload(props) {
    const router = useRouter()
    const formData = new FormData()
    const [vectorize, setVectorize] = useState(false)
    const [pdfUrl, setPdfUrl] = useState(null)
    const userId = useSelector((state) => state.users.value.userId)
    

    const upload = async () => {
        await fetch('http://localhost:3000/upload', {
            method:'POST', 
            body:formData,
        }).then((response) => response.json())
        .then((data) => {
            if(!data.url || !data.name) {
                toast.error('Une erreur est survenue')
                return; 
            } else {
                console.log(data)
                setPdfUrl(data)
                setVectorize(!vectorize)
            console.log('upload sucessfully')
            }
            
        }).then(()=> {
            console.log('saving to pinecone')
         toast.promise(fetch('http://localhost:3000/chats/create-chat', {
            method:'POST',
            headers:{'Content-Type': 'application/json'}, 
            body:JSON.stringify({name:pdfUrl.name, url:pdfUrl.url, userId})
        })
        .then((response) => response.json())
        .then((data)=> {
            console.log(data)
            if(!data.error) {
                router.push(`/chat/${data.chat_id}`)
            } else {
                console.log(data.error)
            }
            
        }), {
            loading: 'On donne à manger au robot, encore quelques instants...',
            success: 'Go to go ! ',
            error: 'Une erreur est survenue',
        })
        console.log(pdfUrl)

        })
        
    }
    
    const {getRootProps, getInputProps} = useDropzone({
        accept:{"application/pdf" :[".pdf"]},
        maxFiles:1,
        onDrop: async (acceptedFiles) => {
            console.log(acceptedFiles)
            const file = acceptedFiles[0]
            if(file.size > 10 * 1024 * 1024) {
                //not more than 10mb
                toast.error("Votre fichier est trop volumineux")
                return
            }
            try {
                formData.append('pdfFromFront', file)
            
                console.log("uploading...")
                toast.promise(upload(),{
                    loading: 'Upload en cours...',
                    success: 'Upload réussi !',
                    error: 'Une erreur est survenue',
                })
            }catch {
                console.log(error)
            }
            
        }
    })
 
  return (
    <div className='p-2 w-52  bg-[#5271FF] hover:bg-gradient-to-bl from-pink-300 via-purple-300 to-indigo-400  text-white rounded-xl shadow-sm'>
        <div {...getRootProps({
            className:' h-20  border-dashed border-2 rounded-xl cursor-pointer  py-8 flex justify-center items-center flex-col'
        })}>
          <input {...getInputProps()} /> 
          
          <div className='flex flex-col items-center'>
            <Inbox className='w-10 h-10  '/>
            <p className='mt-2 text-sm font-bold' >Déposer votre PDF ici</p>
          </div> 
        </div>
    </div>
  )
}
