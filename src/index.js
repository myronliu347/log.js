import Log from './Log'
import config from './config'

let log = new Log('log.js')

log.version = '0.1.0'

log.config = config
log.create = function (name) {
  if (!name) log.warn('please input name')
  return new Log(name || 'null')
}
export default log
