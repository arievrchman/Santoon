import {combineReducers} from 'redux';

// Reducers
import auth from './auth';
import toon from './toon';
import creation from './creation';

const appReducers = combineReducers({
  auth: auth,
  toon: toon,
  creation: creation,
});

const rootReducers = (state, action) => {
  if (action.type === 'LOGGED_OUT') {
    state = undefined;
  }

  return appReducers(state, action);
};

export default rootReducers;
