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
       
       

        
        
        const lastMessage = messages[messages.length -1];
        const context = await getContext(token, lastMessage.content)
        const prompt = {
            role: "system", 
            content:`Tu agiras en tant qu'assistant administratif pour répondre à la question de l'utilisateur en utilisant les données qui te sont fournies.
            Ta réponses se basera uniquement sur les informations contenues dans les balises [context du document] et [fin du context du document].
            Si tu souhaites donner un élément de réponse qui n'est pas dans ces balises, tu peux le faire avec parcimonie en indiquant ces informations ne sont pas dans le document.
            Tu peux également indiquer que tu ne comprends pas la question en indiquant "Je ne comprends pas la question" ou "Je ne sais pas".
            Si tu n'as pas la réponse, tu peux indiquer que tu n'a pas pu trouver la réponse dans le document. 
            Voici les informations du document : [context du document] ${context} [fin du context du document]
            `
        }
        const response = await openai.createChatCompletion({
            model:'gpt-3.5-turbo', 
            messages : [
                prompt,...messages.filter((message) => message.role === 'user')
            ],
            stream:true
        })
        const stream = OpenAIStream(response, {
            onStart: async () => {
                // save user message into db
                fetch('http://localhost:3000/chats/saveMessage', {
                    method:'POST',
                    headers:{'Content-Type': 'application/json'}, 
                    body:JSON.stringify({token, content: lastMessage.content, role:'user'})
                 } )
            }, 
            onCompletion: async (completion) => {
                //save ai message into db 
                fetch('http://localhost:3000/chats/saveMessage', {
                    method:'POST',
                    headers:{'Content-Type': 'application/json'}, 
                    body:JSON.stringify({token, role:'system',content:completion})
                 } )
            }
        })
        return new StreamingTextResponse(stream)
    } catch(error) {
        console.error(error)
        return NextResponse.json({'error' : 'An error occurred'} , {status:500});
    }
}

