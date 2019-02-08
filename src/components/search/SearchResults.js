import React, { Component } from 'react'

export default class SearchResults extends Component{

//constructing new friend object in the database userId is the logged in user and the otherUserId is the user the logged in user wants
//to follow
constructFriend = evt => {
  //creating an empty array to map over and eventually grab the ID 
  let array = this.props.userLanguages.map(userLanguage => console.log(userLanguage.id))
  evt.preventDefault()
      const friendObject = {
      currentUserId:Number(sessionStorage.getItem("username")),
      //grabbing the 
      userId: array[0]
    }
    console.log(friendObject.userId)
    this.props.followFriend(friendObject)
  }



  render(){
    return(
      <React.Fragment>
        <div>
          {
            this.props.users.map(user => {
        return  <div key={user.id} >
                  <p>{user.username}</p>
                  <button type="button" id="followButton" onClick={this.constructFriend}> Follow</button>
                  <button>Message</button>
                </div>
            })  
          }
          </div>
      </React.Fragment>
    )
  }
}


