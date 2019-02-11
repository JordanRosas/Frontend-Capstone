import React, { Component } from 'react'
import SearchInput from '../search/SearchInput';

export default class HomePage extends Component{

  render(){
    return(
      <div className="home">
      <div>
        <SearchInput {...this.props} />
      </div>
      </div>
    )
  }
}