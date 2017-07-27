import update from './update.js';

function updateIn(path, value) {
  if (typeof path !== 'string' || path === '') {
    throw new Error('updateIn: path must be a non-empty string');
  }

  const keyList = path.split('.');
  const obj = keyList.reduceRight((memo, key) => ({
    [key]: memo,
  }), value);

  return update(obj, value);
}

export default updateIn;
