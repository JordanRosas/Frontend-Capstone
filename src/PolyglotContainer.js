import React, { Component } from 'react'
import ApplicationViews from './ApplicationViews'
import NavBar from './components/nav/NavBar'
import SearchManager from './modules/SearchManager'

export default class PolyglotContainer extends Component{

  searchAllData = (searchQuery) =>{
    let SearchResults = 0
    return SearchManager.searchUserLanguages(searchQuery)
    .then(response => SearchResults = response.id)
    .then(() => this.setState(SearchResults))
    .then(() => {
      console.log(SearchResults)
    })
  }
  render(){
    return(
      <>
        <NavBar searchAllData={this.searchAllData}/>
        <ApplicationViews />
      </>
    )
  }
}