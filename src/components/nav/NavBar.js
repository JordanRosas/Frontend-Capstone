import React, { Component } from "react"
import { Link } from "react-router-dom"
import SearchInput from '../search/SearchInput'
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {

    endSessionStorage = () => {
        sessionStorage.clear()
    }
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/friends">Friends</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/messages">Messages</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link onClick={this.endSessionStorage} className="nav-link" to="/login">Sign out</Link>
                    </li>
                    <li>
                        <SearchInput {...this.props} />
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar