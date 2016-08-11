import config from './config'
import {
  eqOrIn,
  getNowStr,
  slice
} from './utils'

import {appenders} from './appenders'
export default class Log {

  constructor (name) {
    this.name = name
  }

  debug () {
    this._print('debug', arguments)
    return this
  }

  info () {
    this._print('info', arguments)
    return this
  }

  warn () {
    this._print('warn', arguments)
    return this
  }

  error () {
    if (config.throwError) {
      throw new Error(arguments)
    } else {
      this._print('error', arguments)
    }
    return this
  }

  _print (level, args) {
    if (!this._canLog(level)) return
    args = slice(args)
    let obj = {
      time: getNowStr(),
      name: this.name,
      args: args,
      level: level
    }
    if (appenders && appenders.length > 0) {
      for (let i = 0; i < appenders.length; i++) {
        appenders[i](obj)
      }
    }
  }

  _canLog (level) {
    if (!config.level || (config.level !== true && !eqOrIn(config.level, level))) return false
    return true
  }
}
