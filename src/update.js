import { mapValues, isPlainObject } from 'lodash/fp';

const mapValuesWithKey = mapValues.convert({ cap: false });

function update(delta = {}) {
  return (state, action) => {
    const newState = mapValuesWithKey((value, key) => {
      if (isPlainObject(value)) {
        return update(value)(state[key], action);
      }
      if (typeof value === 'function') {
        return value(state[key], action);
      }
      return value;
    })(delta);

    return Object.assign({}, state, newState);
  };
}

export default update;
