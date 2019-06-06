import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import {
  LOAD_AUTHORS_SUCCESS, IS_FETCHING,
} from '../../../actionTypes';
import * as AuthorActions from '../../../redux/actions/AuthorActions';
import * as CourseActions from '../../../redux/actions/CourseActions';
import AuthorReducer from '../../../redux/reducers/AuthorReducer';
import initialState from '../../../redux/reducers/initialState';
import { authors } from '../../../../tools/mockData';

// Configure Store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const actions = [
  {
    type: LOAD_AUTHORS_SUCCESS,
    action: AuthorActions.loadAuthorsSuccess,
    expected: false,
  },
  {
    type: IS_FETCHING,
    action: CourseActions.isFetching,
    expected: true,
  },
];

describe('Author Actions', () => {
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
      body: authors,
      headers: { 'content-type': 'application/json' },
    });

    const ExpectedActions = [
      { type: IS_FETCHING },
      {
        type: LOAD_AUTHORS_SUCCESS,
        payload: authors,
      },
    ];

    const store = mockStore(initialState);
    return store.dispatch(AuthorActions.loadAuthors()).then(() => {
      expect(store.getActions()).toEqual(ExpectedActions);
    });
  });
});

describe('Author Reducer', () => {
  actions.map(action => it(`should set ${action.type}`, () => {
    expect(AuthorReducer(initialState.authors, action).loading).toEqual(action.expected);
  }));
  it('should provide an initial state', () => {
    expect(AuthorReducer(initialState.authors, {})).toEqual(initialState.authors);
  });
});
