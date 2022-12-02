import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import { ISLOCAL } from "./loader.config";

const JsonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});

const DevLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp, context }) => {
          return `${timestamp} ${level} [${context}]: ${message}`;
        })
      )
    })
  ]
});

export const logger = ISLOCAL ? DevLogger : JsonLogger;
