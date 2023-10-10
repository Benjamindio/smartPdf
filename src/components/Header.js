'use client'
import Link from 'next/link'
import React,{useEffect, useState} from 'react'
import { ArrowRight } from 'lucide-react'
import { UserButton, useAuth } from '@clerk/nextjs'
import FileUpload from './FileUpload'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/features/users'


export default function Header() {
  const {userId} = useAuth()
  const dispatch = useDispatch()
  const isAuth = !!userId
  const [userFirstChat, setUserFirstChat] = useState('')
  
  if(userId){
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}users/login`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({userId})
    })
    .then((response) => response.json())
    .then((data) => {
      dispatch(login({userId, usage:data.usage}))
    })  
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}chats/userFirstChat`, {
      method:'POST', 
      headers:{'Content-Type' : 'application/json'},
      body:JSON.stringify({userId})
    }).then((response) => response.json())
    .then((data) => {
      setUserFirstChat(data.token)
    })
  }, [userId])
  }
  
  
  return (
    <header className='absolute inset-x-0 top-0 z-50'>
      <nav className='flex lg:flex-1 items-center justify-between p-6 lg:px-8' >
        <h1 className='text-3xl font-bold text-[#0A042A]'>TalkingPDF<span className=' text-transparent bg-clip-text bg-gradient-to-bl from-pink-300 via-purple-300 to-indigo-400'>.ai</span></h1>
        <div className='hidden  gap-5 lg:gap-14 font-bold items-center'>
          <Link href='' className=' hover:opacity-60'>Comment ça marche ?</Link>
          <Link href='' className='hover:opacity-60'>Features</Link>
        </div>
        <div>
        {isAuth ? (<UserButton afterSignOutUrl='/'/>) :( <a
                href="/sign-in"
                className=" flex items-center gap-2 rounded-md bg-[#5271FF] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-bl from-pink-300 via-purple-300 to-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Se connecter <ArrowRight />
              </a>)}
       
              </div>
      </nav>
      <div className=" isolate px-4 pt-14 lg:px-12 flex flex-row justify-between w-full">
        <div className="max-w-2xl py-32 lg:py-44 sm:w-2/5">
          
          <div className="">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Interagissez avec vos pdf
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
             Ne perdez plus de temps à chercher des informations dans un fichier pdf de plusieurs pages. TalkingPDF vous permet de discuter avec une IA qui ira chercher l'information à votre place.
            </p>
            <div className={"mt-10 items-center  gap-x-6"  + (isAuth ? ' flex flex-col  justify-center' : 'flex ')}>
              {isAuth ? (<a
                href={`/chat/${userFirstChat}`}
                className=" rounded-md bg-[#5271FF] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-bl from-pink-300 via-purple-300 to-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Retrouvez mes chats
              </a>) : (<a
                href="/sign-up"
                className="rounded-md bg-[#5271FF] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-bl from-pink-300 via-purple-300 to-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Commencer
              </a>)}
              {isAuth ? (<div className='py-5 -ml-2'><FileUpload /> </div>) :(<a href="" className="text-sm font-semibold leading-6 text-gray-900 px-6">
                En savoir plus <span aria-hidden="true">→</span>
              </a>)}
              
            </div>
            
          
        </div>
        </div>
        <div className='sm:w-3/5 hidden sm:block'>
            <div className='drop-shadow-2xl relative h-[36.125rem] -mr-24 rounded-3xl opacity-50 bg-gradient-to-bl from-pink-300 via-purple-300 to-indigo-400'></div>
            <img className='absolute top-[23%] ml-10 -mr-24 drop-shadow-2xl rounded-3xl' src="./demo.png" height={1200} width={1200}/>
           
            </div>
          
        
      </div>
      
    </header>


  )
}
