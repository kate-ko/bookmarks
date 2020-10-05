import { observable, action, toJS } from 'mobx';
import { fetch_repos, find_bookmarks } from './API'
import { add_bookmark } from './API'

class baseClass {
    @observable org = {};
    @observable found_repos = []
    @observable bookmarks = []
    @observable loading_repos = false;

    handleChange = (event) => {
        this.org = event.target.value;
    }

    searchRepos = () => {
        this.loading_repos = true;

        fetch_repos(this.org).then(data => {
            this.found_repos = data || [];
            this.loading_repos = false;
        })
            .catch(err => {
                this.loading_repos = false;
            })
    }

    searchBookmarks = () => {
        return find_bookmarks().then(data => {
            this.bookmarks = data || []
        })
    }

    addBookmark = (data) => {
        add_bookmark(data).then(() => {
            this.found_repos = this.found_repos.map(el => {
                if (el.id === data.id) el.added = true
                return el
            })
        })
    }

}

export const BookmarkStore = new baseClass();