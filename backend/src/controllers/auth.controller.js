import { genrateToken } from '../lib/utlis.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';


export const signup = async (req, res) => {
  const {fullname,email,password} = req.body;
  try {

    if (!fullname || !email || !password) {
      return res.status(400).json({message: 'Please fill all the fields'});
    }
    if (password.length < 6) {
      return res.status(400).json({message: 'Password must be at least 6 characters long'});
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({message: 'User already exists'});
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      genrateToken (newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic, // Fixed property access
      });
    } else {
      res.status(400).json({message: 'User not created'});
    }

  } catch (error) {
    console.log("Error in signup controller",error.message);
    res.status(500).json({
      message: 'Internal server error'});
  }
}

export const login = (req, res) => {
  res.send('login Route');
}

export const logout = (req, res) => {
  res.send('logout Route');
}