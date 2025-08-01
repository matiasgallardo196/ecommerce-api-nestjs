import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(this: void, req: Request, res: Response, next: NextFunction) {
    console.log(`Method: ${req.method} on Route: ${req.url} at Time: ${new Date().toISOString()}`);
    next();
  }
}
