export const each = function (loopable, callback) {
  if (loopable) {
    if (loopable.length === +loopable.length && loopable.length - 1 in loopable) {
      let i
      for (i = 0; i < loopable.length; i++) {
        if (callback.call(loopable[i], loopable[i], i) === false) break
      }
    } else {
      for (let key in loopable) {
        if (callback.call(loopable[key], loopable[key], key) === false) break
      }
    }
  }
}

export const isArray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

export const getNowStr = function () {
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var day = now.getDate()
  var hour = now.getHours()
  var min = now.getMinutes()
  var second = now.getSeconds()
  return year + '-' + fillZero(month) + '-' + fillZero(day) + ' ' + fillZero(hour) + ':' + fillZero(min) + ':' + fillZero(second)
}

export const fillZero = function (num) {
  return num > 9 ? String(num) : '0' + String(num)
}

export const eqOrIn = function (target, dest) {
  if (target === dest) return true
  if (!isArray(target)) return false
  var flag = false
  each(target, function (level) {
    if (dest === level) return !(flag = true)
  })
  return flag
}

export const slice = function (arr, start, end) {
  var newArr = []
  if (!arr) return newArr
  if (!start) start = 0
  if (!end || end > arr.length - 1) end = arr.length - 1
  for (var i = 0; i < arr.length; i++) {
    if (i < start) continue
    if (i > end) break
    newArr.push(arr[i])
  }
  return newArr
}
