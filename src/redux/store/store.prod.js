import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';

const configureStore = () => createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk),
);

export default configureStore;
