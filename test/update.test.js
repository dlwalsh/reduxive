/* eslint import/no-extraneous-dependencies: "off" */

const test = require('tape');
const update = require('../lib/update.js').default;

test('simple update', ({ deepEqual, end }) => {
  const reducer = update({
    a: 2,
  });

  deepEqual(reducer({ a: 1 }), { a: 2 }, 'state overwritten correctly');
  deepEqual(reducer({ a: 1, b: 1 }), { a: 2, b: 1 }, 'state updated correctly');
  end();
});

test('simple update', ({ deepEqual, end }) => {
  const reducer = update({
    a: x => x + 1,
  });

  deepEqual(reducer({ a: 1 }), { a: 2 }, 'state updated correctly');
  end();
});

test('nested update', ({ deepEqual, end }) => {
  const reducer = update({
    a: {
      b: x => x + 1,
    },
  });

  deepEqual(reducer({ a: { b: 1 } }), { a: { b: 2 } }, 'deep state updated correctly');
  end();
});
