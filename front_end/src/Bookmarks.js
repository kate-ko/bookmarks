import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { delete_bookmark } from './API'

export default class extends Component {
    state = { loading: false }

    componentDidMount() {
        this.props.searchBookmarks()
    }

    delete_bookmark = (id) => {
        this.setState({ loading: true })

        delete_bookmark(id).then(() => {
            this.setState({ loading: false })
            this.props.searchBookmarks()
        }).catch(err => {
            this.setState({ loading: false })
        })
    }

    render() {
        return <div className="main">
            {this.state.loading ? <div className="spinner"></div> :
                this.props.bookmarks.length ? this.props.bookmarks.map(el =>
                    <div key={el._id}
                        className="block"
                    >
                        <a target="_blank" rel="noopener noreferrer" href={el.html_url}>{el.name}</a>
                        <FontAwesomeIcon onClick={() => this.delete_bookmark(el._id)} icon={faTrash} />
                        <div className="desc">{el.description}</div>
                        <div className="org">{el.org}</div>
                    </div>) : 'No bookmarks added'
            }
        </div>
    }
}