import React, { Component } from 'react'
import './SearchResults.css'
import "bootstrap/dist/css/bootstrap.min.css"
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
        <section className="users">
          {
            this.props.userLanguages.map(userLanguage => {
        return    <div className="card">
                    <div className="card-body" id="resultCard" key={userLanguage.userId}>
                      <h5 className="card-title">{userLanguage.user.username}</h5>
                      <p className="border"></p>
                      <p>Rate: {userLanguage.rate} out of 5</p>
                      <button className="btn btn-success" type="button"  onClick={this.constructFriend}> Follow</button>
                    </div>
                  </div>
            })  
            
          }
          </section>
      </React.Fragment>
    )
  }
}
