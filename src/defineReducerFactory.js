import { isEmpty, mapKeys } from 'lodash/fp';

function defineReducerFactory(defaultState, handlerDefs) {
  return (preloadState, handlerMappings = {}) => {
    const initialState = Object.assign({}, defaultState, preloadState);

    return (state = initialState, action = {}) => {
      const handlers = mapKeys(key => handlerMappings[key], handlerDefs);

      if (action.type && hasOwnProperty.call(handlers, action.type)) {
        const result = handlers[action.type](state, action);
        if (!isEmpty(result)) {
          return Object.assign({}, state, result);
        }
      }
      return state;
    };
  };
}

export default defineReducerFactory;
