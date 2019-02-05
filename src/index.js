import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import PolyglotContainer from './PolyglotContainer'



ReactDOM.render(
    <Router>
        <PolyglotContainer />
    </Router>
    , document.getElementById('root'))