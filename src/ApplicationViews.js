import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import SearchManager from './modules/SearchManager'
import SearchResults from './components/search/SearchResults'
import LoginManager from './modules/LoginManager';
import LoginForm from './components/authentication/LoginForm'
import RegisterForm from './components/authentication/RegisterForm'
import HomePage from './components/home/HomePage'
import FriendList from './components/friends/FriendList'
import Messages from './components/messages/Messages'
import UserProfile from './components/profile/UserProfile'
import FriendManager from './modules/FriendManager'
import MessageManager from './modules/MessageManager'
export default class ApplicationViews extends Component{

  state= {
    users:[],
    languages:[],
    friends:[],
    messages:[]
  }
  isAuthenticated = () => sessionStorage.getItem("username") !== null

  componentDidMount(){
    SearchManager.getAll().then(AllRes => {
      this.setState({
        users:AllRes
      })
    })
    SearchManager.getAllLanguages().then(AllLang => {
      this.setState({
        languages:AllLang
      }) 

    })
    FriendManager.getFollowers().then(AllFollows => {
      this.setState({
        friends:AllFollows
      })
    })
    MessageManager.getAll()
      .then(allMessages => {
        this.setState({ messages: allMessages })
      })
  }

  postNewUser = newUser => 
    LoginManager.postNewUsers(newUser)

    postNewMessage = (message) => MessageManager.postNewMessage(message)
    .then(() => MessageManager.getAll())
    .then(allMessages => this.setState({
      messages: allMessages
    })
    )
    postNewUserLanguage = (userObj) => {
      LoginManager.postNewUserLanguage(userObj)
      .then(() => LoginManager.getAllUsers())
      .then(allUsers => this.setState({
        users:allUsers
      }))
    }


  verifyUsers = (username, password) => {
    LoginManager.verifyUsers(username, password)
    .then(allUsers => this.setState({
      users: allUsers
    }))
  }


  followFriend = (friendObj) => {
    FriendManager.postNewFollow(friendObj)
  }
  editMessage = (messageId, editedMessage) => {
    return MessageManager.editMessage(messageId, editedMessage)
      .then(() => MessageManager.getAll())
      .then(messages => {
        this.setState({
          messages: messages
        })
      })
  }

  render(){
    return(
      <>
        <Route  exact path = "/login" render={(props) => {
          return <LoginForm {...props} 
          verifyUsers={this.verifyUsers}
          users={this.state.users} />
        }}
        />
        <Route exact path = "/login/new" render={(props) => {
          return <RegisterForm {...props}
          postNewUser={this.postNewUser}
          postNewUserLanguage={this.postNewUserLanguage}
          langauges={this.state.languages}
          users={this.state.users}  />
          
        }}
      
        />
        <Route exact path="/home" render={props => {
          if(this.isAuthenticated()){
            return <HomePage 
            searchAllData={this.props.searchAllData} />
          }else{
            return <Redirect to="/login" />
          }
          
        }} />
        <Route path="/home" render={props => {
          if(this.isAuthenticated()){
            return <SearchResults {...props}
                    users={this.state.users}
                    languages={this.props.languages}
                    searchAllData={this.props.searchAllData}
                    followFriend={this.followFriend}
                    userLanguages={this.props.userLanguages}
                      />

          }else{
            return <Redirect to="/login" />
          }
          
        }} />
        
        <Route exact path="/friends" render={props => {
          if(this.isAuthenticated()){
            return <FriendList {...props} 
            users={this.state.users}
            userLanguages={this.props.languages}
            getAllFriends={this.getAllFriends}/>
          }else{
            return <Redirect to="/login" />
          }
        }} />
        <Route exact path="/messages" render={props => {
          if(this.isAuthenticated()){
            return <Messages {...props}
            editMessage={this.editMessage}
            postNewMessage={this.postNewMessage}
            messages={this.state.messages} />
          }else{
            return <Redirect to="/login" />
          }
        }} />
        <Route exact path="/profile" render={props => {
          if(this.isAuthenticated()){
            return <UserProfile />
          }else{
            return <Redirect to="/login" />
          }
        }} />
    </>
    )
  }
}