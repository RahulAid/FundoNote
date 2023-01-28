import User from '../models/user.model';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const userRegistration = async (body) => {
  const userexist = await User.findOne({ email: body.email });
  if (!userexist) {
    const data = await User.create(body);
    return data;
  }
  else {
    throw new Error("Email ID already exists")
  }

};


// Validate Login Credentials

export const login = async (body) => {
  try {
    const userdata = await User.findOne({ email: body.email });
    if (!userdata) {
      throw new Error("Invalid Credentials")
    }
    else {
      return 'Login Successful';
    }

  }
  catch (error) {
    throw new Error(error)
  }

};

