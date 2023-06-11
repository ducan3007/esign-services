import winston, { format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, printf } = format

export const logger = winston.createLogger({
  format: combine(
    format.errors({ stack: true }),
    format.splat(),
    format.timestamp({
      format: () => new Date().toLocaleString()
    }),
    format.printf((log) => {
      const { timestamp, level, message, ...args } = log
      const ts = timestamp.slice(0, 19).replace('T', ' ')
      return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`
    })
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      dirname: './logs/infos/',
      filename: 'info-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '2d',
      maxSize: '20m',
      zippedArchive: false,
      level: 'info'
    }),
    new DailyRotateFile({
      dirname: './logs/errors/',
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '2d',
      maxSize: '20m',
      zippedArchive: false,
      level: 'error'
    })
  ]
})
