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
        return this._sendRequest(`${this._url}/cards`, {
            method: 'GET',
            // headers: this._headers
            // credentials: 'include',
        })
    }

    createCardInServ(data) {
        return this._sendRequest(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            // credentials: 'include',
            body: JSON.stringify(data)
        })
    }

    deleteCard(id) {
        return this._sendRequest(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            // credentials: 'include',
            headers: this._headers
        })
    }

    getInfo() {
        return this._sendRequest(`${this._url}/users/me`, {
            method: 'GET',
            // credentials: 'include',
            headers: this._headers
        })
    }

    saveInfoInServ(info) {
        return this._sendRequest(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            // credentials: 'include',
            body: JSON.stringify({
                name: info.name,
                about: info.about
            })
        })
    }

    saveAvatarInServ(info) {
        return this._sendRequest(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            // credentials: 'include',
            body: JSON.stringify({
                avatar: info.avatar
            })
        })
    }

    changeLikeStatus(cardId, isLiked) {
        const method = isLiked ? 'PUT' : 'DELETE';
        const url = `${this._url}/cards/${cardId}/likes`;

        return fetch(url, {
            method: method,
            // credentials: 'include',
            headers: this._headers,
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
        // authorization: '201e26a5-d782-4c58-9b61-1aee30a7887d',
        "Content-Type": "application/json"
    }
})

export default api;