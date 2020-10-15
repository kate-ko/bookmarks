import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react';

class Bookmarks extends Component {
    componentDidMount() {
        this.props.store.searchBookmarks()
    }

    render() {
        const store = this.props.store;

        return store.loading_bookmarks ? <div className="spin-wrap"><div className="spinner"/></div> :
            <div className="main">
                {store.bookmarks && store.bookmarks.length ?
                    store.bookmarks.map(el =>
                        <div key={el._id} className="block">
                            <a target="_blank" rel="noopener noreferrer" href={el.html_url}>{el.name}</a>
                            <FontAwesomeIcon onClick={() => store.removeBookmark(el._id)} icon={faTrash} />
                            <div className="desc">{el.description}</div>
                            <div className="org">{el.org}</div>
                        </div>) : 'No bookmarks added'}
            </div>
    }
}

export default observer(Bookmarks);