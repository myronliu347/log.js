import {
  slice
} from '../utils'
export default function (options) {
  return function (logInfo) {
    var args = slice(logInfo.args)
    args.unshift('[' + logInfo.name + ']' + (options.printTime ? '[' + logInfo.timeStr + ']' : '') + ':')
    let level = logInfo.level
    if (level === 'debug') level = 'log'
    if (console) console[level].apply(console, args)
  }
}
