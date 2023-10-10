


export async function getContext(token, query) {

   return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}chats/getMatchesFromEmbeddings`, {
        method:'POST',
        headers:{'Content-Type': 'application/json'}, 
        body:JSON.stringify({token, query
    })}).then((response)=> response.json())
    .then((data => {
        return data.matches.join('\n').substring(0, 3000)
    }))
    
}