import React from 'react';
import { mount } from 'enzyme';
import { ManageCoursesPage } from '../../../components/courses/ManageCoursePage';
import { authors, courses } from '../../../../tools/mockData';


describe('Test Form Component', () => {
  const render = (args) => {
    const defaultProps = {
      courses: authors,
      authors: courses,
      history: {},
      addCourse: () => ({
        then: () => ({ catch: () => { } }),
      }),
      getCourses: jest.fn(),
      getAuthors: jest.fn(),
      course: {
        id: null,
        title: '',
        authorId: null,
        category: '',
      },
      authorLoading: false,
      courseLoading: false,
    };

    const props = { ...defaultProps, ...args };
    return mount(<ManageCoursesPage {...props} />);
  };

  it('Should Render Correctly', () => {
    expect(render()).toMatchSnapshot();
  });

  it('Sets an error on atttempting to submit an empty from', () => {
    const wrapper = render();
    wrapper.find('form').simulate('submit');
    const error = wrapper.find('.alert').first();
    expect(error.text()).toBe('Title is required.');
  });

  it('Should Render Spinner When Loading', () => {
    const args = {
      courses: [],
      authors: [],
      authorLoading: true,
      courseLoading: true,
    };
    expect(render(args).find('Spinner')).toHaveLength(1);
  });
});
