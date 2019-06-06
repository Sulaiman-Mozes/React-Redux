import {
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  LOAD_COURSES_SUCCESS,
  IS_FETCHING,
  DELETE_COURSE_OPTIMISTIC,
} from '../../actionTypes';
import * as courseApi from '../../api/courseApi';

export const createCourseSuccess = payload => ({
  type: CREATE_COURSE_SUCCESS,
  payload,
});

export const updateCourseSuccess = payload => ({
  type: UPDATE_COURSE_SUCCESS,
  payload,
});

export const isFetching = () => ({
  type: IS_FETCHING,
});

export const loadCoursesSuccess = payload => ({
  type: LOAD_COURSES_SUCCESS,
  payload,
});

export const deleteCourseOptimistic = payload => ({
  type: DELETE_COURSE_OPTIMISTIC,
  payload,
});

export const loadCourses = () => (dispatch) => {
  dispatch(isFetching());
  return courseApi
    .getCourses()
    .then(courses => dispatch(loadCoursesSuccess(courses)))
    .catch((err) => {
      throw err;
    });
};

export const saveCourse = course => dispatch => courseApi
  .saveCourse(course)
  .then(savedCourse => (course.id
    ? dispatch(updateCourseSuccess(savedCourse))
    : dispatch(createCourseSuccess(savedCourse))))
  .catch((err) => {
    throw err;
  });


export const deleteCourse = course => (dispatch) => {
  dispatch(deleteCourseOptimistic(course));
  return courseApi.deleteCourse(course.id);
};
