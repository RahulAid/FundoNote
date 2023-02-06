import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';

import  { forgetuserAuth }  from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to register a new user
router.post('/register', newUserValidator, userController.userRegistration);

//route to login
router.post('/login',  userController.login);

//route to forgot password
router.post('/forgotPassword',userController.Forgotpwd);


export default router;