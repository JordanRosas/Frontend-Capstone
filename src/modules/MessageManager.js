const localHost = "http://localhost:5002"

export default{
  getAllMessages(){
    return fetch(`${localHost}/messages`).then(re => re.json())
  },
  getMessageById(id){
    return fetch(`${localHost}/messages/${id}`).then(res => res.json)
  },
  postNewMessage(newMessageObj){
    return fetch (`${localHost}/messages`,{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify(newMessageObj)
    }).then(response => response.json())
  }
}