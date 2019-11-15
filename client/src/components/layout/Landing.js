import React from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Landing = (isAuthenticated) => {
  // if(isAuthenticated){
  //   return <Redirect to ='/dashboard'/>
  // }
    return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">CUCS 校友系统</h1>
          <p className="lead">
            完善个人信息，加入UCI校友网络
          </p>
          <div className="buttons">
            <Link to="/profiles" className="btn btn-primary" >稍后注册,先睹为快</Link>
            <Link to="/register" className="btn btn-light">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Landing);
