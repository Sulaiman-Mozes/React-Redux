import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import {
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  LOAD_COURSES_SUCCESS,
  IS_FETCHING,
  DELETE_COURSE_OPTIMISTIC,
} from '../../../actionTypes';
import * as CourseActions from '../../../redux/actions/CourseActions';
import CourseReducer from '../../../redux/reducers/CourseReducer';
import initialState from '../../../redux/reducers/initialState';
import { courses, newCourse } from '../../../../tools/mockData';

// Configure Store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const actions = [
  {
    type: IS_FETCHING,
    action: CourseActions.isFetching,
    expected: true,
  },
  {
    type: CREATE_COURSE_SUCCESS,
    action: CourseActions.createCourseSuccess,
    expected: false,
  },
  {
    type: LOAD_COURSES_SUCCESS,
    action: CourseActions.loadCoursesSuccess,
    expected: false,
  },
  {
    type: UPDATE_COURSE_SUCCESS,
    action: CourseActions.updateCourseSuccess,
    expected: false,
  },
  {
    type: DELETE_COURSE_OPTIMISTIC,
    action: CourseActions.deleteCourseOptimistic,
    expected: false,
  },
];

describe('Course Actions', () => {
  actions.map(actionType => it(`should dispatch ${actionType.type}`, () => {
    expect(actionType.action({}).type).toEqual(actionType.type);
  }));
});

describe('Test Async Actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Test Load Course Thunk', () => {
    fetchMock.mock('*', {
      body: courses,
      headers: { 'content-type': 'application/json' },
    });

    const ExpectedActions = [
      { type: IS_FETCHING },
      {
        type: LOAD_COURSES_SUCCESS,
        payload: courses,
      },
    ];

    const store = mockStore(initialState);
    return store.dispatch(CourseActions.loadCourses()).then(() => {
      expect(store.getActions()).toEqual(ExpectedActions);
    });
  });

  it('Test Update Course Thunk', () => {
    fetchMock.mock('*', {
      body: courses[0],
      headers: { 'content-type': 'application/json' },
    });

    const ExpectedActions = [
      {
        type: CREATE_COURSE_SUCCESS,
        payload: courses[0],
      },
    ];

    const store = mockStore(initialState);
    return store.dispatch(CourseActions.saveCourse(newCourse)).then(() => {
      expect(store.getActions()).toEqual(ExpectedActions);
    });
  });

  it('Test Save Course Thunk', () => {
    fetchMock.mock('*', {
      body: courses[0],
      headers: { 'content-type': 'application/json' },
    });

    const ExpectedActions = [
      {
        type: UPDATE_COURSE_SUCCESS,
        payload: courses[0],
      },
    ];

    const store = mockStore(initialState);
    return store.dispatch(CourseActions.saveCourse(courses[0])).then(() => {
      expect(store.getActions()).toEqual(ExpectedActions);
    });
  });

  it('Test Delete Course Thunk', () => {
    fetchMock.mock('*', {
      body: courses[0],
      headers: { 'content-type': 'application/json' },
    });

    const ExpectedActions = [
      {
        type: DELETE_COURSE_OPTIMISTIC,
        payload: courses[0],
      },
    ];

    const store = mockStore(initialState);
    return store.dispatch(CourseActions.deleteCourse(courses[0])).then(() => {
      expect(store.getActions()).toEqual(ExpectedActions);
    });
  });
});

describe('Course Reducer', () => {
  actions.map(action => it(`should set ${action.type}`, () => {
    expect(CourseReducer(initialState.courses, action).loading).toEqual(action.expected);
  }));
  it('should provide an initial state', () => {
    expect(CourseReducer(initialState.courses, {})).toEqual(initialState.courses);
  });
});
