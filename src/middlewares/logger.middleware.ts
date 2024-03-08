import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Log request details to a flat file
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url} - ${req.ip}`;
  fs.appendFile('logs.txt', logMessage + '\n', (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
  next();
};
