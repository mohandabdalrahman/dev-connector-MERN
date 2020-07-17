const Post = require('../database/models/Posts')
const User = require('../database/models/User')
const Profile = require('../database/models/Profile')
const { handleGeneralError } = require('../utils/generalError')
const { validationResult } = require('express-validator');

const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const { name, avatar } = await User.findById(req.user.id).select('-password')
    const newPost = {
      name,
      avatar,
      text: req.body.text,
      user: req.user.id
    }
    const postRes = await Post.create(newPost)
    return res.status(201).json({
      success: true,
      data: postRes
    })

  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}


const getPosts = async (req, res) => {
  try {
    const postsRes = await Post.find().sort({ date: '-1' })
    if (postsRes) return res.status(200).json({ success: true, data: postsRes })
    return res.status(404).json({ success: false, msg: 'posts not found' })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}

const getPostById = async (req, res) => {
  try {
    const postRes = await Post.findById(req.params.postId)
    if (postRes) return res.status(200).json({ success: true, data: postRes })
    return res.status(404).json({ success: false, msg: 'post not found' })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}

const deletePostById = async (req, res) => {
  try {
    const postRes = await Post.findById(req.params.postId)
    if (postRes.user.toString() !== req.user.id) return res.status(401).json({ msg: "user not authorize" })
    await Post.findByIdAndDelete(req.params.postId)
    return res.status(204).json({ success: true, msg: 'post deleted' })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}

const handleLikePost = async (req, res) => {
  try {
    const postRes = await Post.findById(req.params.postId)
    if (postRes.likes.filter(like => like.user.toString() === req.user.id).length > 0) return res.status(400).json({ msg: 'post already liked' })
    postRes.likes.unshift({ user: req.user.id })
    await postRes.save()
    return res.status(201).json({ success: true, data: postRes.likes })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}


const handleUnLikePost = async (req, res) => {
  try {
    const postRes = await Post.findById(req.params.postId)
    if (postRes.likes.filter(like => like.user.toString() === req.user.id).length === 0) return res.status(400).json({ msg: 'post has not been liked' })

    postRes.likes = postRes.likes.filter(like => like.user.toString() !== req.user.id)
    await postRes.save()
    return res.status(201).json({ success: true, data: postRes.likes })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}


const createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const { avatar } = await User.findById(req.user.id).select('-password')
    const newComment = {
      avatar,
      text: req.body.text,
      user: req.user.id
    }
    const postRes = await Post.findById(req.params.postId)
    postRes.comments.unshift(newComment)
    await postRes.save()
    return res.status(201).json({
      success: true,
      data: postRes.comments
    })

  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}


const deleteComment = async (req, res) => {
  try {
    const postRes = await Post.findById(req.params.postId)
    if (postRes.comments.filter(comment => comment.user.toString() === req.user.id).length === 0) return res.status(400).json({ msg: 'post has not comment' })

    postRes.comments = postRes.comments.filter(comment => comment.user.toString() !== req.user.id)
    await postRes.save()
    return res.status(201).json({ success: true, data: postRes.comments })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}



module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePostById,
  handleLikePost,
  handleUnLikePost,
  createComment,
  deleteComment
}