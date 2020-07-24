import { GET_PROFILE, PROFILE_ERROR, CLAER_PROFILE } from '../actions/types'
const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case CLAER_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      }
    default:
      return state
  }
} 