const apiUrl = 'http://localhost:8080';

function fetch_repos(org) {
    return fetch(`${apiUrl}/search/${org}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then(res => res.data)
        .catch(err => console.log(err))
}

function find_bookmarks() {
    return fetch(`${apiUrl}/bookmarks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then(res => res.data)
        .catch(err => console.log(err))
}

function add_bookmark(data) {
    return fetch(`${apiUrl}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then(res => res.data)
        .catch(err => console.log(err))
}

function delete_bookmark(id) {
    return fetch(`${apiUrl}/bookmarks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then(res => res.data)
        .catch(err => console.log(err))
}

module.exports = { fetch_repos, find_bookmarks, add_bookmark, delete_bookmark }



