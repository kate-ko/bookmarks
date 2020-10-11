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
import 'bootstrap/dist/css/bootstrap.css';
import store from './store.js'
import { observer } from 'mobx-react';

@observer
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar  store={store}/>

          <Switch>
            <Route path="/bookmarks">
              <Bookmarks store={store}/>
            </Route>

            <Route path="/search">
              <SearchResults store={store} />
            </Route>

            <Route exact path="/">
              <Redirect store={store} to="/bookmarks"  />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App

