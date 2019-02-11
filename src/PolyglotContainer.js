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
    //console logging the searched language obj
    .then(response =>  SearchManager.searchUsers(response[0].id))
    // .then(response => console.log(response))
    .then(response  => this.setState({userLanguages:response}))
    // .then(console.log(this.state.userLanguages))
  }

  render(){
    return(
      <>
        <NavBar searchAllData={this.searchAllData}/>
        <ApplicationViews 
          searchAllData={this.searchAllData} 
          userLanguages={this.state.userLanguages} />
      </>
    )
  }
}