import React, { Component } from 'react'
import SearchManager from '../../modules/SearchManager'
import ResetRating from '../Rating/RatingSystem'
import './RegisterForm.css'

var zipcodes = require('zipcodes')
export default class RegisterForm extends Component{
  //setting state of the username and password fields
  state={
    username:"",
    password:"",
    email:"",
    lat:"",
    lng:"",
    photoURL:"",
    rate:"",
    userId:"",
    notes:"",
    flagPhotoURL:"",
    languages:[],
    zipcode:""
    
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
  componentDidMount(){
    this.buildLanguageOptions();
  }

  handleFieldChange = evt => {
    evt.preventDefault()
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleRatingChange = (rating) => {
    this.setState({rate:rating})
    
  }

  createNewUser = evt => {
    evt.preventDefault()
    let yourZip = zipcodes.lookup(this.state.zipcode)
    const newUser = {
      username: this.state.username,
      password:this.state.password,
      email:this.state.email,
      lat:yourZip.latitude,
      lng:yourZip.longitude,
      photoURL:this.state.photoURL,
      zipcode:parseInt(this.state.zipcode)

    }
    const userLanguage = {
      rate:this.state.rate,
      languageId:parseInt(this.state.language),
      notes:this.state.notes,
      flagPhotoURL:this.state.flagPhotoURL
    }
    this.props.postNewUser(newUser)
    .then(response => {
      console.log(response)
      userLanguage.userId = response.id
      this.props.postNewUserLanguage(userLanguage)})
    .then(() => this.props.history.push("/login"))
  }

  render(){
    return(
      <>
      <div className="register"></div>
      <form className="RegisterForm">
        <div className="form-row">
          <div className="form-group col-md-6">
          <label htmlFor="username">Username: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="username"
                  placeholder="username" />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="password">Password: </label>
          <input type="password" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="password"
                  placeholder="password" />
        </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input type="email" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="email"
                  placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="zip">Zipcode: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="zipcode"
                  placeholder="zipcode" />
        </div>
        <div className="form-group">
          <label htmlFor="lng">Select a language: </label>
          <select 
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="language"
                  placeholder="Select a language">
                  <option key={0} defaultValue="">English</option>
                  {
                    this.state.languages.map(language => (
                      <option key={language.id} value={language.id}>{language.language}</option>
                    ))
                  }
                  
          </select>
          <div className="form-group">
          <label htmlFor="photoURL">Photo URL: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="photoURL"
                  placeholder="photoURL" />
          </div>
          <div className="form-group">
          
          <label htmlFor="rate">Proficiency:</label>
          <ResetRating 
            id="rating"
            onChange={this.handleRatingChange}
            />
          </div>
        </div>
        <button
          id="register"
          type="submit" 
          onClick={this.createNewUser}>Sign Up</button>
      </form>
      </>
    )
  }
}