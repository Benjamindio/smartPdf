'use client'
import React, { useEffect } from 'react'
import { Input } from './ui/input'
import {useChat} from 'ai/react'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import MessageList from './MessageList'
import { useState } from 'react'

export default function Chat(props) {
    let [previousMessages, setPreviousMessages] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    const {input, handleInputChange, handleSubmit, messages} = useChat({
        api: '/api/chat',
        body:{
            token: props.token, 
        },
        initialMessages: previousMessages || []
    })
    useEffect(() => {
        
        const messageContainer = document.getElementById('message-container')
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: 'smooth'
            })
        }
       
    }, [messages])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}chats/getMessages/${props.token}`, {
            method:'GET'
        }).then((response) => response.json())
        .then((data) => {
            setPreviousMessages(data.messages)
            setIsLoading(false)
        })
    }, [])
  return (
    <div className='relative max-h-screen overflow-scroll' id="message-container">
        <div className='sticky top-0 inset-x-0 p-2 bg-white h-fit'>
            <h3 className='text-xl font-bold'>Chat</h3>
        </div>
        <MessageList messages={messages} isLoading={isLoading}/>
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
