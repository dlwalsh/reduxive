import { mapValues } from 'lodash/fp';
import update from './update.js';

const mapValuesWithKey = mapValues.convert({ cap: false });

function updateIn(updates = {}) {
  return update(updates);
}

export default updateIn;
