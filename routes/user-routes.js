import express from 'express';
import bodyParser from 'body-parser';
import { check } from 'express-validator/check';
import { authorizeUser } from '../middlewares/middlewares.js';
import {createUser, userLogin, getUser} from '../controllers/user-controller';

const app = express();

app.use(bodyParser.json());

//creating user's account

app.post("/users", [
    check('first_name').isAlpha().withMessage('first name should be in alphabets only').isLength({min:5, max: 15}).withMessage('first name must be of 5 characters and above'),
    check('email', 'email must be valid').isEmail(),
    check('phone_no', 'Mobile number must be valid').isMobilePhone(),
    check('password')
    .isLength({min: 5}).withMessage('Password must have a minimum length of 5')
  ], createUser);


  //login endpoint
  app.post("/users/login", userLogin)

  //user details endpoint
  app.get("/me", authorizeUser, getUser)

  export default app;