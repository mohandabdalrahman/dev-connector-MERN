import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../redux/actions/profile';
const ListExperience = ({ experience, deleteExperience }) => {
  const Experiences = experience.map(({ _id, company, title, from, to }) => (
    <tr key={_id}>
      <td>{company}</td>
      <td>{title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{from}</Moment>
      </td>
      {to === null ? <td>Now</td> : <Moment format="YYYY/MM/DD">{to}</Moment>}
      <td>
        <button
          onClick={() => deleteExperience(_id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className="my-2">Experience Credientals</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Year</th>
            <th>Available</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{Experiences}</tbody>
      </table>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteExperience: (expId) => dispatch(deleteExperience(expId)),
});

export default connect(null,mapDispatchToProps)(ListExperience);
