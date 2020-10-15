import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { observer } from 'mobx-react';

class SearchResults extends Component {
    componentDidMount() {
        this.props.store.searchBookmarks()
    }

    render() {
        const store = this.props.store;

        return store.loading_repos ? <div className="spin-wrap"><div className="spinner" /></div> :

            <div className="main"> {store.found_repos.length ? store.found_repos.map(el =>
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
                </div>) : <div>No repos found</div>
            }
            </div>
    }
}

export default observer(SearchResults);