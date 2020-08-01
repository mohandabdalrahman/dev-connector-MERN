import { combineReducers } from 'redux'
import alertReducer from './alertReducer'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import postReducer from './post'
export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer
})