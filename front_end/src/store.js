import { makeObservable, makeAutoObservable, action, observable } from "mobx"
import API from './API'

class BaseClass {
    org = ""
    found_repos = [];
    bookmarks = [];
    loading_repos = false;
    loading_bookmarks = false;

    constructor() {
        makeAutoObservable(this)
    }

    searchRepos = () => {
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

    handleChange = (event) => {
        this.org = event.target.value;
    }

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

    removeBookmarkRepos = (_id) => {
        API.delete_bookmark(_id).then(() => {
            this.found_repos = this.found_repos.map(el => {
                if (el._id == _id) {
                    el.added = false;
                }
                return el;
            })
        })
    }

    removeBookmark = (id) => {
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

export default new BaseClass();