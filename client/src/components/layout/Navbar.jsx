import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../redux/actions/auth';
const Navbar = ({ auth: { isAuth }, logOut }) => {
  const handleAuthUser = () => {
    if (isAuth) {
      return (
        <li>
          <a onClick={() => logOut()} href="#!">
            <i className="fas fa-sign-out-alt"></i>{' '}
            Logout
          </a>
        </li>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/profiles">Developers</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      );
    }
  };
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>{handleAuthUser()}</ul>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
