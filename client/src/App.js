import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar'
import Layout from './components/layout/Layout'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import { Route, Switch } from 'react-router-dom'
import Alert from './components/layout/Alert'
import { loadUser } from './redux/actions/auth'
import { setAuthToken } from './utils/setAuthToken'
import { connect } from 'react-redux'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
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
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/add-experience" component={AddExperience} />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/post/:id" component={Post} />
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
