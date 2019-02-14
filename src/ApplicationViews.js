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
import NewUserLanguage from './components/profile/NewUserLanguage'
import ProfileManager from './modules/ProfileManager'
import EditLanguageCard from './components/profile/EditLanguageCard'
import EditUserDetails from './components/profile/EditUserDetails'
export default class ApplicationViews extends Component{

  state= {
    users:[],
    languages:[],
    friends:[],
    messages:[],
    userLanguages:[]
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
      ProfileManager.get().then(all => {
        this.setState({
          userLanguages:all
        })
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

    postNewUserLanguageCardToProfile = (langObject) => {
      return LoginManager.postNewUserLanguage(langObject)
    }


  verifyUsers = (username, password) => {
    LoginManager.verifyUsers(username, password)
    .then(allUsers => this.setState({
      users: allUsers
    }))
  }
  deleteCardFromProfile = (id) => {
    return ProfileManager.deleteLanguageCard(id)
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
  editCard = (userId, existingObj) => {
    return ProfileManager.editLanguage(userId, existingObj)
    .then(ProfileManager.get())
    .then(userLanguages => {
      this.setState({userLanguages:userLanguages})
    })
  }
  editUserInfo = (userId, userObj) => {
    return ProfileManager.editUserInfo(userId, userObj)
    .then(ProfileManager.getUsers())
    .then(user => {
      this.setState({users:user})
    })
  }

  render(){
    return(
      <>
        <Route  exact path = "/" render={(props) => {
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
            return <Redirect to="/" />
          }
          
        }} />
        <Route path="/home" render={props => {
          if(this.isAuthenticated()){
            return <SearchResults {...props}
                    users={this.state.users}
                    languages={this.state.languages}
                    searchAllData={this.props.searchAllData}
                    followFriend={this.followFriend}
                    userLanguages={this.props.userLanguages}
                      />

          }else{
            return <Redirect to="/" />
          }
          
        }} />
        
        <Route exact path="/friends" render={props => {
          if(this.isAuthenticated()){
            return <FriendList {...props} 
            users={this.state.users}
            userLanguages={this.props.languages}
            getAllFriends={this.getAllFriends}/>
          }else{
            return <Redirect to="/" />
          }
        }} />
        <Route exact path="/messages" render={props => {
          if(this.isAuthenticated()){
            return <Messages {...props}
            editMessage={this.editMessage}
            postNewMessage={this.postNewMessage}
            messages={this.state.messages}
            friends={this.state.friends}/>
          }else{
            return <Redirect to="/" />
          }
        }} />
        <Route exact path="/profile" render={props => {
          if(this.isAuthenticated()){
            return <UserProfile {...props}
            userLanguages={this.props.userLanguages}
            users={this.state.users}
            delete={this.deleteCardFromProfile}
            />
          }else{
            return <Redirect to="/" />
          }
        }} />
        <Route exact path="/profile/new" render={props => {
          if(this.isAuthenticated()){
            return <NewUserLanguage {...props}
            userLanguages={this.props.userLanguages}
            users={this.state.users}
            getUserLanguages={this.getUserLanguages}
            languages={this.state.languages}
            postNewUserLanguageCardToProfile={this.postNewUserLanguageCardToProfile}
            />
          }else{
            return <Redirect to="/" />
          }
        }} />
        <Route exact path="/profile/:id(\d+)/edit" render={props => {
          if(this.isAuthenticated()){
            return <EditLanguageCard {...props}
            userLanguages={this.props.userLanguages}
            users={this.state.users}
            getUserLanguages={this.getUserLanguages}
            languages={this.state.languages}
            editCard={this.editCard}
            postNewUserLanguageCardToProfile={this.postNewUserLanguageCardToProfile}
            />
          }else{
            return <Redirect to="/" />
          }
        }} />
        <Route exact path="/profile/:id(\d+)/edit/profileImage/location" render={props => {
          if(this.isAuthenticated()){
            return <EditUserDetails {...props}
            editUserInfo={this.editUserInfo}
            userLanguages={this.props.userLanguages}
            users={this.state.users}
            getUserLanguages={this.getUserLanguages}
            languages={this.state.languages}
            editCard={this.editCard}
            postNewUserLanguageCardToProfile={this.postNewUserLanguageCardToProfile}
            />
          }else{
            return <Redirect to="/" />
          }
        }} />
    </>
    )
  }
}