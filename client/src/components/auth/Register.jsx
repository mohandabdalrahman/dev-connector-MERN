import React, { useState } from 'react';
import InputField from '../common/InputField';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alert';
import { Link } from 'react-router-dom';
const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert('passwords not match', 'danger');
    } else {
      console.log(formData);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <InputField
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => handleChange(e)}
        />
        <InputField
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
          smallText="This site uses Gravatar so if you want a profile image, use a
            Gravatar email"
        />
        <InputField
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          minLength="6"
          onChange={(e) => handleChange(e)}
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          minLength="6"
          value={confirmPassword}
          onChange={(e) => handleChange(e)}
        />
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
