import { Request, Response, NextFunction } from 'express';
import { WithAuthProp } from '@clerk/clerk-sdk-node';

declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string;
      };
      // Add param property to Request interface
      param(name: string, defaultValue?: any): string;
    }
  }

  // Augment the RequestHandler type
  type ClerkRequestHandler = (
    req: WithAuthProp<Request>,
    res: Response,
    next: NextFunction
  ) => void | Promise<void>;
}