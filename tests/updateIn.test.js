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

test('functional updateIn', ({ deepEqual, end }) => {
  const reducer = updateIn('a.b.c', x => x * 2);
  const result = reducer({ a: { b: { c: 2 } } });

  deepEqual(result, { a: { b: { c: 4 } } }, 'nested state updated correctly');
  end();
});

test('functional updateIn with action', ({ deepEqual, end }) => {
  const reducer = updateIn('a.b.c', (x, action) => action.value);
  const result = reducer({ a: { b: { c: 1 } } }, { value: 100 });

  deepEqual(result, { a: { b: { c: 100 } } }, 'nested state updated correctly');
  end();
});

test('error handling', ({ throws, end }) => {
  const errorMessage = 'updateIn: path must be a non-empty string';

  throws(() => updateIn(), errorMessage, 'missing path');
  throws(() => updateIn(''), errorMessage, 'empty string as path');
  throws(() => updateIn(2), errorMessage, 'number as path');
  throws(() => updateIn({}), errorMessage, 'object as path');
  end();
});
