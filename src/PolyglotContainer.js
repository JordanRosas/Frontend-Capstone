import React, { Component } from 'react'
import ApplicationViews from './ApplicationViews'
import NavBar from './components/nav/NavBar'
import SearchManager from './modules/SearchManager'

export default class PolyglotContainer extends Component{
  state = {
    userLanguages:[]
  }
  searchAllData = (searchQuery) =>{
    // const SearchResults = {}
    return SearchManager.searchUserLanguages(searchQuery)
    //grabbing the language object being searched
    .then(response =>  console.log(SearchManager.searchUsers(response.id)))
    .then(response  => this.setState({languages:response}))
  }
  render(){
    return(
      <>
        <NavBar searchAllData={this.searchAllData}/>
        <ApplicationViews 
          searchAllData={this.searchAllData} 
          languages={this.state.languages} />
      </>
    )
  }
}