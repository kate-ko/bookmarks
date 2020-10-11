import React, { Component } from 'react';
import { observer } from 'mobx-react';

import {
    NavLink,
    Link
} from "react-router-dom";

@observer
class Navbar extends Component {
    search = () => {
        this.props.store.searchRepos()
    }

    render() {
        const store = this.props.store;

        return <nav className="navbar navbar-dark bg-dark">
            <ul className="nav">
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName='active' to="/bookmarks">My Bookmarks</NavLink>
                </li>
            </ul>

            <form className="form-inline">
                <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Type Github Organization" aria-label="Search"
                    value={store.org}
                    onChange={store.handleChange}
                />

                <Link to={{
                    pathname: `/search`
                }}>
                    <button className="btn btn-outline-light my-2 my-sm-0" type="submit" onClick={this.search}>Search Repos</button>
                </Link>
            </form>
        </nav >
    }
}

export default Navbar