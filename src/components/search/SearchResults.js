import React, { Component } from 'react'
import './SearchResults.css'
// import "bootstrap/dist/css/bootstrap.min.css"
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
  }
  
    
  


  render(){
    return(
      <React.Fragment >
        <section className="users">
          {
            this.props.userLanguages.map(userLanguage => {
            return <div className="card" id="card"  key={userLanguage.user.id}>
                    <div className="card-body" >
                      <h5 className="card-title">{userLanguage.user.username}</h5>
                      <p className="border"></p>
                      <img className="userPid" src={userLanguage.user.photoURL} alt="user" />
                      <p>Rate: {userLanguage.rate} out of 5</p>
                      <p className="language">Languages: {this.props.languages.map(language => {
                        if(userLanguage.languageId === language.id){
                          return language.language
                        }
                      })
                    }</p>
                      <button className="button" type="button"  onClick={() => this.constructFriend(userLanguage.user.id)}></button>
                    </div>
                  </div>
            })  
            
          }
          </section>
          
      </React.Fragment>
    )
  }
}
