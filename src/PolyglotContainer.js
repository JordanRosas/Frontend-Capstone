import React, { Component } from 'react'
import ApplicationViews from './ApplicationViews'
import NavBar from './components/nav/NavBar'
import SearchManager from './modules/SearchManager'

export default class PolyglotContainer extends Component{
  state = {
    languages:[]
  }
  searchAllData = (searchQuery) =>{
    // const SearchResults = {}
    return SearchManager.searchUserLanguages(searchQuery)
    //grabbing the language object being searched
    .then(response =>  SearchManager.searchUsers(response[0].id))
    .then(response  => this.setState({languages:response}))
  }
  render(){
    return(
      <>
        <NavBar searchAllData={this.searchAllData}/>
        <ApplicationViews searchAllData={this.searchAllData} languages={this.state.languages} />
      </>
    )
  }
}