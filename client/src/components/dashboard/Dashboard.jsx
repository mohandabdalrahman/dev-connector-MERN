import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profile';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
        </>
      ) : (
        <>
          <p>You have not set a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getCurrentProfile: () => dispatch(getCurrentProfile()),
});
const mapStateToProps = ({ auth, profile }) => ({ auth, profile });
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
