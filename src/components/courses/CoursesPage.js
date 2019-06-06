import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loadCourses, deleteCourse } from '../../redux/actions/CourseActions';
import { loadAuthors } from '../../redux/actions/AuthorActions';
import CourseList from './CourseList';
import Spinner from '../commons/Spinner';

class CoursesPage extends React.PureComponent {
  state = {
    redirectToAddCoursePage: false,
  }

  componentDidMount() {
    const { getCourses, getAuthors } = this.props;
    getCourses();
    getAuthors();
  }

  handelDelete = async (course) => {
    toast.success('Course Deleted');
    const { removeCourse } = this.props;
    try {
      await removeCourse(course);
    } catch (err) {
      toast.error(`Delete Failed. ${err.message}`, { autoClose: false });
    }
  }

  render() {
    const { courses, authorLoading, courseLoading } = this.props;
    const { redirectToAddCoursePage } = this.state;
    return (
      <>
        {redirectToAddCoursePage && <Redirect to="/course" />}
        <p>Courses</p>
        <button
          type="button"
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>
        {authorLoading || courseLoading
          ? (<Spinner />)
          : (
            <CourseList
              courses={courses}
              onDelete={this.handelDelete}
            />
          )
        }
      </>
    );
  }
}

CoursesPage.propTypes = {
  getCourses: PropTypes.func.isRequired,
  getAuthors: PropTypes.func.isRequired,
  removeCourse: PropTypes.func.isRequired,
  authorLoading: PropTypes.bool.isRequired,
  courseLoading: PropTypes.bool.isRequired,
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ courses, authors }) => ({
  courses: authors.list.length === 0 ? [] : courses.list.map(course => ({
    ...course,
    authorName: authors.list.find(a => a.id === course.authorId).name,
  })),
  authorLoading: authors.loading,
  courseLoading: courses.loading,
});

const mapDispatchToProps = {
  getCourses: loadCourses,
  getAuthors: loadAuthors,
  removeCourse: deleteCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
