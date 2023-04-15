import { apiConfig } from './constants.js';

class Api {

  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleCorrectResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }


  async getUserInfo() {
    const response = await fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    });
    return this._handleCorrectResponse(response);
  }

  async getCardsList() {
    const response = await fetch(`${this._url}/cards`, {
      headers: this._headers,
      credentials: 'include',
    });
    return this._handleCorrectResponse(response);
  }

  async setUserInfo({ name, about }) {
    const response = await fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about
      }),
      credentials: 'include',
    });
    return this._handleCorrectResponse(response);
  }

  async addNewCard({ name, link }) {
    const response = await fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      }),
      credentials: 'include',
    });
    return this._handleCorrectResponse(response);
  }

  async deleteCard(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
      credentials: 'include',
    });
    return this._handleCorrectResponse(response);
  }

  async changeLikeCardStatus(cardId, isLiked) {
    let method;
    isLiked ? method = 'DELETE' : method = 'PUT';
    const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: method,
      credentials: 'include',
    });
    return this._handleCorrectResponse(response);
  }

  async editAvatar({ link }) {
    const response = await fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link
      }),
      credentials: 'include',
    });
    return this._handleCorrectResponse(response);
  }

}

export const api = new Api(apiConfig);