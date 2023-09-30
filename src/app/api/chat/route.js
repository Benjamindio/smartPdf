import {Configuration, OpenAIApi} from 'openai-edge'
import {OpenAIStream, StreamingTextResponse} from 'ai'
import { NextResponse } from 'next/server'
import { getContext } from '@/lib/context'

export const runtime = 'edge'

const config = new Configuration({
    apiKey:process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)


export async function POST(req) {
    try {
        const {messages, token} = await req.json()
        const pdfUrl = await fetch(`http://localhost:3000/chats/getPdfUrl/${token}`, { 
            method:'GET',
        })
        if(!pdfUrl.result) {
            return NextResponse.json({'error' : 'no pdf found'} , {status:404})
        }

        
        
        const lastMessage = messages[messages.length -1];
        const context = await getContext(token, pdfUrl.pdfUrl)
        const prompt = {
            role: "system", 
            content:``
        }
        const response = await openai.createChatCompletion({
            model:'gpt-3.5-turbo', 
            messages,
            stream:true
        })
        const stream = OpenAIStream(response)
        return new StreamingTextResponse(stream)
    } catch(error) {

    }
}

