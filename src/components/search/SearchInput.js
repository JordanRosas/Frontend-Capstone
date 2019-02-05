import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class SearchInput extends Component{
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    console.log(stateToChange)
  }
  handleSearch = evt => {
    evt.preventDefault()
    console.log("Searched")
    this.props.searchAllData(this.state.searchQuery)
    .then(() => this.props.history.push("/home"))  
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