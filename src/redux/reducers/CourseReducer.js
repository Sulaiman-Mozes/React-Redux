import {
  CREATE_COURSE_SUCCESS, LOAD_COURSES_SUCCESS,
  UPDATE_COURSE_SUCCESS, IS_FETCHING, DELETE_COURSE_OPTIMISTIC,
} from '../../actionTypes';
import initialState from './initialState';


const courseReducer = (state = initialState.courses, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        list: [
          ...state.list,
          action.payload,
        ],
        loading: false,
      };
    case LOAD_COURSES_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        list: state.list.map(course => (
          course.id === action.payload.id ? action.payload : course
        )),
        loading: false,
      };
    case DELETE_COURSE_OPTIMISTIC:
      return {
        ...state,
        list: state.list.filter(course => course.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default courseReducer;
