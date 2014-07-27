'use strict';

var EventEmitter = require('events').EventEmitter;

if (!hasObserve()) {
  throw new Error('observe-event requires Object.observe. Try the shim: https://github.com/KapIT/observe-shim');
}

module.exports = function (object, optAcceptList) {
  var e = new EventEmitter();
  Object.observe(object, translateToEmitsOn(e), optAcceptList);
  return e;
};

function translateToEmitsOn (emitter) {
  return function (changes) {
    changes.forEach(function (change) {
      [change.type, 'any'].forEach(function (name) {
        emitter.emit(name, change);
      });
    });
  };
}

function hasObserve () {
  return 'observe' in Object;
}