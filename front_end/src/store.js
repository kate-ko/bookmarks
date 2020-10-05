import { observable, action } from 'mobx';
import { fetch_repos, find_bookmarks } from './API'
import { add_bookmark, delete_bookmark } from './API'

export default class baseClass {
    constructor() {
        this.searchRepos = this.searchRepos.bind(this);
    }

    @observable org;
    @observable t;
    @observable found_repos = [];
    @observable bookmarks = [];
    @observable loading_repos = false;
    @observable loading_bookmarks = false;

    @action searchRepos() {
        console.log('search repos')
        this.loading_repos = true;
        this.t = 'fff'
        this.found_repos = [{name: 'a'}]
        //this.loading_repos = false;

        /* fetch_repos(this.org).then(data => {
            console.log('in then', data)
            that.found_repos = data ? data : [];
            that.loading_repos = false;
            //return Promise.resolve()
        }).catch(err => {
            that.loading_repos = false;
            //return Promise.reject()
        }) */
    }

    @action
    handleChange = (event) => {
        this.loading_repos = 999999;
        this.org = event.target.value;
    }

    @action
    searchBookmarks = () => {
        this.loading_bookmarks = true;
        const that = this
        return find_bookmarks().then(data => {
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
        add_bookmark(data).then(() => {
            this.found_repos = this.found_repos.map(el => {
                if (el.id === data.id) el.added = true
                return el
            })
        })
    }

    @action
    remove_bookmark = (id) => {
        this.loading_bookmarks = true

        return delete_bookmark(id).then(() => {
            this.loading_bookmarks = false
            this.bookmarks = this.bookmarks.filter(el => el._id !== id)
            return Promise.resolve()
        }).catch(err => {
            this.loading_bookmarks = false
        })
    }

}
