import React, { Component } from 'react'
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
          <div classNameName="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="email"
                    placeholder="Email" />
          </div>
          <div classNameName="form-group">
            <label htmlFor="zip">Zipcode: </label>
            <input type="text" required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="zipcode"
                    placeholder="zipcode" />
          </div>
          <div classNameName="form-group">
          <label htmlFor="photoURL">Photo URL: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="photoURL"
                  placeholder="photoURL" />
          </div>
          <button type="button" onClick={this.updateExistingUser}>Update</button>
        </form>

    )
  }
}