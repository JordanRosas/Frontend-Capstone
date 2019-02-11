import React, { Component } from 'react'
import FriendManager from '../../modules/FriendManager'
import './FriendList.css'
import "bootstrap/dist/css/bootstrap.min.css"
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
      <h1 className="followHeader">Your Polyglot Pals</h1>
      <section className="friends">
          <div className="current-friends-div">
          <div>
            {this.state.friends.map(friend => {
              console.log(friend.user.id)
              return <div className="card" key={friend.id}>
                      <div className="card-body">
                        <h3 className="friendName">{friend.user.username}</h3>
                        <button 
                        type="btn" 
                        className="deleteButton btn"
                        onClick={() => this.unfollowUsers(friend.id)}>Unfollow</button>
                        <button 
                        type="btn" 
                        // data-toggle="modal" 
                        // data-target="#exampleModal"
                        className="messageButton btn btn-2"
                        onClick={() => this.props.history.push('/messages')}>Message</button>
                      </div>
                    </div>
                  
                    })}
                </div>
            </div>
      </section>
      </>
    )
  }
}