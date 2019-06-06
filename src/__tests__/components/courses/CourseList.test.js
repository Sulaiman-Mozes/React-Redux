import React from 'react';
import { shallow } from 'enzyme';
import CourseList from '../../../components/courses/CourseList';
import { courses, authors } from '../../../../tools/mockData';


describe('CourseList Component', () => {
  it('should render the CourseList Component', () => {
    const props = {
      courses: courses.map(course => ({
        ...course,
        authorName: authors.find(a => a.id === course.authorId).name,
      })),
      onDelete: jest.fn(),
    };
    const wrapper = shallow(<CourseList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
