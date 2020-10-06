import { observable, action } from 'mobx';
import API from './API'

export default class baseClass {
    @observable org;
    @observable found_repos = [];
    @observable bookmarks = [];
    @observable loading_repos = false;
    @observable loading_bookmarks = false;

    @action searchRepos = () => {
        this.loading_repos = true;

        API.fetch_repos(this.org).then(data => {
            if (data && data.length) {
                const ids = {}
                this.bookmarks.forEach(el => ids[el.id] = el._id)
                this.found_repos = data.map(el => {
                    if (ids[el.id.toString()]) {
                        el._id = ids[el.id.toString()]
                        el.added = true;
                    }
                    return el;
                })
            }
            else {
                this.found_repos = []
            }
            this.loading_repos = false;
        }).catch(err => {
            this.loading_repos = false;
        })
    }

    @action
    handleChange = (event) => {
        this.org = event.target.value;
    }

    @action
    searchBookmarks = () => {
        this.loading_bookmarks = true;
        const that = this
        return API.find_bookmarks().then(data => {
            that.loading_bookmarks = false
            this.bookmarks = data;
            return Promise.resolve()
        }).catch(err => {
            this.loading_bookmarks = false;
            return Promise.reject()
        })
    }

    @action
    addBookmark = (data) => {
        API.add_bookmark(data).then(data => {
            this.found_repos = this.found_repos.map(el => {
                if (el.id == data.id) {
                    el.added = true
                    el._id = data._id
                }
                return el
            })
        })
    }

    @action
    removeBookmark = (_id) => {
        API.delete_bookmark(_id).then(() => {
            this.found_repos = this.found_repos.map(el => {
                if (el._id == _id) {
                    el.added = false;
                }
                return el;
            })
        })

    }

    @action
    remove_bookmark = (id) => {
        this.loading_bookmarks = true

        return API.delete_bookmark(id).then(() => {
            this.loading_bookmarks = false
            this.bookmarks = this.bookmarks.filter(el => el._id !== id)
            return Promise.resolve()
        }).catch(err => {
            this.loading_bookmarks = false
        })

    }

}
