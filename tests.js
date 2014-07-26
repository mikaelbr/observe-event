
var assert = require('assert');
var EventEmitter = require('events').EventEmitter;

describe('observe-event', function () {
  var orig = Object.observe;

  var eObserve;

  afterEach(function () {
    Object.observe = orig;
  });

  before(function () {
    Object.observe = function () { };
    eObserve = require('./');
  });

  it('should return an event emitter', function () {
    assert.ok(eObserve({}) instanceof EventEmitter);
  });


  it('should emit any event on update', function (done) {
    var mock = observeMock();
    Object.observe = mock.observe;

    eObserve({}).on('any', function (change) {
      assert.ok(change);
      assert.equal(change.type, 'update');
      assert.equal(change.object.test, 'test');
      done();
    });

    mock.trigger({
      'type': 'update',
      'object': {
        test: 'test'
      }
    });
  });

  it('should emit any event on delete', function (done) {
    var mock = observeMock();
    Object.observe = mock.observe;

    eObserve({}).on('any', function (change) {
      assert.ok(change);
      assert.equal(change.type, 'delete');
      done();
    });

    mock.trigger({
      'type': 'delete'
    });
  });

  it('should emit event on channel with type name of change', function (done) {
    var mock = observeMock();
    Object.observe = mock.observe;

    eObserve({}).on('update', function (change) {
      assert.ok(change);
      assert.equal(change.type, 'update');
      done();
    });

    mock.trigger({
      'type': 'update'
    });
  });

  it('should not emit event if change type is not allowed', function (done) {
    var mock = observeMock();
    Object.observe = mock.observe;

    // Only listen for update
    eObserve({}, ['update']).on('delete', function (change) {
      assert.ok(false);
    });

    assert.equal(mock.trigger({
      'type': 'delete'
    }, done), false);
  });

  it('should not emit on any channel if change type is not allowed', function (done) {
    var mock = observeMock();
    Object.observe = mock.observe;

    // Only listen for update
    eObserve({}, ['update']).on('any', function (change) {
      assert.ok(false);
    });

    assert.equal(mock.trigger({
      'type': 'delete'
    }, done), false);
  });

});

function observeMock () {
  var callback = null, allowed = null;

  var trigger = function (change, done) {
    done = done || function () {};

    if (!callback) return false;

    if (allowed && !(change.type in allowed)) {
      done();
      return false;
    }

    callback([change]);
    done();
  };
  var observe = function (object, cb, optAllow) {
    allowed = optAllow;
    callback = cb;
  };

  return {
    trigger: trigger,
    observe: observe
  };
}