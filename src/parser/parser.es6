'use strict';
require('babel-polyfill');

import xml2js from 'node-xml2js-promise';

/**
 * Parses feed data to JS object
 */
export default class Parser {

  /**
   * Parses XML and builds keyword map
   * @param rawFeedData raw feed data
   */
  async init(rawFeedData) {
    const feed = await this._parseXML(rawFeedData);
    this._feed = feed.urlset.url;
    this._keywords = this._parseKeywords(feed);
  }
  
  _parseXML(rawFeedData) {
    return xml2js(rawFeedData);
  }

  _parseKeywords() {
    const result = {};
    this._feed.forEach((post, index) => {
      const keywords = post.news[0].keywords[0].split(',');
      keywords.forEach(originalKeyword => {
        const keyword = originalKeyword.trim().toLowerCase();
        result[keyword] = result[keyword] || [];
        result[keyword].push(index);
      });
    });

    return result;
  }

  /**
   * Returns messages from feed
   * @return returns posts titles
   */
  getPosts() {
    const posts = this._feed.map(post => post.news[0].title[0]);

    return posts;
  }

  /**
   * Returns post by id
   * @param id of post
   * @returns post title
   */
  getPostById(id) {
    if (id >= this._feed.length || id < 0) return;
    const title = this._feed[id].news[0].title[0];

    return title;
  }

  /**
   * Returns posts by keyword
   * @param originalKeyword keyword to query posts
   * @returns returns posts titles containing keyword
   */
  getPostsByKeyword(originalKeyword) {
    const keyword = originalKeyword.toLowerCase();
    const postIds = this._keywords[keyword];
    if (!postIds) {
      return;
    }
    const posts = postIds.map(id => this._feed[id].news[0].title[0]);

    return posts;
  }
}