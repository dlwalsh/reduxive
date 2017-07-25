import { mapValues } from 'lodash/fp';

const mapValuesWithKey = mapValues.convert({ cap: false });

function update(delta = {}) {
  return (state) => {
    const newState = mapValuesWithKey((value, key) => (
      typeof value === 'function' ? value(state[key]) : value
    ))(delta);

    return Object.assign({}, state, newState);
  };
}

export default update;
