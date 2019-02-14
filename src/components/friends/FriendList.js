import React, { Component } from 'react'
import FriendManager from '../../modules/FriendManager'
import './FriendList.css'
import "bootstrap/dist/css/bootstrap.min.css"
import MessageManager from '../../modules/MessageManager'
// import FriendCards from './FriendCards'
/*Need grab session storage id and see whose using the application
then do a GET_expand on the user and grab the Id's of the users followees.
then pass the followees Id's into another fetch call and get the user object that 
corresponds with the followees Id. then we want to create a card of each of the 
logged in users friends*/
// console.log("current user is " + follow.userId + " " + "friend is " + follow.otherUserId)
export default class FriendsList extends Component{

    state = {
      friends:[]
    }

  componentDidMount(){
      this.buildFriendsList()
  }

  //method to unfollow users
  unfollowUsers = (id) => {
    FriendManager.unfollowUsers(id)
    .then(() => this.buildFriendsList())
    
  }
  //method to build the logged in users follow list after removing a user from their list
  buildFriendsList = () => {
    let userId = sessionStorage.getItem("username")
    let loggedInUser = Number(userId)
    console.log(loggedInUser)
    FriendManager.getFriendsByUser(loggedInUser)
    .then(response => {
      this.setState({friends: response})
      console.log(response)
  })
}




  render(){
    return(
      <>
      <div className="friend">
      <h1 className="followHeader">Your Polyglot Pals</h1>
      <section className="friends">
            {this.state.friends.map(friend => {
              return <div className="card" id="card" key={friend.id}>
                      <div className="card-body">
                        <h3 className="card-title">{friend.user.username}</h3>
                        <img className="friendPic" src={friend.user.photoURL} alt="user profile picture" />
                        <button 
                        type="btn" 
                        className="deleteButton btn"
                        onClick={() => this.unfollowUsers(friend.id)}>Unfollow</button>
                        <button 
                        id={friend.id}
                        type="btn" 
                        className="messageButton btn btn-2"
                        onClick={() => this.props.history.push('/messages')}>Message</button>
                      </div>
                    </div>
                  
                    })}
                  </section>
                </div>
      </>
    )
  }
}