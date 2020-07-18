import React, { useState } from 'react';
import InputField from '../common/InputField';
import { Link } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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

        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

export default Login;
