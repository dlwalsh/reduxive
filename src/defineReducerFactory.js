import { isEmpty } from 'lodash/fp';

function defineReducerFactory(defaultState, createHandlers) {
  return (preloadState, handlerMappings = {}) => {
    const initialState = Object.assign({}, defaultState, preloadState);

    return (state = initialState, action = {}) => {
      const handlers = createHandlers(handlerMappings);

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
