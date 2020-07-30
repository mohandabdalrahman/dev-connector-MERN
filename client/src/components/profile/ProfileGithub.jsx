import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../redux/actions/profile';
import Spinner from '../common/Spinner';
const ProfileGithub = ({ userName, getGithubRepos, profile: { repos } }) => {
  useEffect(() => {
    getGithubRepos(userName);
  }, []);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map(
          ({
            _id,
            html_url,
            name,
            description,
            stargazers_count,
            watchers_count,
            forks_count,
          }) => (
            <div key={_id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a href={html_url} target="_blank" rel="noopener noreferrer">
                    {name}
                  </a>
                </h4>
                <p>{description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    Stars: {stargazers_count}
                  </li>
                  <li className="badge badge-dark">
                    Watchers: {watchers_count}
                  </li>
                  <li className="badge badge-light">Forks: {forks_count}</li>
                </ul>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getGithubRepos: (username) => dispatch(getGithubRepos(username)),
});

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGithub);
