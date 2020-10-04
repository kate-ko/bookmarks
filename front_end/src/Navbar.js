import React, { Component } from 'react';

import {
    NavLink,
    Link
} from "react-router-dom";

export default class extends Component {
    render() {
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
                    value={this.props.org}
                    onChange={this.props.handleChange}
                />

                <Link to={{
                    pathname: `/search`
                }}>
                    <button className="btn btn-outline-light my-2 my-sm-0" type="submit" onClick={this.props.searchRepos}>Search Repos</button>
                </Link>
            </form>

        </nav >
    }
}