import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { delete_bookmark } from './API'
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import { inject } from 'mobx-react';

@inject("store")

@observer
class Bookmarks extends Component {
    componentDidMount() {
        this.props.store.searchBookmarks()//.then(() => this.forceUpdate())
    }

    delete_bookmark = (id) => {
        this.props.store.remove_bookmark(id).then(() => this.forceUpdate())
    }

    render() {
        const store = this.props.store;

        return <div className="main">
            {store.loading_bookmarks ? <div className="spinner"></div> :
                store.bookmarks && store.bookmarks.length ? store.bookmarks.map(el =>
                    <div key={el._id} className="block">
                        <a target="_blank" rel="noopener noreferrer" href={el.html_url}>{el.name}</a>
                        <FontAwesomeIcon onClick={() => this.remove_bookmark(el._id)} icon={faTrash} />
                        <div className="desc">{el.description}</div>
                        <div className="org">{el.org}</div>
                    </div>) : 'No bookmarks added'
            }
        </div>
    }
}

export default Bookmarks;