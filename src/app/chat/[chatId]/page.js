'use client'
import React from 'react'
import {UserButton, useAuth, useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import ChatSideBar from '@/components/ChatSideBar'



export default function ChatPage({params:{chatId}}) {
    const {userId} = useAuth()
    

    
    if(!userId) {
      return redirect('/sign-in')
    }

    
    
  return (
    <div className='flex max-h-screen overflow-scroll'>
      <div className='flex w-full h-screen '>
        {/*chat sidebar*/}
        <div className=' border-2 flex-[1] max-w-xs'>
          {<ChatSideBar userId={userId} chatId={chatId}/>}
        </div>
      {/*pdf view*/}
      <div className='max-h-screen p-4 overflow-scroll flex-[5]'>
        
      </div>
      {/*chat component*/}
      <div className='border-l-4 border-l-slate-200 flex-[3]'>
        
      </div>

    </div>
    </div>
  )
}
