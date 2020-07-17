const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const auth = require('../middleware/auth')
const { createPost, getPosts, getPostById, deletePostById, handleLikePost, handleUnLikePost, createComment, deleteComment } = require('../connectors/post')

router.route('/').post(auth, [
  body('text', 'Text is required').not().isEmpty()
], createPost).get(auth, getPosts)

router.route('/:postId').get(auth, getPostById).delete(auth, deletePostById)

router.route('/like/:postId').put(auth, handleLikePost)
router.route('/unlike/:postId').delete(auth, handleUnLikePost)

router.route('/comment/:postId').post(auth, [
  body('text', 'Text is required').not().isEmpty()
], createComment).delete(auth, deleteComment)

module.exports = router