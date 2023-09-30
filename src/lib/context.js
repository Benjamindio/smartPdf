


export async function getContext(token, url) {

    fetch('http://localhost:3000/chats/getMatchesFromEmbeddings', {
        method:'POST',
        headers:{'Content-Type': 'application/json'}, 
        body:JSON.stringify({token:token, url:url
    }).then((response)=> response.json())
    .then((data => {
        return data.matches.join('\n').substring(0, 3000)
    }))
    })
}