'use client'
import { Inbox } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { updateUsage } from '@/redux/features/users'

export default function FileUpload(props) {
    const dispatch = useDispatch()
    const router = useRouter()
    const formData = new FormData()
    const [vectorize, setVectorize] = useState(false)
    const [pdfUrl, setPdfUrl] = useState(null)
    const userId = useSelector((state) => state.users.value.userId)
    const usage = useSelector((state) => state.users.value.usage)

    const upload = async () => {
        if(usage > 0){
        await toast.promise(fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}upload`, {
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
            console.log('saving to pinecone')
            return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}chats/create-chat`, {
                method:'POST',
                headers:{'Content-Type': 'application/json'}, 
                body:JSON.stringify({name:data.name, url:data.url, userId})
            })
            }
            
        })
        .then((response) => response.json())
        .then((data)=> {
            console.log(data)
            if(!data.error) {
                router.push(`/chat/${data.token}`)
                dispatch(updateUsage())
                let updatedUsage = usage -1
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}users/updateUsage`, {
                    method:'POST', 
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({userId, usage : updatedUsage})
                })
            } else {
                toast.error(data.error)
            
            }
            
        }), {
            loading: 'Upload en cours...',
            success: 'Upload réussi ! ',
            error: 'Une erreur est survenue',
        })
        } else {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}chats/userFirstChat`, {
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({userId})
            }).then((response) => response.json())
            .then((data) => {
                router.push(`/chat/${data.token}`)
            })
            

        }
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
                upload()
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
