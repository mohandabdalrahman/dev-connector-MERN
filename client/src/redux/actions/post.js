import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST } from './types'
import axios from 'axios'
import { setAlert } from './alert'
const URL = 'http://localhost:5000/'

// get posts
export const getPosts = () => async dispatch => {
  try {
    const postsRes = axios.get(`${URL}api/v1/posts`)
    dispatch({
      type: GET_POSTS,
      payload: postsRes.data.data
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    })
  }
}

// delete post 
export const deletePost = postId => async dispatch => {
  try {
    axios.delete(`${URL}api/v1/posts/${postId}`)
    dispatch({
      type: DELETE_POST,
      payload: postId
    })
    dispatch(setAlert('Post deleted', 'success'))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    })
  }
}

// add post
export const addPost = formDate => async dispatch => {
  try {
    const postRes = axios.post(`${URL}api/v1/posts`, formDate)
    dispatch({
      type: ADD_POST,
      payload: postRes.data.data
    })
    dispatch(setAlert('Post Created', 'success'))

  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    })
  }
}



// Add like
export const addLike = postId => async dispatch => {
  try {
    const likesRes = axios.put(`${URL}api/v1/posts/like/${postId}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        likes: likesRes.data.data,
        id: postId
      }
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    })
  }
}

// remove like
export const removeLike = postId => async dispatch => {
  try {
    const likesRes = axios.delete(`${URL}api/v1/posts/unlike/${postId}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        likes: likesRes.data.data,
        id: postId
      }
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    })
  }
}
