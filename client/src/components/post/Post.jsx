import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPostById } from '../../redux/actions/post';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
const Post = ({ post: { post, loading }, getPostById, match }) => {
  useEffect(() => {
    getPostById(match.params.id);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {!post || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <div className="comments">
            {post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ post }) => ({ post });
const mapDispatchToProps = (dispatch) => ({
  getPostById: (postId) => dispatch(getPostById(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
