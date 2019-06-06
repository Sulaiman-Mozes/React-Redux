import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import CourseForm from '../../../components/courses/CourseForm';
import { authors, courses } from '../../../../tools/mockData';


describe('Test Form Component', () => {
  const renderCourseForm = (args) => {
    const defaultProps = {
      course: {},
      authors: [],
      errors: {},
      onSave: jest.fn(),
      onChange: jest.fn(),
      saving: false,
    };

    const props = { ...defaultProps, ...args };
    return mount(<CourseForm {...props} />);
  };

  it("Sets Submit button to label 'saving...' when saving is true", () => {
    const tree = renderer.create(
      <CourseForm
        course={courses[0]}
        authors={authors}
        onSave={jest.fn()}
        onChange={jest.fn()}
        errors={{}}
        saving
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it("Sets Submit button label to 'save' when saving is false", () => {
    const tree = renderer.create(
      <CourseForm
        course={courses[0]}
        authors={authors}
        onSave={jest.fn()}
        onChange={jest.fn()}
        errors={{}}
        saving={false}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('Should render a form and header', () => {
    const wrapper = renderCourseForm();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h2').text()).toEqual('Add Course');
    expect(wrapper.find('button').text()).toBe('Save');
  });

  it("should not set save button to 'saving...' when it has error", () => {
    const args = {
      errors: {
        title: 'Title is required.',
        author: 'Author is required.',
        category: 'Category is required.',
        onSave: 'title is required',
      },
      saving: true,
    };
    const wrapper = renderCourseForm(args);
    expect(wrapper).toMatchSnapshot();
  });
});
