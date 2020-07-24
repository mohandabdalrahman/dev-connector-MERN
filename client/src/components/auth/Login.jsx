import React, { useState } from 'react';
import InputField from '../common/InputField';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/auth';
const Login = ({ loginUser, auth: { isAuth }}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Redirect user
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <InputField
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
        />
        <InputField
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          minLength="6"
          onChange={(e) => handleChange(e)}
        />

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
  };
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
