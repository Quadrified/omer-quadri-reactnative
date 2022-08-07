import { combineReducers } from 'redux';
import MainReducer from './reducer';

const appReducer = combineReducers({
  MainReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
