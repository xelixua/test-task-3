import Parser from './parser';
import should from 'should';
import fs from 'fs';
import deepEqual from 'deep-equal';

let xmlSample;
let jsonSample;
const parser = new Parser();

/**
 * Parser
 */
describe('Parser', () => {

  beforeAll(async () => {
    xmlSample = fs.readFileSync('./src/parser/sampleData.xml', 'utf8');
    jsonSample = fs.readFileSync('./src/parser/sampleData.json', 'utf8');
    jsonSample = JSON.parse(jsonSample);

    await parser.init(xmlSample);
  });

  /**
   * Parser#getPosts
   */
  it('should return all posts', () => {
    const posts = parser.getPosts();
    should(posts.length).be.exactly(3);
    const sample = jsonSample.map(post => post.news[0].title[0]);    
    should(deepEqual(posts, sample)).be.exactly(true);
  });

  /**
   * Parser#getPostById
   */
  it('should return post by id', () => {
    const post = parser.getPostById(1);
    const sample = jsonSample[1].news[0].title[0];    
    should(deepEqual(post, sample)).be.exactly(true);
  });

  /**
   * Parser#getPostById
   */  
  it('should return nothing if id is incorrect', () => {
    const post = parser.getPostById(121);
    should(typeof post === 'undefined').be.exactly(true);
  });

  /**
   * Parser#getPostsByKeyword
   */
  it('should return posts by keyword', () => {
    const posts = parser.getPostsByKeyword('Краснодар');
    should(posts.length).be.exactly(1);
    const post = posts[0];
    const sample = jsonSample[2].news[0].title[0];
    should(deepEqual(post, sample)).be.exactly(true);
  });
});