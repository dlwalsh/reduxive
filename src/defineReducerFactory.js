import { mapValues } from 'lodash/fp';

function defineReducerFactory(defaultState, handlers = {}) {
  return (preloadState) => {
    const initialState = Object.assign({}, defaultState, preloadState);
    const handlerObj = mapValues(handler => (
      (state = initialState, ...args) => handler(state, ...args)
    ))(handlers);

    return Object.assign({}, handlerObj, {
      __getState(state = initialState) {
        return state;
      },
    });
  };
}

export default defineReducerFactory;
