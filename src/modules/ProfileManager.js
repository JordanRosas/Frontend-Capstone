const localHost = "http://localhost:5002"

export default{
  getAll(sessionId){
    return fetch(`${localHost}/userLanguages/${sessionId}`).then(r => r.json())
  },
  postNewUserLangCard(object){
    return fetch(`${localHost}/userLanguages`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(object)
    }).then(s => s.json())
  }
}