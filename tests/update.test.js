/* eslint import/no-extraneous-dependencies: "off" */

import test from 'tape';
import update from '../src/update.js';

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
  const result = reducer({ a: 1 });

  deepEqual(result, { a: 2 }, 'state updated correctly');
  end();
});

test('nested update', ({ deepEqual, end }) => {
  const reducer = update({
    a: {
      b: x => x + 1,
    },
  });
  const result = reducer({ a: { b: 1 } });

  deepEqual(result, { a: { b: 2 } }, 'deep state updated correctly');
  end();
});

test('update from action', ({ deepEqual, end }) => {
  const reducer = update({
    a: (x, val) => val,
  });
  const result = reducer({ a: 0 }, 100);

  deepEqual(result, { a: 100 }, 'state updated from action');
  end();
});

test('update nested object from action', ({ deepEqual, end }) => {
  const reducer = update({
    a: (x, val) => x + val,
    b: {
      c: (x, val) => val,
    },
  });
  const result = reducer({
    a: 50,
    b: {
      c: 10,
    },
  }, 100);

  deepEqual(result, { a: 150, b: { c: 100 } }, 'nested state updated from action');
  end();
});
