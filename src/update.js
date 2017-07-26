import { mapValues, isPlainObject } from 'lodash/fp';

const mapValuesWithKey = mapValues.convert({ cap: false });

function update(delta = {}) {
  return (state) => {
    const newState = mapValuesWithKey((value, key) => {
      if (isPlainObject(value)) {
        return update(value)(state[key]);
      }
      if (typeof value === 'function') {
        return value(state[key]);
      }
      return value;
    })(delta);

    return Object.assign({}, state, newState);
  };
}

export default update;
