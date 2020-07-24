import { GET_PROFILE, PROFILE_ERROR } from './types'
import axios from 'axios'
import { setAlert } from './alert'
export const getCurrentProfile = () => async dispatch => {
  try {
    const profileRes = await axios.get('api/v1/profile/me')
    dispatch({
      type: GET_PROFILE,
      payload: profileRes.data.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    })
  }
}

// create or update profile
export const createProfile = (profile, history, edit = false) => async dispatch => {
  try {
    const profileRes = await axios.post('api/v1/profile', profile)
    dispatch({
      type: GET_PROFILE,
      payload: profileRes.data.data
    })
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))
    if (!edit) {
      history.push('/dashboard')
    }
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    })
  }
}