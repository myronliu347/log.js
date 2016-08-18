# log.js
前端日志工具库，简单的api，可以通过配置不同的 *level* 和 *appender* 来输出日志

## 开始使用

### 安装

```html
<script src="../si_log.js" charset="utf-8"></script>
```

或者

```shell
npm install si-log --save
```

### 使用


```javascript
siLog.debug('test debug level');
siLog.info('test info level');
siLog.warn('test warn level');
siLog.error('test error level');
```

![](run-img.png)

CommonJs

```javascript
var siLog = require('si-log')
siLog.debug('test debug level');
siLog.info('test info level');
siLog.warn('test warn level');
siLog.error('test error level');
```

ES6

```javascript
import siLog from 'si-log'

siLog.debug('test debug level');
siLog.info('test info level');
siLog.warn('test warn level');
siLog.error('test error level');
```

### 配置输出方式

```javascript
siLog.config({
  level: true
}); // output all level
siLog.config({
  level: false
}); // No output
siLog.config({
  level: ['error']
});  // only output error level
siLog.config({
  level: ['error', 'warn']
});  // only output error or warn
```

### 创建多个log对象

```javascript
// render.js
var log = siLog.create('render.js')
log.debug('test in render.js output')

// [render.js]: test in render.js output
```

### 配置输出方式

```javascript
siLog.config({
  appenders: {
    // console
    console: {
        printTime: true
    }
    // ...more
  }
})
```

### 自定义输出方式

```javascript
siLog.appender('test', fucntion (op) {
  return function (logInfo) {
    document.write('name:' + loginfo.name);
    if (op.printTime) document.write('time:' + loginfo.timeStr);
    document.write('args:' + JSON.stringify(logInfo.args));
  }
});

siLog.config({
  appenders: {
    test: {             // use test output log
      printTime: true
    }
  }
})
```

## API

### debug([args])

相当于 `console.log`

### info([args])

相当于 `console.info`

### warn([args])

相当于 `console.warn`

### error([args])

相当于 `console.error`

### create([name])

创建新的 Log 实例

### appender([name, appender])

注册一个 appender

### config(options)

修改配置

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 myron
