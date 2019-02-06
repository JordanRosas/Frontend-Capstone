const localHost = "http://localhost:5002"

export default{
  getFollowers(){
    return fetch(`${localHost}/friends`).then(res => res.json())
  },
  postNewFollow(friendObj){
    return fetch(`${localHost}/friends`, {
      method:"POST",
      headers:{
        "Content-Type": "application/JSON"
      },
      body:JSON.stringify(friendObj)
    }).then(p => p.json())
  }
}