import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send;

    res.send = function sendOverridden(this: Response, ...args: any[]): any {
      const started = Date.now();
      const startTime = new Date().toISOString();

      const onFinished = () => {
        const elapsed = Date.now() - started;
        console.log(
          `${req.method} - ${req.originalUrl} - ${res.statusCode} - ${startTime} - ${elapsed}ms`
        );
      };

      res.once("finish", onFinished);

      return originalSend.apply(this, args);
    };

    next();
  }
}
