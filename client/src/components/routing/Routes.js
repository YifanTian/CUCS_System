import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import PhotoBoardContainer from '../dashboard/PhotoBoardContainer'
import UploadPhoto from '../UploadPhoto';
import AboutUs from '../AboutUs';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';

import PrivateRoute from '../routing/PrivateRoute';
import Landing from '../layout/Landing';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
      {/* <Route exact path='/' component={Landing} /> */}
      <Route exact path='/' component={Profiles} />
        <Route exact path="/PhotoBoard" component={PhotoBoardContainer} />
        <Route path="/uploadphoto" component={UploadPhoto} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/AboutUs' component={AboutUs} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
      
        <PrivateRoute exact path='/add-photo' component={UploadPhoto} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        
      </Switch>
    </section>
  );
};

export default Routes;