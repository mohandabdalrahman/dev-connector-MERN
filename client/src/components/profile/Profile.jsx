import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileByUserId } from '../../redux/actions/profile';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
const Profile = ({
  getProfileByUserId,
  match,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id);
    // eslint-disable-next-line
  }, [getProfileByUserId]);
  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back to profiles
          </Link>
          {auth.isAuth &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link className="btn btn-dark" to="/edit-profile">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            {/* start experience */}
            <div className="profile-exp bg-white p-2">
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((exp) => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </>
              ) : (
                <h4>No Experience </h4>
              )}
            </div>

            {/* start education */}
            <div className="profile-edu bg-white p-2">
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((edu) => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))}
                </>
              ) : (
                <h4>No Education </h4>
              )}
            </div>

            {/* Start github repos */}
            {profile.githubusername && (
              <ProfileGithub userName={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getProfileByUserId: (userId) => dispatch(getProfileByUserId(userId)),
});

const mapStateToProps = ({ profile, auth }) => ({ profile, auth });

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
