import type { Request, Response } from "express";
import User from "../models/User";

const LogoutController = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    try {
      const dbUser = await User.findOne({ token }).exec();
      if (dbUser) {
        dbUser.token = null; // Invalidate the token
        await dbUser.save();
      }

      res.clearCookie('token');
      return res.json({ status: 'success', message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(400).json({ message: 'Token not found' });
  }
};

export default LogoutController;
