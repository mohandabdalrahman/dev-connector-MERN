import React from 'react';

const ProfileAbout = ({
  profile: {
    bio,
    user: { name },
    skills,
  },
}) => {
  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">{name}</h2>
      {bio && <p>{bio}</p>}
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills &&
          skills.map((skill, index) => (
            <div key={index} className="p-1">
              <i className="fa fa-check"></i> {skill}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
