import React, { Component } from 'react'
import './SearchResults.css'
export default class SearchResults extends Component{
//constructing new friend object in the database userId is the logged in user and the otherUserId is the user the logged in user wants
//to follow
constructFriend = evt => {
  //creating an empty array to map over and eventually grab the ID 
  let array = []
  this.props.userLanguages.map(userLanguage => array.push(userLanguage))
  evt.preventDefault()
      const friendObject = {
      currentUserId:Number(sessionStorage.getItem("username")),
      userId:array[0].user.id
    }
    // console.log(friendObject.followedUserId)
    this.props.followFriend(friendObject)
  }



  render(){
    return(
      <React.Fragment>
        <div>
          {
            this.props.userLanguages.map(userLanguage => {
        return  <div id="resultCard" key={userLanguage.userId} >
                  <p>{userLanguage.user.username}</p>
                  <p>Rate: {userLanguage.rate} out of 5</p>
                  <button type="button"  onClick={this.constructFriend}> Follow</button>

                </div>
            })  
            
          }
          </div>
      </React.Fragment>
    )
  }
}


