import React, { Component } from 'react'
import FriendManager from '../../modules/FriendManager'
// import FriendCards from './FriendCards'
/*Need grab session storage id and see whose using the application
then do a GET_expand on the user and grab the Id's of the users followees.
then pass the followees Id's into another fetch call and get the user object that 
corresponds with the followees Id. then we want to create a card of each of the 
logged in users friends*/
// console.log("current user is " + follow.userId + " " + "friend is " + follow.otherUserId)
export default class FriendsList extends Component{
  state = {
    currentFriends: []
  }

  componentDidMount(){
    let userId = sessionStorage.getItem("username")
    let currentUserId = Number(userId)
    console.log(currentUserId)
    FriendManager.getFriendsByUser(currentUserId)
    .then(response => {
      this.setState({currentFriends:response})
    })
  }

  render(){
    return(
      <section className="friends">
          <div className="current-friends-div">
            <h2>Your Friends</h2>
            {
              this.state.currentFriends.map(eachFriend => {
                return <div key={eachFriend.user.id}>
                          <h2>{eachFriend.user.username}</h2>
                          <p>Rate: {eachFriend.user.rate} out of 5 </p>
                        </div>
                      }     
                    )}
          <div>
            {this.props.languages.map(language => console.log(language))}
          </div>

          </div>
      </section>
    )
  }
}