import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar'
import Layout from './components/layout/Layout'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { Route, Switch } from 'react-router-dom'
import Alert from './components/layout/Alert'
import { loadUser } from './redux/actions/auth'
import { setAuthToken } from './utils/setAuthToken'
import { connect } from 'react-redux'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <Navbar />
      <Route exact path='/' component={Layout} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(loadUser())
  }
}

export default connect(null, mapDispatchToProps)(App);
