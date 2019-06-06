import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { saveCourse, loadCourses } from '../../redux/actions/CourseActions';
import { loadAuthors } from '../../redux/actions/AuthorActions';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../commons/Spinner';

export const ManageCoursesPage = ({
  getCourses, getAuthors, history, courseLoading, authorLoading,
  addCourse, courses, authors, ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCourses();
    getAuthors();
    setCourse({ ...props.course });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse(previousState => ({
      ...previousState,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  };

  const formIsValid = () => {
    const { title, authorId, category } = course;
    const error = {};
    if (!title) error.title = 'Title is required.';
    if (!authorId) error.author = 'Author is required.';
    if (!category) error.category = 'Category is required.';

    setErrors(error);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    addCourse(course).then(() => {
      toast.success('Course Successfully Added');
      history.push('/courses');
    }).catch((error) => {
      setSaving(false);
      setErrors({ onSave: error.message });
    });
  };

  return (
    <>
      {authorLoading || courseLoading
        ? (<Spinner />)
        : (
          <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSubmit}
            saving={saving}
          />
        )
      }
    </>
  );
};

ManageCoursesPage.propTypes = {
  addCourse: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  getAuthors: PropTypes.func.isRequired,
  course: PropTypes.shape({}).isRequired,
  authorLoading: PropTypes.bool.isRequired,
  courseLoading: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const getCourseBySlug = (courses, slug) => courses.find(
  course => course.slug === slug,
) || newCourse;

const mapStateToProps = ({ courses, authors }, ownProps) => {
  const { params: { slug } } = ownProps.match;
  const course = slug && courses.list.length > 0
    ? (getCourseBySlug(courses.list, slug)) : newCourse;
  return {
    course,
    courses: courses.list,
    authors: authors.list,
    authorLoading: authors.loading,
    courseLoading: courses.loading,
  };
};

const mapDispatchToProps = {
  addCourse: saveCourse,
  getCourses: loadCourses,
  getAuthors: loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);
