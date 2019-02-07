import React, { Component } from 'react'

export default class SearchResults extends Component{

//constructing new friend object in the database userId is the logged in user and the otherUserId is the user the logged in user wants
//to follow
constructFriend = evt => {
  //creating an empty array to map over and eventually grab the ID 
  let array = this.props.languages.map(language => language.id)
  evt.preventDefault()
      const friendObject = {
      userId:Number(sessionStorage.getItem("username")),
      //grabbing the 
      otherUserId: array[0]
      
    }
    this.props.followFriend(friendObject)
  }



  render(){
    return(
      <React.Fragment>
        <div>
          {
            this.props.languages.map(language => {
        return  <div key={language.id} >
                  <p>{language.username}</p>
                  <p>Proficiency: {language.rate} out of 5</p>
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


