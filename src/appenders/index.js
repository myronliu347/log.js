import consoleAppender from './console'
let appenderMap = {}
export const register = function (name, appender) {
  appenderMap[name] = {}
}

export let appenders = []
export const generate = function (config) {
  clear(appenders)
  if (!config) {
    return appenders.push(consoleAppender({printTime: false}))
  }
  for (let key in config) {
    if (!appenderMap[key]) continue
    appenders.push(appenderMap[key](config[key]))
  }
  return appenders
}

function clear (arr) {
  if (!arr || arr.length === 0) return

  for (let i = 0; i < arr.length; i++) {
    arr.splice(i, 1)
    i--
  }
}

register('console', consoleAppender)
