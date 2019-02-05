import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SearchManager from '../../modules/SearchManager'

class SearchInput extends Component{
  handleFieldChange = evt => {
    evt.preventDefault()
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    console.log(stateToChange)
  }
  handleSearch = evt => {
    let resId=0
    evt.preventDefault()
    this.props.searchAllData(this.state.searchQuery)
    .then(allResponses => {
      allResponses.forEach(language => {
      resId = allResponses.id
    })})
      
  }
  render(){
    return(
      <>
      <form className="searchForm" onSubmit={this.handleSearch}>

        <input 
            type="text" required
            className="form-control"
            onChange={this.handleFieldChange}
            id="searchQuery"

            />
      </form>
    </>
    )
  }
}
export default withRouter(SearchInput)