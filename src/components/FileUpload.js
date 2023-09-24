'use client'
import { Inbox } from 'lucide-react'
import React from 'react'
import { useDropzone } from 'react-dropzone'

export default function FileUpload() {
    const formData = new FormData()
    const {getRootProps, getInputProps} = useDropzone({
        accept:{"application/pdf" :[".pdf"]},
        maxFiles:1,
        onDrop: async (acceptedFiles) => {
            console.log(acceptedFiles)
            const file = acceptedFiles[0]
            if(file.size > 10 * 1024 * 1024) {
                alert('please upload a smaller file')
                return
            }
            try {
                
                formData.append('pdfFromFront', file)
                console.log("uploading")
                console.log()
                console.log('formData = ',formData)
                fetch('http://localhost:3000/upload', {
                    method:'POST', 
                    body:formData,
                }).then((response) => response.json())
                .then((data) => {
                    console.log(data)
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
