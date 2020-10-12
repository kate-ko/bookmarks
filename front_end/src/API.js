const apiUrl = 'http://localhost:8080';

class APIclass {
    fetch_repos(org) {
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

    find_bookmarks() {
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

    add_bookmark(data) {
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

    delete_bookmark(id) {
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
}



module.exports = new APIclass