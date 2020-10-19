import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { observer } from 'mobx-react';

let timer = 0;

class SearchResults extends Component {
    componentDidMount() {
        this.props.store.searchBookmarks()
    }

    componentWillUnmount() {
        clearTimeout(timer);
        this.props.store.filter_value = ""
    }

    handleInput = (event) => {
        const store = this.props.store;
        store.filter_value = event.target.value;

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            store.filterSearchResults();
        }, 150);
    }

    render() {
        const store = this.props.store;

        return store.loading_repos ? <div className="spin-wrap"><div className="spinner" /></div> :


            store.found_repos && store.found_repos.length ? <div className="main">
                <div className="input-filter">
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Filter by name" aria-label="Search"
                        value={store.filter_value}
                        onChange={this.handleInput}
                    />
                </div>

                {store.filtered_repos.map(el =>
                    <div key={el.id} className="block">
                        <a target="_blank" rel="noopener noreferrer" href={el.html_url}>{el.name}</a>
                        {
                            el.added ? <FontAwesomeIcon
                                className="icon" title="remove"
                                icon={solidBookmark}
                                onClick={() => store.removeBookmarkRepos(el._id)} /> :
                                <FontAwesomeIcon className="icon" title="add" onClick={() => store.addBookmark(el)}
                                    icon={faBookmark}
                                />
                        }
                        <div className="desc">{el.description}</div>
                    </div>)}
            </div> : <div className="main"><div>No repos found</div></div>
    }
}

export default observer(SearchResults);