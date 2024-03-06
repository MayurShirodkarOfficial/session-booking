import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET as Secret, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    (req as any).user = decoded;
    next();
  });
};
