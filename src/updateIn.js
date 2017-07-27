import update from './update.js';

function updateIn(path, value) {
  const keyList = path.split('.');
  const obj = keyList.reduceRight((memo, key) => ({
    [key]: memo,
  }), value);

  return update(obj, value);
}

export default updateIn;
