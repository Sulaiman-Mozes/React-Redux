import { createStore } from 'redux';
import rootreducer from '../../../redux/reducers';
import * as CourseActions from '../../../redux/actions/CourseActions';
import initialState from '../../../redux/reducers/initialState';
import { newCourse } from '../../../../tools/mockData';

it('Should handle creating stores', () => {
  const store = createStore(rootreducer, initialState);

  store.dispatch(CourseActions.createCourseSuccess(newCourse));

  const createdCourse = store.getState().courses.list[0];
  expect(createdCourse).toEqual(newCourse);
});
