import { isEmpty } from 'lodash/fp';

function createReducer(defaultState, handlers) {
  return (prevState = {}, action) => {
    const state = Object.keys(prevState) < Object.keys(defaultState)
      ? Object.assign({}, defaultState, prevState)
      : prevState;

    if (hasOwnProperty.call(handlers, action.type)) {
      const result = handlers[action.type](state, action);
      if (isEmpty(result)) {
        return Object.assign({}, state, result);
      }
    }
    return state;
  };
}

export default createReducer;
