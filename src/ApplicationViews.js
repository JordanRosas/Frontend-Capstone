import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import SearchManager from './modules/SearchManager'
import SearchResults from './components/search/SearchResults'
import LoginManager from './modules/LoginManager';
import LoginForm from './components/authentication/LoginForm'
import RegisterForm from './components/authentication/RegisterForm'
import HomePage from './components/home/HomePage'
import FriendList from './components/friends/FriendList'
import MessageList from './components/messages/MessageList'
import UserProfile from './components/profile/UserProfile'
import FriendManager from './modules/FriendManager'
export default class ApplicationViews extends Component{

  state= {
    users:[],
    languages:[],
    friends:[]
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
      console.log(this.state)
    })
    FriendManager.getFollowers().then(AllFollows => {
      this.setState({
        friends:AllFollows
      })
    })
  }


  postNewUser = newUser => 
    LoginManager.postNewUsers(newUser)
    .then(() => LoginManager.getAllUsers())
    .then(user => 
      this.setState({
        users:user
      })
    )
  verifyUsers = (username, password) => {
    LoginManager.verifyUsers(username, password)
    .then(allUsers => this.setState({
      users: allUsers
    }))
  }
  followFriend = (friendObj) => {
    FriendManager.postNewFollow(friendObj)
    .then(() => FriendManager.getFollowers())
    .then(follows => {
      this.setState({
        friends:follows
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
          langauges={this.state.languages}
          users={this.state.users} />
        }}
      
        />
        <Route exact path="/home" render={props => {
          if(this.isAuthenticated()){
            return <HomePage  />
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
                      />

          }else{
            return <Redirect to="/login" />
          }
          
        }} />
        
        <Route exact path="/friends" render={props => {
          if(this.isAuthenticated()){
            return <FriendList />
          }else{
            return <Redirect to="/login" />
          }
        }} />
        <Route exact path="/messages" render={props => {
          if(this.isAuthenticated()){
            return <MessageList />
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