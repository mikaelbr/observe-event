// As Node not yet supports Object.observe, you'll need to use a shim
// The shim is not perfect and doesn't support all of Object.observe's
// features.


require('observe-shim');
var ObserveUtils = require('observe-utils');
var eObserve = require('../');

var myObject = {
  "foo": "hello",
  "bar": "world"
};
ObserveUtils.defineObservableProperties(myObject, "foo", "bar");
var o = eObserve(myObject)

o.on('any', function (changes) {
    console.log("Any:", changes);
});

o.on('update', function (changes) {
    console.log("Update:", changes);
});

myObject.foo = "Hello";
myObject.bar = "Observe";