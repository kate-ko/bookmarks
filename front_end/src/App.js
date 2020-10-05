import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Bookmarks from './Bookmarks'
import SearchResults from './SearchResults'
import Navbar from './Navbar'
import './style.css'
import { add_bookmark } from './API'

import 'bootstrap/dist/css/bootstrap.css';

import { fetch_repos, find_bookmarks } from './API'
import BookmarkStore from './store.js'

export default class extends Component {
  state = {
    org: '',
    found_repos: [],
    bookmarks: [],
    loading_repos: false
  }

  handleChange = (event) => {
    this.setState({ org: event.target.value });
  }

  searchRepos = () => {
    this.setState({ loading_repos: true })
    fetch_repos(this.state.org).then(data => {
      this.setState({ found_repos: data || [], loading_repos: false });
    })
      .catch(err => {
        this.setState({ loading_repos: false })
      })
  }

  searchBookmarks = () => {
    return find_bookmarks().then(data => {
      this.setState({ bookmarks: data })
    })
  }

  addBookmark = (data) => {
    add_bookmark(data).then(() => {
      const found_repos = this.state.found_repos.map(el => {
        if (el.id === data.id) el.added = true
        return el
      })
      this.setState({found_repos})
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar store={BookmarkStore} org={this.state.org} handleChange={this.handleChange} searchRepos={this.searchRepos} />

          <Switch>
            <Route path="/bookmarks">
              <Bookmarks bookmarks={this.state.bookmarks} searchBookmarks={this.searchBookmarks} />
            </Route>

            <Route path="/search">
              <SearchResults 
                found_repos={this.state.found_repos}
                searchBookmarks={this.searchBookmarks}
                loading_repos={this.state.loading_repos}
                bookmarks={this.state.bookmarks} />
            </Route>

            <Route exact path="/">
              <Redirect to="/bookmarks" />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

