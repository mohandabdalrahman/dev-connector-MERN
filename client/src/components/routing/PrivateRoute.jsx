import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
const PrivateRoute = ({
  component: Component,
  auth: { isAuth, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuth && !loading ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, null)(PrivateRoute);
