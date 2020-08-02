import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/post';
import Spinner from '../common/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
const Posts = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {!posts || loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community
          </p>
          <PostForm />
          <div className="posts">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ post }) => ({ post });
const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
