import React, { Component } from 'react'
import ProfileManager from '../../modules/ProfileManager';
// import SearchManager from '../../modules/SearchManager'
// import ResetRating from '../Rating/RatingSystem'
var zipcodes = require('zipcodes')
export default class EditUserDetails extends Component{
  state={
    username:"",
    password:"",
    email:"",
    lat:"",
    lng:"",
    photoURL:"",
    zipcode:""
  }
  componentDidMount(){
    let currentUser = sessionStorage.getItem("username")
    let userId = Number(currentUser)
    ProfileManager.getUserById(userId)
    .then(userInfo => {
      this.setState({
        username:userInfo.username,
        password:userInfo.password,
        email:userInfo.email,
        photoURL:userInfo.photoURL,
        zipcode:userInfo.zipcode
      })
    })
  }
  handleFieldChange= evt =>{
    evt.preventDefault()
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  updateExistingUser = evt => {
    evt.preventDefault()
    let yourZip = zipcodes.lookup(this.state.zipcode)
    const existingUserObj = {
      username:this.state.username,
      password:this.state.password,
      email:this.state.email,
      lat:yourZip.latitude,
      lng:yourZip.longitude,
      photoURL:this.state.photoURL,
      zipcode:parseInt(this.state.zipcode)
    }
    this.props.editUserInfo(Number(this.props.match.params.id), existingUserObj)
    .then(() => this.props.history.push("/profile"))
  }


  render(){
    return(
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
          <label htmlFor="username">Username: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="username"
                  value={this.state.username}
                  // placeholder="username" 
                  />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="password">Password: </label>
            <input type="password" required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="password"
                    value={this.state.password}
                    // placeholder="password"
                  />
          </div>
      </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="email"
                    value={this.state.email}
                    // placeholder="Email" 
                    />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zipcode: </label>
            <input type="text" required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="zipcode"
                    value={this.state.zipcode}
                    // placeholder="zipcode" 
                    />
          </div>
          <div className="form-group">
          <label htmlFor="photoURL">Photo URL: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="photoURL"
                  value={this.state.photoURL}
                  // placeholder="photoURL" 
                  />
          </div>
          <button type="button" onClick={this.updateExistingUser}>Update</button>
        </form>

    )
  }
}