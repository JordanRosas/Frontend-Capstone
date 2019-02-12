import React, { Component } from 'react'
import dog from '../../assets/dog.JPG'
import './Profile.css'
import SearchManager from '../../modules/SearchManager'



export default class UserProfile extends Component{

  state={
    users:[]

  }

  componentDidMount(){
    this.getUserProfileDeatails() 
  }

  /*creating this method to call in componentDidMount() to get the current users profile information. THEN setting state of users
  Because I need all the information for the user and their information is mainly lying in many-to-many relationship tables
  I used the following fetch call ${localHost}/userLanguages?languageId=${id}&_expand=user so I am able to access every detail for the 
  currently logged in user!!*/
  getUserProfileDeatails = () => {
    let currentUser = Number(sessionStorage.getItem("username"))
    console.log(currentUser)
    SearchManager.searchUsersById(currentUser)
    .then(allUsers => {
      this.setState({users:allUsers})
      console.log(allUsers)
    })
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
            return <div key={user.user.id}>
                      <figure>
                        <img className="profilePic" src={user.user.photoURL} alt="dog pic" />
                        <figcaption className="userTag">
                          <h4>@{user.user.username}</h4>
                        </figcaption>
                      </figure>
                      <div className="languageCards">
                      
                        <div className="newlanguageCard">
                          <button type="button"
                              className="btn btn-success"
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