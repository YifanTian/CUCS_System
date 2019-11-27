const express = require('express');
//Middleware handling multipart/form-data
const multer = require('multer');
const upload = multer({dest:'./public/uploads/'})
// const moment = require('moment');
const util = require('util');
// const AuthenticationController = require('./../controllers/authentication');
// const passportService = require('./../config/passport');
// const passport = require('passport');
const Image = require('../schema/Image')
// Middleware to require login/auth
// const requireAuth = passport.authenticate('jwt', { session: false });
// const requireLogin = passport.authenticate('local', { session: false });
const fs = require('fs');

module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const uploadImageRoutes = express.Router();


  apiRoutes.get('/getImages', function(req, res){
    Image.find({}, function(err, data) {
      console.log("Get all images");
      if (!err) res.send(data);
      else throw err;
    });
  });

  apiRoutes.get('/getImagesCount', function(req, res){
    Image.count(function(err, data) {
      console.log("Get all images count from loginRouter");
      console.log(data);
      if(!err) res.send(data.toString());
      else throw err;
    });
  });

  apiRoutes.post('/uploadImage', upload.single('uploadPhoto'), function (req, res) {
    console.log('uploadImage');
    let image = new Image;
    // console.log(req.body.text);
    // console.log(req.body);
    // console.log(req.file);
    // const time = moment().format('YYYY MM Do, h:mm a');
    image.no = parseInt(req.body.imagesCount)+1;
    image.userName = req.body.userName;
    image.img.data = fs.readFileSync(req.file.path);
    image.img.contentType = req.file.mimetype;
    image.title = req.body.imageTitle;
    image.info = req.body.text;
    // image.time = time;
    image.comments = [];

    console.log(image.info);

    image.save(function (err, a) {
      if (err) throw err;
      console.error('Saved img to MongoDB');
      res.status(200).json({
        status: 200,
        message: "Saved img to database"
      });
    });
  });

  apiRoutes.post('/deletPost', function(req, res){
    // console.log(req);
    Image.remove({'no':req.body.no}, function(err){
      if(!err){
        console.log('Successfully delete post');
        res.status(200).json({
          status: 200,
          message: "Successfully delete post"
        });
      }
      else console.error(err);
    })
    // const id = req.body;
    // const no = req.body.no;  })
  });
  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  // authRoutes.post('/signup', AuthenticationController.signup);

  // Login route
  // authRoutes.post('/login', requireLogin, AuthenticationController.login);
  // authRoutes.post('/signin', function(req, res, next ){
  //   passport.authenticate('local', function(err, user, info) {
  //     if (err) { return next(err) }
  //     if (!user) { return res.status(422).json({ message: info }) }
  //     return next(null, user, {message: info})
  //     // res.json({user, message: info});
  //   })(req, res, next);
  // }, AuthenticationController.signin);

// Set url for API group routes
  app.use('/api', apiRoutes);
};
