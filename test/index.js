const test = require('./test');
const assert = require('assert');

(async () => {

  await test('first test', () => {
    assert.ok(true);
  });

})();