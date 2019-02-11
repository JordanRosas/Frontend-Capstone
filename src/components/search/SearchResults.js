import React, { Component } from 'react'
import './SearchResults.css'
import "bootstrap/dist/css/bootstrap.min.css"
import '../../index.css'
export default class SearchResults extends Component{
//constructing new friend object in the database userId is the logged in user and the otherUserId is the user the logged in user wants
//to follow
constructFriend = (userId) => {
      const friendObject = {
      currentUserId:Number(sessionStorage.getItem("username")),
      userId:userId
    }
    this.props.followFriend(friendObject)
    // console.log(array)
  }



  render(){
    return(
      <React.Fragment >
        <section className="users">
          {
            this.props.userLanguages.map(userLanguage => {
            return <div className="card cards" key={userLanguage.user.id}>
                    <div className="card-body" >
                      <h5 className="card-title">{userLanguage.user.username}</h5>
                      <p className="border"></p>
                      <p>Rate: {userLanguage.rate} out of 5</p>
                      <button className="btn btn-success" type="button"  onClick={() => this.constructFriend(userLanguage.user.id)}> Follow</button>
                    </div>
                  </div>
            })  
            
          }
          </section>
          
      </React.Fragment>
    )
  }
}
