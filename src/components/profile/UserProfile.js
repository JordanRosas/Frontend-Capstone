import React, { Component } from 'react'
import './Profile.css'
import ProfileManager from '../../modules/ProfileManager'
import { Link } from 'react-router-dom'

export default class UserProfile extends Component{

  state={
    userLanguages:[],
    users:[]
  }

  componentDidMount(){
    ProfileManager.getUserById(Number(sessionStorage.getItem("username"))).then(allUsers => {
      let users = [allUsers]
      this.setState({users:users})
    })
    this.getUserProfileDeatails() 
  }

  /*creating this method to call in componentDidMount() to get the current users profile information. THEN setting state of users
  Because I need all the information for the user and their information is mainly lying in many-to-many relationship tables
  I used the following fetch call ${localHost}/userLanguages?languageId=${id}&_expand=user so I am able to access every detail for the 
  currently logged in user!!*/
  getUserProfileDeatails = () => {
    let currentUser = Number(sessionStorage.getItem("username"))
    console.log(currentUser)
    ProfileManager.getCurrentUserLangs(currentUser)
    .then(allUsers => {
      this.setState({userLanguages:allUsers})
    })
  }
  deleteLangCard = (id) => {
    this.props.delete(id)
    .then(() => this.getUserProfileDeatails())
  }

  
render(){
  return(
    <>
      <div className="banner">
        <h1>Profile</h1>
      </div>
      <div className="mainContainer">
        {
          this.state.users.map(user => {
            return <div key={user.id}>
                      <figure>
                        <img className="profilePic" src={user.photoURL} alt="dog pic" />
                        <figcaption className="userTag">
                          <h5>Area: {user.zipcode}</h5>
                          <h5>{user.username}</h5>
                          <Link className="nav-link" to={`/profile/${user.id}/edit/profileImage/location`}>Edit</Link>
                        </figcaption>
                      </figure>

                      <div className="cardDeck">
                      {
                      this.state.userLanguages.map(userLang => {
                        return <div className="flip-card" key={userLang.id}>
                                  <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                      <img className="card-front" src={userLang.flagPhotoURL} alt="Avatar"  />
                                    </div>
                                    <div className="flip-card-back">
                                      <h1>{userLang.language.language}</h1> 
                                      <p>Fluency {userLang.rate} out of 5</p> 
                                      <p>{userLang.notes}</p>
                                      {/* <p>We love that guy</p> */}
                                      <Link className="nav-link" to={`/profile/${userLang.id}/edit`}>Edit</Link>
                                      <button 
                                      id="deleteButton"
                                      type="button" 
                                      onClick={() => this.deleteLangCard(userLang.id)}>
                                        Delete Language
                                      </button>
                                    </div>
                                  </div>
                                </div>    
                              })
                        }
                        </div>
                                
                      <div className="languageCards">
                        <div className="newlanguageCard">
                          <button type="button"
                              className="btn btn-success"
                              id="button"
                              onClick={() => {
                              this.props.history.push("/profile/new")}}>
                              Add a new language
                          </button>
                        </div>
                      </div>
                    </div>
                    })
                }
          </div>    
      </>
                
  )
}
}