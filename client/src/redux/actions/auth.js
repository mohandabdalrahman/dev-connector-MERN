import axios from 'axios'
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLAER_PROFILE } from './types'
import { setAlert } from './alert'
import { setAuthToken } from '../../utils/setAuthToken'
export const registerUser = (user) => async dispatch => {
  try {
    const userRes = await axios.post('api/v1/users', JSON.stringify(user), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch({
      type: REGISTER_SUCCESS,
      payload: userRes.data
    })
    dispatch(loadUser())
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const userRes = await axios.get('api/v1/auth')
    dispatch({
      type: USER_LOADED,
      payload: userRes.data.data
    })
  } catch (error) {
    dispatch({
      type: AUTH_FAIL
    })
  }
}

export const loginUser = (user) => async dispatch => {
  try {
    const userRes = await axios.post('api/v1/auth', JSON.stringify(user), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: userRes.data
    })
    dispatch(loadUser())
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}


export const logOut = () => dispatch => {
  dispatch({
    type: CLAER_PROFILE
  })
  dispatch({
    type: LOGOUT
  })
}


