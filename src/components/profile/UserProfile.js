import React, { Component } from 'react'
import './Profile.css'
import ProfileManager from '../../modules/ProfileManager'
import SearchManager from '../../modules/SearchManager'
import Rating from 'react-rating'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'

export default class UserProfile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userLanguages:[],
      users:[],
      modal: false,
      languageId:"",
      notes:"",
      flagPhotoURL:"",
      rate:0,
      userId:Number(sessionStorage.getItem("username")),
      languages:[]
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){
    this.buildLanguageOptions()
    // this.getCardId()
    ProfileManager.getUserById(Number(sessionStorage.getItem("username"))).then(allUsers => {
      let users = [allUsers]
      this.setState({users:users})  
    })
    this.getUserProfileDeatails() 
  }

  handleFieldChange= evt =>{
    evt.preventDefault()
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleRatingChange = (rating) => {
    this.setState({rate:rating})  
  }

  toggle = (evt) => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.getCardId(evt)
  }

  buildLanguageOptions(){
    let languages = []
    SearchManager.getAllLanguages()
    .then(allLanguages => {
      allLanguages.forEach(language => {
        if(!languages.includes({id: language.id, language: language.language})){
          languages.push({id: language.id, language: language.language})
        }
      })
      this.setState({languages:languages})
    })
  }
  getCardId = evt => {
    ProfileManager.getUserLangsById(evt.target.id)
    .then(userLangs => {
      this.setState({
        languageId:userLangs.languageId,
        notes:userLangs.notes,
        flagPhotoURL:userLangs.flagPhotoURL,
        rate:userLangs.rate,
      })
    })
    
  }
  updateExistingCard = evt => {
    evt.preventDefault()
    const existingCard = {
      languageId: parseInt(this.state.languageId),
      notes:this.state.notes,
      flagPhotoURL:this.state.flagPhotoURL,
      rate:this.state.rate,
      userId:this.state.userId
    }
    this.props.editCard(evt.target.id, existingCard)
    .then(() => this.getUserProfileDeatails())
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
    <div className="home">
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
                          <h5 className="profileName">Name: {user.username}</h5>
                          <h5 className="profileArea">Area: {user.zipcode}</h5>
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
                                      <Button color="danger" id={userLang.id} className="editTab" onClick={this.toggle}>Edit</Button>
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
                        <div>
        {/*============================================ MODAL FORM======================================================= */}
                          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                            <ModalBody>
                            <form className="editProfile">
                              <div className="form-row">
                                <div className="form-group col-md-6">
                                <label htmlFor="lng">Your language: </label>
                                <select
                                        value={this.state.languageId || ""} 
                                        className="form-control"
                                        type="select-multiple"
                                        onChange={this.handleFieldChange}
                                        id="languageId"
                                        placeholder="Select a language">
                                        <option key={0} defaultValue="">Select a Language</option>
                                        {
                                          this.state.languages.map(language => (
                                            <option key={language.id} value={language.id}>{language.language}</option>
                                          ))
                                          
                                        }
                                        
                                </select>
                              </div>
                              <div className="form-group col-md-6">
                              <label htmlFor="email">Flag Photo: </label>
                                <input type="text" required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="flagPhotoURL"
                                        value={this.state.flagPhotoURL || ""}
                                        // placeholder="Email" 
                                        />
                              </div>
                              </div>
                              
                              <div className="form-group">
                                <label htmlFor="password">Notes: </label>
                                <input type="text" required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="notes"
                                        value={this.state.notes || ""}
                                        // placeholder="Notes..."
                                        />
                              </div>
                                <label htmlFor="rate">Skill Level:</label>
                              <div className="form-group">
                                
                                <Rating 
                                  placeholderRating={this.state.rate}
                                  id="rating"
                                  onChange={this.handleRatingChange}
                                  />
                                </div>
                            {/* <button type="button" onClick={this.updateExistingCard}>Update</button> */}
                            </form>
                            </ModalBody>
                            <ModalFooter>
                            {
                              this.state.users.map(userLang => {
                                return <Button key={userLang.id} color="primary" id={userLang.id} onClick={this.updateExistingCard}>Update Card</Button> 
                              
                            })}
                            </ModalFooter>
                          </Modal>
                        </div>
                      </div>
                    </div>
                    })
                }
          </div>  
          </div>  
      </>
                
  )
}
}