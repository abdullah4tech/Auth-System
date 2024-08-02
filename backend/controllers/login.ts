import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import bcrypt from 'bcrypt';

const jwtToken: string = process.env.JWT_LOGIN_TOKEN || '';

const LoginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const dbUser = await User.findOne({ username }).exec();
    if (!dbUser) {
      return res.status(400).json({ message: 'Account not found!' });
    }

    //const match = password === dbUser.password;
    const match: boolean = await bcrypt.compare(password, dbUser.password) ? true : false

    if (match) {
      const token = jwt.sign(
        { _id: dbUser.id, name: dbUser.fullname, email: dbUser.email, username }, jwtToken
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict'
      });

      return res.json({
        status: 'success',
        message: 'Login success',
        token,
      });
    } else {
      return res.status(400).json({ message: 'Username or password incorrect!' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default LoginController;
