import React, { Component } from 'react'

export default class SearchResults extends Component{

  
  render(){
    return(
      <React.Fragment>
        <div>
          {
            this.props.languages.map(language => {
              return <h1 key={language.id}>{language.username}</h1>
            })
          }
        </div>
      </React.Fragment>
    )
  }
}


