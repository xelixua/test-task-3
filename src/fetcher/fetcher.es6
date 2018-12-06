'use strict';
require('babel-polyfill');

import fetch from 'node-fetch';

/**
 * Fetches raw feed data from API
 */
export default class Fetcher {

  /**
   * Creates new Fetcher object
   * @param config application configuration
   */
  constructor (config) {
    this._config = config;
  }

  get content() {
    return this._content;
  }

  /**
   * Fetchers feed data from API
   */
  async init() {
    const response = await this._fetch();
    this._content = await response.text();
  }

  _fetch() {
    const options = {
      method: 'GET',
      headers: { 
        'Content-Type': 'text/plain'
      }
    };

    return fetch(`https://${this._config.apiUrl}`, options);
  }
}