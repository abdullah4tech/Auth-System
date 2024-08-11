import type { Request, Response } from 'express';
import { isEmail } from 'validator';
import bcrypt from 'bcrypt';
import User from '../models/User';

const saltRounds = 10;

const validateSignUpData = async (req: Request, res: Response): Promise<boolean> => {
  const  { fullname, email, password }= req.body;

  if (!fullname) {
    res.status(400).json({ message: 'Please enter your name' });
    return false;
  }


  if (!isEmail(email)) {
    res.status(400).json({ message: 'Please enter a valid email' });
    return false;
  }

  if (!password) {
    res.status(400).json({ message: 'Please enter your password' });
    return false;
  } else if (password.length <= 5) {
    res.status(400).json({ message: 'The minimum password length is 6 characters' });
    return false;
  }

  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    res.status(400).json({ message: 'Account already exists' });
    return false;
  }

  return true;
};

const signupController = async (req: Request, res: Response) => {
  const { fullname, email, password } = req.body;

  const isValid = await validateSignUpData(req, res);
  if (isValid) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.create({ fullname, email, password: hashedPassword });

      res.json({
        message: 'Account created successfully',
        user: {
          _id: user._id,
          name: user.fullname,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default signupController;
