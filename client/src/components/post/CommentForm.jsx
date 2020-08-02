import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../redux/actions/post';
const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(postId, text);
    setText('');
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a comment"
          onChange={(e) => setText(e.target.value)}
          value={text}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (postId, comment) => dispatch(addComment(postId, comment)),
});

export default connect(null, mapDispatchToProps)(CommentForm);
