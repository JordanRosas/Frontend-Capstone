const localHost = "http://localhost:5002"

export default{
  getAllUsers(){
    return fetch(`${localHost}/users`).then(s => s.json())
  },
  verifyUsers(username, password){
    return fetch(`${localHost}/users?username=${username}&password=${password}`)
    .then(p => p.json())
  },
  getUserId(id){
    return fetch(`${localHost}/users/${id}`).then(e => e.json())
  },
  getUserLanguages(){
    return fetch(`${localHost}/userLanguages`).then(s => s.json())
  },
  postNewUserLanguage(userLangObj){
    return fetch(`${localHost}/userLanguages`, {
      method:"POST",
      headers:{
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify(userLangObj)
    }).then(p => p.json())
  },
  postNewUsers(userObj){
    return fetch(`${localHost}/users`, {
      method:"POST",
      headers:{
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify(userObj)
    }).then(p => p.json())
  }
}