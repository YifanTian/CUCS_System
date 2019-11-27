import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {NavLink} from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {FlatButton, Paper, TextField, Divider} from 'material-ui';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import TextEditorField from './TextEditorField';
import { getPhotoCount, uploadPhotoAction } from '../actions/index';
import { getCurrentProfile } from "../actions/profile";
import '../index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
  marginLeft: {
    marginLeft: 20,
  },
  form: {
    paddingTop: 60,
    paddingBottom: 50,
  },
  paper: {
  }
}

const imgStyle={
  width: "50%",
  height: "auto"
}

const renderDropzoneInput = (field) => {
  console.log(field.input.value);
  let $imagePreview = null;
  if (field.input.value) {
    $imagePreview = (<img alt={"previewImg"} style={imgStyle} src={field.input.value[0].preview} />);
    return (
      <div className='Aligner'>
        {$imagePreview}
      </div>
    );
  }
  else{
    return (
      <div className='Aligner'>
        <Dropzone
          name={field.name}
          accept={"image/jpeg, image/png, image/jpg"}
          onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
        >
          <h2>Try dropping a photo here, or click to select a photo to upload. (ONLY accept png or jpeg)</h2>
        </Dropzone>
        {/* {field.meta.touched &&
          field.meta.error &&
          <span className="error">{field.meta.error}</span>}
        {files && Array.isArray(files) && (
          <ul>
            { files.map((file, i) => <li key={i}>{file.name}</li>) }
          </ul>
        )} */}
      </div>
    );
  }
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    underlineShow={false}
    style={styles.marginLeft}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)


class UploadPhoto extends Component {
  constructor(props) {
     super(props);
     this.props.getPhotoCount();
     this.props.getCurrentProfile();
   }

   submit = (values) => {
     console.log(this.props);
     console.log(values);
     let userName = localStorage.userName;
     this.props.uploadPhotoAction(values, this.props.profile.user._id, this.props.photoCount,  this.props.profile, this.props.history);
   }

   render() {
    const {
      handleSubmit,
      reset,
    } = this.props;
    return (
      <MuiThemeProvider>
        {/* <h4> {this.props.profile.user.id}</h4> */}
        {/* <h4> {this.props.photoCount} </h4> */}
     <form onSubmit={handleSubmit(this.submit)} style={styles.form}>
       <div>
         <Field
           name="uploadPhoto"
           component={renderDropzoneInput}
         />
         <br/>
         <Paper style={styles.paper} zDepth={2}>
         <Field
           name="imageTitle"
           component={renderTextField}
           type="text"
           placeholder="imageTitle"
          //  defaultValue={this.props.profile.status}
         />
         <Divider/>
         <Field
           name="text"
          //  value={this.props.profile.status}
           component={TextEditorField}
           type="text"
         />
         <Divider/>
         <FlatButton
           type="submit"
           label="Upload"
           icon={<FileUpload/>}
           secondary
         />
         <FlatButton
           onTouchTap={reset}
           label="Clear"
           secondary
         />
         <NavLink to="/">
           <FlatButton
             label="Cancel"
             secondary
           />
         </NavLink>
         </Paper>
       </div>
     </form>
     </MuiThemeProvider>
    );
   }
  }
  // <ul>
  //   <li>{this.state.file.name} - {this.state.file.size} bytes</li>
  //
  // </ul>
  // {
  //   files.map(f => <li>{f.name} - {f.size} bytes</li>)
  // }

  function mapStateToProps(state) {
    console.log(state);
    return {
      photoCount:state.board.photoCount,
      profile: state.profile.profile,
      uploadImage: state.board.uploadImage
    }
  }
  
  const reduxFormUploadPhoto = reduxForm({
    form: 'uploadphoto'
  })(UploadPhoto);
  
  export default connect(mapStateToProps, {getPhotoCount, getCurrentProfile, uploadPhotoAction})(reduxFormUploadPhoto);
  