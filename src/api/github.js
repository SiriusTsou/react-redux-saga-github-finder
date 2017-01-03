// 這邊引入了 fetch 的 polyfill，考以讓舊的瀏覽器也可以使用 fetch
import 'whatwg-fetch';

import apiInterface from './apiInterface';

export default class Github extends apiInterface {
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  parseJSON(response) {
    return response.json();
  }

  fetchAPI(url, options) {
    return fetch(url, options)
            .then(this.checkStatus)
            .then(this.parseJSON);
  }

  getUserData(userId) {
    return this.fetchAPI('https://api.github.com/users/' + userId, {
      headers: {},
      method: 'GET',
    });
  }
}
