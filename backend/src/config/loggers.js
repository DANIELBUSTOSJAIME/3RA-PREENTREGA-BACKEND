import winston from "winston"

let logger;

if (process.env.MODO === "development") {
  const customLevelOpt = {
    levels: {
      fatal: 0,
      error: 1,
      warning: 2,
      info: 3,
      debug: 4
    },
    colors: {
      fatal: "red",
      error: "yellow",
      warning: "cyan",
      info: "blue",
      debug: "gray"
    }
  }

  logger = winston.createLogger({
    levels: customLevelOpt.levels,
    transports: [
      new winston.transports.File({
        filename: './errors.html',
        level: 'fatal',
        format: winston.format.combine(winston.format.simple())
      }),
      new winston.transports.File({
        filename: './errors.html',
        level: 'error',
        format: winston.format.combine(winston.format.simple())
      }),
      new winston.transports.File({
        filename: './loggers.html',
        level: 'warning',
        format: winston.format.combine(winston.format.simple())
      }),
      new winston.transports.File({
        filename: './loggers.html',
        level: 'info',
        format: winston.format.combine(winston.format.simple())
      }),
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelOpt.colors }),
          winston.format.simple()
        )
      })
    ]
  })
} else {
  const customLevelOpt = {
    levels: {
      fatal: 0,
      error: 1,
      warning: 2,
      info: 3,
    },
    colors: {
      fatal: "red",
      error: "yellow",
      warning: "cyan",
      info: "blue",
    }
  }

  logger = winston.createLogger({
    levels: customLevelOpt.levels,
    transports: [
      new winston.transports.File({
        filename: './errors.html',
        level: 'fatal',
        format: winston.format.combine(winston.format.simple())
      }),
      new winston.transports.File({
        filename: './errors.html',
        level: 'error',
        format: winston.format.combine(winston.format.simple())
      }),
      new winston.transports.File({
        filename: './loggers.html',
        level: 'warning',
        format: winston.format.combine(winston.format.simple())
      }),
      new winston.transports.File({
        filename: './loggers.html',
        level: 'info',
        format: winston.format.combine(winston.format.simple())
      })
    ]
  })
}

export const addLogger = (req, res, next) => {
  req.logger = logger,
    req.logger.info(`${req.method} es ${req.url} - ${new Date().toLocaleTimeString()}`)
  next()
}

