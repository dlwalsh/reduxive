import { mapValues } from 'lodash/fp';

function defineReducerFactory(defaultState, handlers = {}) {
  return (preloadState) => {
    const initialState = Object.assign({}, defaultState, preloadState);
    return mapValues(handler => (
      (state = initialState, ...args) => handler(state, ...args)
    ))(handlers);
  };
}

export default defineReducerFactory;
