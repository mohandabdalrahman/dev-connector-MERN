import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar'
import Layout from './components/layout/Layout'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { Route, Switch } from 'react-router-dom'
import Alert from './components/layout/Alert'
const App = () => {
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

export default App;
