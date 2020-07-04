const global = require('glob-all');

// eslint-disable-next-line no-undef
describe('Checking generated html files', () => {
  // eslint-disable-next-line no-undef
  it('should generate html files', (done) => {
    const files = global.sync([
      './dist/index.html',
      './dist/search.html',
    ]);
    if (files.length > 0) {
      done();
    } else {
      throw new Error('no html files generated');
    }
  });
});
