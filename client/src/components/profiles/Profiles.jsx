import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../redux/actions/profile';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
const Profiles = ({ getAllProfiles, profile: { loading, profiles } }) => {
  useEffect(() => {
    getAllProfiles();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles found</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ profile }) => ({ profile });
const mapDispatchToProps = (dispatch) => ({
  getAllProfiles: () => dispatch(getAllProfiles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
