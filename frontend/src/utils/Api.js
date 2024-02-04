class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _sendRequest(url, options) {
        return fetch(url, options)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }

                throw new Error('Что-то пошло не так...')
            })
    }

    getAllCards() {
        const token = localStorage.getItem("jwt");
        return this._sendRequest(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            // credentials: 'include'
        })
    }

    createCardInServ(data) {
        const token = localStorage.getItem("jwt");
        return this._sendRequest(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            // credentials: 'include',
            body: JSON.stringify(data)
        })
    }

    deleteCard(id) {
        const token = localStorage.getItem("jwt");
        return this._sendRequest(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            // credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
    }

    getInfo() {
        const token = localStorage.getItem("jwt");
        return this._sendRequest(`${this._url}/users/me`, {
            method: 'GET',
            // credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
    }

    saveInfoInServ(info) {
        const token = localStorage.getItem("jwt");
        return this._sendRequest(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            // credentials: 'include',
            body: JSON.stringify({
                name: info.name,
                about: info.about
            })
        })
    }

    saveAvatarInServ(info) {
        const token = localStorage.getItem("jwt");
        return this._sendRequest(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            // credentials: 'include',
            body: JSON.stringify({
                avatar: info.avatar
            })
        })
    }

    changeLikeStatus(cardId, isLiked) {
        const token = localStorage.getItem("jwt");
        const method = isLiked ? 'PUT' : 'DELETE';
        const url = `${this._url}/cards/${cardId}/likes`;

        return fetch(url, {
            method: method,
            // credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }

                throw new Error('Что-то пошло не так...')
            })
    }
}

const api = new Api({
    url: "https://api.mesto.rafael.nomoredomainsmonster.ru",
    // url: "https://localhost:3000",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default api;