const localHost = "http://localhost:5002"

export default{
  get(){
  return fetch(`${localHost}/userLanguages`).then(response => response.json())
  },
  getUserLangsById(id){
    return fetch(`${localHost}/userLanguages/${id}`).then(res => res.json())
  },
  getUserById(id){
    return fetch(`${localHost}/users/${id}`).then(res => res.json())
  },
  getUsers(){
    return fetch(`${localHost}/users`).then(res => res.json())
  },
  getCurrentUserLangs(sessionId){
    return fetch(`${localHost}/userLanguages?userId=${sessionId}&_expand=language`).then(r => r.json())
  },
  deleteLanguageCard(id){
    return fetch(`${localHost}/userLanguages/${id}`,{
      method:"DELETE"
    }).then(e => e.json())
  },
  postNewUserLangCard(object){
    return fetch(`${localHost}/userLanguages`,{
      method:"POST",
      headers:{"Content-Type":"application/JSON"},
      body:JSON.stringify(object)
    }).then(s => s.json())
  },
  editLanguage(id, existingObj){
    return fetch(`${localHost}/userLanguages/${id}`,{
      method:'PUT',
      headers:{
        "Content-Type": "application/JSON"
      },
      body:JSON.stringify(existingObj)
      
    })
  },
  editUserInfo(id, existingObj){
    return fetch(`${localHost}/users/${id}`,{
      method:'PUT',
      headers:{
        "Content-Type": "application/JSON"
      },
      body:JSON.stringify(existingObj)
      
    })
  }
  
}