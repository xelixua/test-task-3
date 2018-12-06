import Fetcher from './fetcher';
import should from 'should';

const config = {
  apiUrl: 'tvzvezda.ru/export/test-task-1.xml'
};
const fetcher = new Fetcher(config);
/**
 * Fetcher
 */
describe('Fetcher', () => {
  beforeAll(async () => {
    await fetcher.init();
  });

  it('should retreive feed content on initialization', () => {
    should.exist(fetcher.content);
    should(typeof fetcher.content === 'string').be.exactly(true);
  });
});