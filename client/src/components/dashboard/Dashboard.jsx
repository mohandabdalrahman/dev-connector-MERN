import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../redux/actions/profile';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import ListExperience from './ListExperience';
import ListEducation from './ListEducation';
const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
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
          <ListExperience experience={profile.experience} />
          <ListEducation education={profile.education} />
          <div className="my-2">
            <button onClick={() => deleteAccount()} className="btn btn-danger">
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
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
  deleteAccount: () => dispatch(deleteAccount()),
});
const mapStateToProps = ({ auth, profile }) => ({ auth, profile });
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
