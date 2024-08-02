import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken';



const jwtToken: string = process.env.JWT_LOGIN_TOKEN || '';

interface AuthRequest extends Request {
  body: {
    token: string;
  };
}

const authController = async (req: AuthRequest, res: Response) => {
  const { token } = req.body;

  if (token) {
    try {
      const decoded = jwt.verify(token, jwtToken) as JwtPayload;

      res.json({
        auth: true,
        data: decoded,
      });
    } catch (error) {
      res.status(401).json({
        auth: false,
        data: 'Invalid token',
      });
    }
  } else {
    res.status(400).json({
      auth: false,
      data: 'Token not found',
    });
  }
};

export default authController;
