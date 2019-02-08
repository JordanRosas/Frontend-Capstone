import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class FriendCard extends Component{
  render(){
    return(
      <div key={this.props.friends.id} className="card">
        <div className="card-body">
          <h5 className="card-title">
            {this.props.languages}
          </h5>
        </div>
      </div>
    )
  }
}