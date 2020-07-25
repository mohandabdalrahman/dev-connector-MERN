import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addEducation } from '../../redux/actions/profile';
import { Link } from 'react-router-dom';
import InputField from '../common/InputField';
const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    current: false,
    to: '',
    description: '',
  });
  const [toDateDisable, setToDateDisable] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };

  const {
    school,
    degree,
    fieldofstudy,
    from,
    current,
    to,
    description,
  } = formData;

  return (
    <>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <InputField
          type="text"
          placeholder="* School or Bootcamp"
          name="school"
          value={school}
          onChange={(e) => handleChange(e)}
        />
        <InputField
          type="text"
          placeholder="* Degree or Certificate"
          name="degree"
          value={degree}
          onChange={(e) => handleChange(e)}
        />
        <InputField
          type="text"
          placeholder="Field Of Study"
          name="fieldofstudy"
          value={fieldofstudy}
          onChange={(e) => handleChange(e)}
        />
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                setToDateDisable(!toDateDisable);
              }}
            />{' '}
            Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            disabled={toDateDisable ? 'disabled' : ''}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

const mapDistachToProps = (dispatch) => ({
  addEducation: (education, history) =>
    dispatch(addEducation(education, history)),
});

export default connect(null, mapDistachToProps)(AddEducation);
