import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from '../home/HomePage';
import AboutPage from '../about/AboutPage';
import Header from '../commons/Header';
import PageNotFound from '../PageNotFound';
import CoursesPsge from '../courses/CoursesPage';
import ManageCoursePage from '../courses/ManageCoursePage';
import 'react-toastify/dist/ReactToastify.css';


const App = () => (
  <div className="container-fuild">
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/courses" component={CoursesPsge} />
      <Route path="/course/:slug" component={ManageCoursePage} />
      <Route path="/course" component={ManageCoursePage} />
      <Route component={PageNotFound} />
    </Switch>
    <ToastContainer autoClose={3000} hideProgressBar />
  </div>
);


export default App;
