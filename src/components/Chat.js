'use client'
import React from 'react'
import { Input } from './ui/input'
import {useChat} from 'ai/react'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import MessageList from './MessageList'

export default function Chat(props) {
    const {input, handleInputChange, handleSubmit, messages} = useChat({
        api: '/api/chat',
        body:{
            token: props.chatId, 
            url: props.pdfUrl
        }
    })
    
  return (
    <div className='relative max-h-screen overflow-scroll'>
        <div className='sticky top-0 inset-x-0 p-2 bg-white h-fit'>
            <h3 className='text-xl font-bold'>Chat</h3>
        </div>
        <MessageList messages={messages}/>
        <form onSubmit={handleSubmit} className='sticky bottom-0 inset-x-0 px-3 py-4 bg-white'>
            <div className='flex'>
                <Input className="w-full" value={input} onChange={handleInputChange} placeholder="Poser votre question..."/>
                <Button className="ml-2">
                    <Send className='h-4 w-4'/>
                </Button>
            </div>
        </form>
    </div>
  )
}
