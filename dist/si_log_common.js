/*!
 * si_log.js v0.1.1
 * (c) 2016 Myron Liu
 * Released under the MIT License.
 */
'use strict';

var config = {
  level: true,
  throwError: false,
  printTime: false
};

var each = function each(loopable, callback) {
  if (loopable) {
    if (loopable.length === +loopable.length && loopable.length - 1 in loopable) {
      var i = void 0;
      for (i = 0; i < loopable.length; i++) {
        if (callback.call(loopable[i], loopable[i], i) === false) break;
      }
    } else {
      for (var key in loopable) {
        if (callback.call(loopable[key], loopable[key], key) === false) break;
      }
    }
  }
};

var isArray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};

var getNowStr = function getNowStr() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  var second = now.getSeconds();
  return year + '-' + fillZero(month) + '-' + fillZero(day) + ' ' + fillZero(hour) + ':' + fillZero(min) + ':' + fillZero(second);
};

var fillZero = function fillZero(num) {
  return num > 9 ? String(num) : '0' + String(num);
};

var eqOrIn = function eqOrIn(target, dest) {
  if (target === dest) return true;
  if (!isArray(target)) return false;
  var flag = false;
  each(target, function (level) {
    if (dest === level) return !(flag = true);
  });
  return flag;
};

var slice = function slice(arr, start, end) {
  var newArr = [];
  if (!arr) return newArr;
  if (!start) start = 0;
  if (!end || end > arr.length - 1) end = arr.length - 1;
  for (var i = 0; i < arr.length; i++) {
    if (i < start) continue;
    if (i > end) break;
    newArr.push(arr[i]);
  }
  return newArr;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Log = function () {
  function Log(name) {
    classCallCheck(this, Log);

    this.name = name;
  }

  createClass(Log, [{
    key: 'debug',
    value: function debug() {
      this._print('debug', arguments);
      return this;
    }
  }, {
    key: 'info',
    value: function info() {
      this._print('info', arguments);
      return this;
    }
  }, {
    key: 'warn',
    value: function warn() {
      this._print('warn', arguments);
      return this;
    }
  }, {
    key: 'error',
    value: function error() {
      if (config.throwError) {
        throw new Error(arguments);
      } else {
        this._print('error', arguments);
      }
      return this;
    }
  }, {
    key: '_print',
    value: function _print(level, args) {
      if (!this._canLog(level)) return;
      args = slice(args);
      var name = '[' + this.name + ']';
      var timeStr = config.printTime ? '[' + getNowStr() + ']' : '';
      args.unshift(name + timeStr + ':');
      if (level === 'debug') level = 'log';
      console[level].apply(console, args);
    }
  }, {
    key: '_canLog',
    value: function _canLog(level) {
      if (!console || !config.level || config.level !== true && !eqOrIn(config.level, level)) return false;
      return true;
    }
  }]);
  return Log;
}();

var log = new Log('log.js');

log.version = '0.1.1';

log.config = config;
log.create = function (name) {
  if (!name) log.warn('please input name');
  return new Log(name || 'null');
};

module.exports = log;