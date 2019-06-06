import { LOAD_AUTHORS_SUCCESS } from '../../actionTypes';
import * as authorApi from '../../api/authorApi';
import { isFetching } from './CourseActions';

export const loadAuthorsSuccess = payload => ({
  type: LOAD_AUTHORS_SUCCESS,
  payload,
});

export const loadAuthors = () => (dispatch) => {
  dispatch(isFetching());
  return authorApi
    .getAuthours()
    .then((authors) => {
      dispatch(loadAuthorsSuccess(authors));
    })
    .catch((err) => {
      throw err;
    });
};
