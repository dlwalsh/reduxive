/* eslint import/no-extraneous-dependencies: "off" */

import test from 'tape';
import updateIn from '../src/updateIn.js';

test('simple updateIn', ({ deepEqual, end }) => {
  const reducer = updateIn('a', 2);
  const result = reducer({ a: 1 });

  deepEqual(result, { a: 2 }, 'state overwritten correctly');
  end();
});

test('nested updateIn', ({ deepEqual, end }) => {
  const reducer = updateIn('a.b', 2);
  const result = reducer({ a: { b: 1 } });

  deepEqual(result, { a: { b: 2 } }, 'nested state updated correctly');
  end();
});

test('doubly nested updateIn', ({ deepEqual, end }) => {
  const reducer = updateIn('a.b.c', 2);
  const result = reducer({ a: { b: { c: 1 } } });

  deepEqual(result, { a: { b: { c: 2 } } }, 'nested state updated correctly');
  end();
});
