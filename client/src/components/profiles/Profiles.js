import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [doFilter, setFilter] = useState(false);
  const [skill4Filter, setSkill4Filter] = useState('');

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
          <Fragment>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
              <i className='fab fa-connectdevelop' /> Browse and connect with
              developers
          </p>
            <span>
              <input type="checkbox" value={doFilter} onChange={() => setFilter(!doFilter)}></input>
              <label>Filter with Skill</label>
              <input value={skill4Filter} onChange={e => setSkill4Filter(e.target.value)} placeholder="e.g. Python"></input>
            </span>
            <div className='profiles'>
              {profiles.length > 0 ? (
                !doFilter ? (profiles.map(profile => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))) : (
                    profiles.filter(profile => profile.skills.map(s => s.toUpperCase()).includes(skill4Filter.toUpperCase())).map(profile => (
                      <ProfileItem key={profile._id} profile={profile} />
                    ))
                  )
              ) : (
                  <h4>No profiles found...</h4>
                )}
            </div>
          </Fragment>
        )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
// profile: state.profile
// });

function mapStateToProps(state) {
  return { profile: state.profile };
}

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);