/*
 * @flow
 */

import isEmpty from 'lodash/isEmpty';
import isError from 'lodash/isError';
import isString from 'lodash/isString';
import log from 'loglevel';
import { format } from 'date-fns';

// injected by Webpack.DefinePlugin
declare var __ENV_DEV__ :boolean;
declare var __ENV_PROD__ :boolean;
declare var __PACKAGE__ :string;

const LOG_LEVELS = {
  TRACE: 'trace',
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

if (__ENV_DEV__) {
  log.setLevel(log.levels.TRACE);
}
else if (!__ENV_DEV__ && !__ENV_PROD__) {
  log.setLevel(log.levels.SILENT);
}
else {
  log.setLevel(log.levels.INFO);
}

function isNonEmptyString(value :any) :boolean {

  return isString(value) && !isEmpty(value);
}

function getMessagePrefix(loggerLevel :string, loggerName :string) :string {

  return `[${format(new Date(), TIMESTAMP_FORMAT)} ${loggerLevel.toUpperCase()} ${__PACKAGE__}] ${loggerName}`;
}

export default class Logger {

  logger :Object;
  name :string;

  constructor(name :string) {

    this.logger = log.getLogger(name);
    this.name = name;
  }

  log(logLevel :string, message :any, ...args :any[]) :void {

    const messagePrefix = getMessagePrefix(logLevel, this.name);

    if (isNonEmptyString(message)) {
      this.logger[logLevel](`${messagePrefix} - ${message}`);
    }
    else {
      this.logger[logLevel](messagePrefix);
      if (logLevel !== LOG_LEVELS.TRACE) {
        if (isError(message) || !isEmpty(message)) {
          this.logger[logLevel](message);
        }
      }
    }

    if (args.length > 0) {
      this.logger[logLevel](...args);
    }
  }

  trace(message :any) :void {

    this.log(LOG_LEVELS.TRACE, message);
  }

  debug(message :any, ...args :any[]) :void {

    this.log(LOG_LEVELS.DEBUG, message, ...args);
  }

  info(message :any, ...args :any[]) :void {

    this.log(LOG_LEVELS.INFO, message, ...args);
  }

  warn(message :any, ...args :any[]) :void {

    this.log(LOG_LEVELS.WARN, message, ...args);
  }

  error(message :any, ...args :any[]) :void {

    this.log(LOG_LEVELS.ERROR, message, ...args);
  }
}
