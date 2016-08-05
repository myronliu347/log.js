import config from './config'
import {
  eqOrIn,
  getNowStr,
  slice
} from './utils'
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
    let name = '[' + this.name + ']'
    let timeStr = config.printTime ? '[' + getNowStr() + ']' : ''
    args.unshift(name + timeStr + ':')
    if (level === 'debug') level = 'log'
    console[level].apply(console, args)
  }

  _canLog (level) {
    if (!console || (!config.level || (config.level !== true && !eqOrIn(config.level, level)))) return false
    return true
  }
}
