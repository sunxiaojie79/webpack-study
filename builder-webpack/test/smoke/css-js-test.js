const global = require('glob-all');

// eslint-disable-next-line no-undef
describe('Checking generated css js files', () => {
  // eslint-disable-next-line no-undef
  it('should generate css js files', (done) => {
    const files = global.sync([
      './dist/index_*.js',
      './dist/index_*.css',
      './dist/search_*.js',
      './dist/search_*.css',
    ]);
    if (files.length > 0) {
      done();
    } else {
      throw new Error('no css js files generated');
    }
  });
});
