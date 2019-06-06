import { LOAD_AUTHORS_SUCCESS, IS_FETCHING } from '../../actionTypes';
import initialState from './initialState';

const authourReducer = (state = initialState.authors, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case LOAD_AUTHORS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default authourReducer;
