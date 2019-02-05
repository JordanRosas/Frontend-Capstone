import React, { Component } from 'react'

export default class SearchResults extends Component{

  
  render(){

    return(
      <React.Fragment>
        <section>
          {
            this.props.users.map(user =>(
              <article key={user.id}>
                <p>Users: {user.username}</p>
                {/* need to compare the users languageId to the languages id in the database if they match we return the users 
                language not the language id */}
                <p>Language: {
                  this.props.languages.map(allLang => {
                    if(user.languageId === allLang.id){
                      return allLang.language
                    }
                  })
                }
                </p>
              </article>
              
              
              ))
            }
        </section>
      </React.Fragment>
    )
  }
}