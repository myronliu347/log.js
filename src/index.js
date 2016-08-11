import Log from './Log'
import config from './config'
import {register, generate} from './appenders'
generate()

let log = new Log('log.js')

log.version = '0.2.0'

log._config = config

log.config = function (op) {
  if (!op) return
  for (var key in op) {
    if (config[key] !== undefined) config[key] = op[key]
  }
  if (op.appenders) generate()
}

log.appender = register
log.generate = generate

log.create = function (name) {
  if (!name) log.warn('please input name')
  return new Log(name || 'null')
}

export default log
