import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

// Middleware function to log requests
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Log request details to a flat file
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url} - ${req.ip}`;
  
  // Append log message to a flat file
  fs.appendFile('request_logs.txt', logMessage + '\n', (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  // Proceed to the next middleware
  next();
};
