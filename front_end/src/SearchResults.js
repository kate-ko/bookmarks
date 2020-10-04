import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { add_bookmark } from './API'

export default class extends Component {
    render() {
        return <div className="main">
            {this.props.loading_repos ? <div className="spinner"></div> :

                this.props.found_repos.length ? this.props.found_repos.map(el =>
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