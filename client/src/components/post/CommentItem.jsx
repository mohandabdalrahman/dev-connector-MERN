import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
const CommentItem = ({ comment: { name, text, user, date, avatar } }) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, null)(CommentItem);
