import { combineReducers } from 'redux';
import auth from './auth';
import maps from './map.reducer';
export default combineReducers({auth,maps});
