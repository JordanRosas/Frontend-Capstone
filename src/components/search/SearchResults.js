import React, { Component } from 'react'
import './SearchResults.css'
// import "bootstrap/dist/css/bootstrap.min.css"
import '../../index.css'
import FriendManager from '../../modules/FriendManager'
export default class SearchResults extends Component{
//constructing new friend object in the database userId is the logged in user and the otherUserId is the user the logged in user wants
//to follow
constructFriend = (currentUserId, userId) => {
      const friendObject = {
      currentUserId:currentUserId,
      userId:userId
    }
    this.props.followFriend(friendObject)
  }

  //created this method to check the database for friend relationships if they exist an alert will display saying they are already friends
followFriend = (UserId) => {

  let sessionUser = Number(sessionStorage.getItem("username"));

  let currentUserId = sessionUser;
  let userId = UserId;

  if(this.props.userLanguages.userId !== Number(sessionUser))
  {

    FriendManager.getFriendship(currentUserId, userId)
      .then(allConnections => {
        console.log(allConnections);

        let results = allConnections.find(connection => connection.currentUserId === Number(sessionUser) && connection.userId === userId);
        if(results === undefined)
        {
          this.constructFriend(currentUserId, userId)
          alert("added as a friend!")
        }
        else{
          alert("You are already friends");
        }
      })

  }

}

  render(){
    return(
      <React.Fragment >
        <section className="users">
          {
            this.props.userLanguages.map(userLanguage => {
              if(userLanguage.userId !== Number(sessionStorage.getItem("username"))){
                return <div className="card" id="card"  key={userLanguage.user.id}>
                        <div className="card-body" >
                          <h5 className="card-title">{userLanguage.user.username}</h5>
                          <p className="border"></p>
                          <img className="userPid" src={userLanguage.user.photoURL} alt="user" />
                          <p>Rate: {userLanguage.rate} out of 5</p>
                          <p className="language">Speaks: {this.props.languages.map(language => {
                            if(userLanguage.languageId === language.id){
                              return language.language
                            }
                          })
                        }</p>
                          <button className="button" type="button" id = {userLanguage.userId} onClick={() => this.followFriend(userLanguage.userId)}></button>
                        </div>
                      </div>
              }
            })  
          }
          </section>         
      </React.Fragment>
    )
  }
}
