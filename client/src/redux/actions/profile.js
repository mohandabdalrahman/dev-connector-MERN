import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, DELETE_ACCOUNT, CLAER_PROFILE } from './types'
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

export const addExperience = (experience, history) => async dispatch => {
  try {
    const profileRes = await axios.put('api/v1/profile/experience', experience)
    dispatch({
      type: UPDATE_PROFILE,
      payload: profileRes.data.data
    })
    dispatch(setAlert('Experience Added', 'success'))
    history.push('/dashboard')
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


export const addEducation = (education, history) => async dispatch => {
  try {
    const profileRes = await axios.put('api/v1/profile/education', education)
    dispatch({
      type: UPDATE_PROFILE,
      payload: profileRes.data.data
    })
    dispatch(setAlert('Education Added', 'success'))
    history.push('/dashboard')
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

export const deleteExperience = expId => async dispatch => {
  if (window.confirm('Are you sure you want delete this?')) {
    try {
      const res = await axios.delete(`api/v1/profile/experience/${expId}`)
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data.data
      })
      dispatch(setAlert('Experience Removed', 'success'))
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
}


export const deleteEducation = eduId => async dispatch => {
  if (window.confirm('Are you sure you want delete this?')) {
    try {
      const res = await axios.delete(`api/v1/profile/education/${eduId}`)
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data.data
      })
      dispatch(setAlert('Education Removed', 'success'))
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
}

// delete profile and account
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure you want delete account ?')) {
    try {
      await axios.delete(`api/v1/profile`)
      dispatch({
        type: CLAER_PROFILE,
      })
      dispatch({
        type: DELETE_ACCOUNT,
      })
      dispatch(setAlert('Account Removed', 'success'))
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
} 