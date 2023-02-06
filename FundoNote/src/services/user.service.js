import User from '../models/user.model';
const bcrypt = require('bcrypt')
//var jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
import { sendmail } from '../utils/user.util.mjs';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const userRegistration = async (body) => {
  const existingUser = await User.findOne({ email: body.email });
  if (!existingUser) {
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    const data = await User.create(body);
    return data;
  }
  else {
    throw new Error("User already exist")
  }
};


// Validate Login Credentials

export const login = async (body) => {
  try {
    const userdata = await User.findOne({ email: body.email });
    if (!userdata) {
      throw new Error("Invalid Email ID entered")
    }

    const validPassword = await bcrypt.compare(body.password, userdata.password);
    if (!validPassword) {
      throw new Error("Invalid Password")
    }
    else {
      let token = jwt.sign({ email: userdata.email }, process.env.SECRET_KEY);
      return token;
      //return userdata;
    }
    return userdata;
  }
  catch (error) {
    throw new Error(error)
  }

};


//for forgot password
export const Forgotpwd = async (body) => {
  try {
    const user = await User.findOne({ 
      email: body.email 
    });
    if (!user) {
      throw new Error("Invalid Email ID");
    }
    else
      var token = jwt.sign(user.email, process.env.FORGET_SECRET_KEY);
    const data = await sendmail(user.email,token)

    return {
      message: `Token has been sent`,
      data
    }
  }
  catch (error) {
    throw new Error(error)
  }
};


//For reset password
export const pwdReset = async (token, body) =>
 {
   const salt = 10;
  const pwdHash = await bcrypt.hash(body.password,salt);
  body.password = pwdHash; 
  
  const data = User.findOneAndUpdate(
    {
      email: body.email
    },
    {
      password: body.password
    },
    {
      new: true
    })
  return data;
};


