!(function (root) {
  'use strict';

  var factory = function (EventEmitter) {
    return function (object, optAcceptList) {
      var e = new EventEmitter();
      Object.observe(object, translateToEmitsOn(e), optAcceptList);
      return e;
    };
  }

  function translateToEmitsOn (emitter) {
    return function (changes) {
      changes.forEach(function (change) {
        [change.type, 'any'].forEach(function (name) {
          emitter.emit(name, change);
        });
      });
    };
  }

  if (typeof exports === 'object') {
    if (!hasObserve()) {
      throw new Error('observe-event requires Object.observe. Try the shim: https://github.com/KapIT/observe-shim');
    }
    module.exports = factory(require('events').EventEmitter);
  } else if (typeof define === 'function' && define.amd) {
    var deps = ['eventEmitter'];

    if (!hasObserve()) {
      deps.push('observe-shim');
    }

    define(deps, function (EventEmitter) {
      return factory(EventEmitter);
    });
  } else {
    if (!root.EventEmitter) {
      throw new Error('observe-event requires an EventEmitter to be installed. See https://github.com/Wolfy87/EventEmitter');
    }
    if (!hasObserve()) {
      throw new Error('observe-event requires Object.observe. Try the shim: https://github.com/KapIT/observe-shim');
    }
    root.eObserve = factory(root.EventEmitter);
  }

  function hasObserve () {
    return 'observe' in Object;
  }
}(this));