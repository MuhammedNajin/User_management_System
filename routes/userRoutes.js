const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/user');

// dashboard
userRouter.get('/',middleware.isLoged, userController.getHome);
  
//login
userRouter.get('/login',middleware.verifySuperAdmin, middleware.back ,middleware.verify, userController.getLogin);

userRouter.post('/login', middleware.isSuperAdmin, middleware.userAuth, userController.userLogin);


//signup 
userRouter.get('/signup', userController.getSignup);

//form submsion 
userRouter.post('/signup', middleware.creatingUser, userController.registerUser);

// Logout 

userRouter.post('/logout',userController.userLogout );












module.exports = userRouter;