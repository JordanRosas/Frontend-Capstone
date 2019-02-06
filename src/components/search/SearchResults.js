import React, { Component } from 'react'

export default class SearchResults extends Component{

constructFriend = evt => {
  let array = this.props.languages.map(language => language.id)
  evt.preventDefault()
      const friendObject = {
      userId:Number(sessionStorage.getItem("username")),
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


