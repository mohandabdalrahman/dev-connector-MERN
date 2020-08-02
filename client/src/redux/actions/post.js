import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from './types'
import axios from 'axios'
import { setAlert } from './alert'
const URL = 'http://localhost:5000/'

// get posts
export const getPosts = () => async dispatch => {
  try {
    const postsRes = await axios.get(`${URL}api/v1/posts`)
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
    await axios.delete(`${URL}api/v1/posts/${postId}`)
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
    const postRes = await axios.post(`${URL}api/v1/posts`, formDate)
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

// get post by id

//TODO: IMPLEMENT GET POST BY ID
export const getPostById = postId => async dispatch => {
  try {
    const postRes = await axios.get(`${URL}api/v1/posts/${postId}`)
    dispatch({
      type: GET_POST,
      payload: postRes.data.data
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

// Add like
export const addLike = postId => async dispatch => {
  try {
    const likesRes = await axios.put(`${URL}api/v1/posts/like/${postId}`)
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
    const likesRes = await axios.delete(`${URL}api/v1/posts/unlike/${postId}`)
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

// ADD COMMENT
export const addComment = (postId, text) => async dispatch => {
  try {
    const commentRes = await axios.post(`${URL}api/v1/posts/comment/${postId}`, { text })
    dispatch({
      type: ADD_COMMENT,
      payload: commentRes.data.data
    })
    dispatch(setAlert('Comment Added', 'success'))
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


// REMOVE COMMENT
export const removeComment = postId => async dispatch => {
  try {
    const commentRes = await axios.delete(`${URL}api/v1/posts/comment/${postId}`)
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentRes.data.data
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
