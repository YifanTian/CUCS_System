import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const _arrayBufferToBase64 = (buffer) => {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  // console.log(window.btoa( binary ));
  return window.btoa( binary );
}

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    // img: {data, contentType},
    Image: {img, userName},
    status,
    company,
    location,
    skills,
    education
  }
}) => {
  console.log(education)
  return (
    <div className='profile bg-light'>
      {/* <img src={avatar} alt='' className='round-img' /> */}
      <img alt={"img"} src={`data:${img.contentType};base64,${_arrayBufferToBase64(img.data.data)}`}/>
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        {/* <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link> */}
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul>
      {education.length > 0 ? (<p>{`School:${education[0].school}; Degree:${education[0].degree}; Field:${education[0].fieldofstudy}`}</p>) : null}
    </div>
  );
};

ProfileItem.propTypes = {
  // profile1: PropTypes.object.isRequired
};

export default ProfileItem;
