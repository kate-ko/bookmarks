import React, { Component } from 'react';
import { observer } from 'mobx-react';

import {
    NavLink,
    Link
} from "react-router-dom";

import { inject } from 'mobx-react';

@inject("store")

@observer
class Navbar extends Component {
    search = () => {
        this.props.store.searchRepos()
    }

    render() {
        const store = this.props.store;
        console.log("nav", this.props.store.loading_repos, '0000', this.props.store.org)

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

                <button className="btn" onClick={this.search}>Search Repos</button>

                <Link to={{
                    pathname: `/search`
                }}>
                    <button className="btn btn-outline-light my-2 my-sm-0" type="submit" onClick={this.search}>Search Repos</button>
                </Link>
            </form>

            iiiiiiiiiiiii{store.loading_repos ? 'true' : 'false'}
        </nav >
    }
}

export default Navbar