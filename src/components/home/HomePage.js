import React, { Component } from 'react'
import SearchInput from '../search/SearchInput';
// import SearchManager from '../../modules/SearchManager';


export default class HomePage extends Component{

  render(){
    return(
      <div>
        <SearchInput {...this.props} />
      </div>
    )
  }
}