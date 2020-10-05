import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { add_bookmark } from './API'
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react';

@inject("store")

@observer
class SearchResults extends Component {
    render() {
        const store = this.props.store;
        console.log('store.loading_repos ', store.loading_repos )

        return <div className="main">
            {store.loading_repos ? <div className="spinner"></div> :

                store.found_repos.length ? store.found_repos.map(el =>
                    <div key={el._id}
                        className="block"
                    >
                        <a target="_blank" rel="noopener noreferrer" href={el.html_url}>{el.name}</a>
                        {
                            <FontAwesomeIcon onClick={() => add_bookmark(el)} icon={faBookmark} />}
                        <div className="desc">{el.description}</div>
                        <div>{el.id}</div>
                    </div>) : 'No repos found'
            }
        </div>
    }
}

export default SearchResults;