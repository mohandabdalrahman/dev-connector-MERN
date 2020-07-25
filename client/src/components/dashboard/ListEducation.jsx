import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../redux/actions/profile';
const ListEducation = ({ education, deleteEducation }) => {
  const Educations = education.map(
    ({ _id, school, degree, fieldofstudy, from, to }) => (
      <tr key={_id}>
        <td>{school}</td>
        <td>{degree}</td>
        <td>{fieldofstudy}</td>
        <td>
          <Moment format="YYYY/MM/DD">{from}</Moment>
        </td>
        {to === null ? <td>Now</td> : <Moment format="YYYY/MM/DD">{to}</Moment>}
        <td>
          <button onClick={() => deleteEducation(_id)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    )
  );
  return (
    <>
      <h2 className="my-2">Education Credientals</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">fieldofstudy</th>
            <th className="hide-sm">Year</th>
            <th>Available</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{Educations}</tbody>
      </table>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteEducation: (eduId) => dispatch(deleteEducation(eduId)),
});

export default connect(null,mapDispatchToProps)(ListEducation);
