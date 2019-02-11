const localHost = "http://localhost:5002"

export default{
  getFollowers(){
    return fetch(`${localHost}/friends`).then(res => res.json())
  },
  getFriendsByUser(sessionId) {
    return fetch(`${localHost}/friends?currentUserId=${sessionId}&_expand=user`).then(e => e.json());
  },
  getFriendUserName(followedUserId){
    return fetch(`${localHost}/users/${followedUserId}`).then(spon => spon.json())
  },
  postNewFollow(friendObj){
    return fetch(`${localHost}/friends`, {
      method:"POST",
      headers:{
        "Content-Type": "application/JSON"
      },
      body:JSON.stringify(friendObj)
    }).then(p => p.json())
  },
  unfollowUsers(id){
    return fetch(`${localHost}/friends/${id}`,{
      method:"DELETE"
    }).then(e => e.json())
  }
}