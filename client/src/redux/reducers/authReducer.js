import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types'
const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  user: null
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        loading: false,
        isAuth: true,
      }
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload
      }
    case AUTH_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        loading: false,
        isAuth: false
      }
    default:
      return state
  }
}