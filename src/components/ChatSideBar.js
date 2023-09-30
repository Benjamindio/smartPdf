import React,{useEffect, useState} from 'react'
import {UserButton, useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'
import { MessageCircle, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'




export default function ChatSideBar(props) {
    const [chatsData, setChatsData] = useState([])
    
    const {isLoaded,user} = useUser()
    console.log(props.userId)
    useEffect(()=> {
        fetch('http://localhost:3000/chats/getUserChats', {
          method:'POST',
          headers:{'Content-Type': 'application/json'}, 
          body:JSON.stringify({userId:props.userId})
        }).then((response)=> response.json())
        .then((data)=> {
          if(data.result) {
             
            setChatsData([...data.chatsData])
            
          } else {
            console.log(data)
            toast.error('No chats founds')
            redirect('/')
          }
          
        })
        
      },[props.chatId])

      


   
  return (
    <div className='w-full h-screen p-4'>
        <div className='h-1/6 flex flex-col justify-between'>
            <Link href='/' className='text-3xl font-bold text-[#0A042A]'>SmartPdf<span className=' text-transparent bg-clip-text bg-gradient-to-bl from-pink-300 via-purple-300 to-indigo-400'>.ai</span></Link>
            {isLoaded && (<div className='flex items-center justify-evenly gap-2 -mb-8'>
              <UserButton afterSignOutUrl='/'/>
              {user.emailAddresses.map((email)=> (
                <div key={email.id} className='text-[#0A042A]'>
                  <p>{user.firstName} {user.lastName}</p>
                  <p className=' text-gray-400'>{email.emailAddress} </p>
                  
                </div>
              ))}
              </div> )}
              <div className='border-b-2 -mx-2'></div>
          </div>
          <div className='flex flex-col gap-5  h-3/6 pt-10'  >
          {chatsData.map((chat) => (
            <Link href={`/chat/${chat.token}`} className={`${chat.token === props.chatId ? 'text-[#5271FF]' : 'text-[#0A042A]'} flex gap-3 items-center cursor-pointer  hover:text-[#5271FF]`} key={chat.token} > 
              <MessageCircle className=''/>
              <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>{chat.name}</p>
            </Link>
            
          ))}
          </div>
          <div className=' h-1/6'></div>
          <div className='h-1/6 flex items-end justify-center'>
            <Link href='/'>
                <Button>
                    <PlusCircle className='mr-2 w-4 h-4 ' />
                    New Chat
                </Button>
            </Link>
          </div>
    </div>
  )
}
