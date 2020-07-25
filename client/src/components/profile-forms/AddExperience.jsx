import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addExperience } from '../../redux/actions/profile';
import { Link } from 'react-router-dom';
import InputField from '../common/InputField';
const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
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
    addExperience(formData, history);
  };

  const { title, company, location, from, current, to, description } = formData;

  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <InputField
          type="text"
          placeholder="* Job Title"
          name="title"
          value={title}
          onChange={(e) => handleChange(e)}
        />
        <InputField
          type="text"
          placeholder="* Company"
          name="company"
          value={company}
          onChange={(e) => handleChange(e)}
        />
        <InputField
          type="text"
          placeholder="Location"
          name="location"
          value={location}
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
              onChange={() => {
                setFormData({ ...formData, current: !current });
                setToDateDisable(!toDateDisable);
              }}
            />{' '}
            Current Job
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
            placeholder="Job Description"
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
  addExperience: (experience, history) =>
    dispatch(addExperience(experience, history)),
});

export default connect(null, mapDistachToProps)(AddExperience);
