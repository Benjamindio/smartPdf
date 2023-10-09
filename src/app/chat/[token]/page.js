'use client'
import React, { use } from 'react'
import {UserButton, useAuth, useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import ChatSideBar from '@/components/ChatSideBar'
import PDFViewer from '@/components/PDFViewer'
import Chat from '@/components/Chat'
import { useSelector } from 'react-redux'



export default function ChatPage({params:{token}}) {
    const {userId} = useAuth()
    

    
    if(!userId) {
      return redirect('/sign-in')
    }

    
    
  return (
    <div className='flex max-h-screen '>
      <div className='flex w-full h-screen '>
        {/*chat sidebar*/}
        <div className=' border-2 flex-[1] max-w-xs'>
          {<ChatSideBar userId={userId} token={token}/>}
        </div>
      {/*pdf view*/}
      <div className='max-h-screen p-4  flex-[5]'>
        <PDFViewer token={token} />
      </div>
      {/*chat component*/}
      <div className='border-l-4 border-l-slate-200 flex-[3]'>
        <Chat token={token}/>
      </div>

    </div>
    </div>
  )
}
