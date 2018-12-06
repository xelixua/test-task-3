import Fetcher from './fetcher/fetcher';
import Parser from './parser/parser';
import config from '../config';
import locs from '../constants/locs';

export default class Application {
  constructor() {
    this._fetcher = new Fetcher(config);
    this._parser = new Parser();
    this._params = this._parseParams();
  }

  /**
   * Initialized application and shows news
   */
  async start() {
    console.log(locs.processing);
    console.log();
    await this._fetcher.init();
    const rawFeedData = this._fetcher.content;
    await this._parser.init(rawFeedData);
    this._showPosts();
  }

  _parseParams() {
    const params = {};
    process.argv.forEach((param, index) => {
      if(index < 2) return;

      const paramArr = param.split('=');

      switch(paramArr[0]) {          
        case 'id':
          this._checkIfParamValid(paramArr);
          params.id = paramArr[1];
          
          break;
        case 'keyword':
          this._checkIfParamValid(paramArr);
          params.keyword = paramArr[1];

          break;
        default:
          params.all = true;
          
          break;
      }
    });

    return params;
  }

  _checkIfParamValid(paramArr) {
    if (paramArr.length === 1) {
      console.log(locs.paramsError);
      process.exit(-1);
    }
  }

  _showPosts() {
    const id = parseInt(this._params.id);
    const keyword = this._params.keyword;
    let posts;

    if (id) {
      const post = this._parser.getPostById(id);
      posts = [post];
    } else if (keyword) {
      posts = this._parser.getPostsByKeyword(keyword);
    } else {
      //showing all news by default
      posts = this._parser.getPosts();  
    }
    
    this._showSpecifiedPosts(posts); 
  }

  _showSpecifiedPosts(posts) {
    if (!posts || !posts.length || !posts[0]) {
      console.log(locs.noPosts.all);
      return;
    }

    console.log(`${locs.resultIs}:`);
    console.log();
    posts.forEach(title => {
      console.log(`- ${title}`);
    });
  }
}