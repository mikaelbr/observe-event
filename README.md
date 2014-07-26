# observe-event [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]
> Make `Object.observe` emit events on every change

`Object.observe` is finally here and everyone is excited, but simply giving
one callback the observe can make it hard to manage and re-use observations.

This simple `Object.observe` wrapper will return an event emitter
instead that allows us to specify what type of change we want
and passing the emitter around. If we want to catch all type of
changes, we can do that too.

## API

```javascript
eObserve(object[, optAcceptList]) : EventEmitter
```

`optAcceptList` defines what type of changes to listen to.
If not defined, it defaults to all changes (see below).


### Events

The event emitter returned from `eObserve()`, emits changes
made to the observed object in a channel that is the same
as the type of change.

For instance:
```javascript
eObserve(object).on('update', callback);
```

In addition to [all types of changes as defined by the spec](http://wiki.ecmascript.org/doku.php?id=harmony:observe_public_api), a special channel exists to catch any change:

```javascript
// Will trigger on any change
eObserve(object).on('any', callback);
```

#### Event overview
* `any` – Triggered for all of the below
* `add`
* `update`
* `delete`
* `reconfigure`
* `setPrototype`
* `preventExtensions`

See the [harmony specs](http://wiki.ecmascript.org/doku.php?id=harmony:observe)
for more information of the different changes

## Install

### Install using NPM

```shell
npm install --save observe-event
```

### Install using Bower

```shell
bower install --save observe-event
```

### Install manually

Download [observe-event.js](./observe-event.js) and include in your HTML.
Remember to include [EventEmitter.js](https://github.com/Wolfy87/EventEmitter)
dependency. See [#manually-in-the-browser](for more details).

## Usage

###  Node.js / Browserify

```
var eObserve = require('observe-event');

var obj = { message: 'Hello World!' };
eObserve(obj).on('update', function (change) {
  // => change.object.message = "Hello, World!"
});

obj.message = 'Hello, World!';
```

See [example](./examples/node.js)


### Manually in the browser

Requires [EventEmitter.js](https://github.com/Wolfy87/EventEmitter)

```html
<script src="./vendors/eventemitter.js"></script>
<script src="../index.js"></script>
```

```javascript

var obj = { message: 'Hello World!' };
eObserve(obj).on('update', function (change) {
  // => change.object.message = "Hello, World!"
});

obj.message = 'Hello, World!';
```

See [example](./examples/index.html)


### Using AMD (Require.js etc)

**Not yet tested with AMD**

```javascript

require(["observe-event"], function(eObserve) {
  var obj = { message: 'Hello World!' };
  eObserve(obj).on('update', function (change) {
    // => change.object.message = "Hello, World!"
  });

  obj.message = 'Hello, World!';
});
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[![NPM downloads][npm-downloads]][npm-url]

[npm-url]: https://npmjs.org/package/observe-event
[npm-image]: http://img.shields.io/npm/v/observe-event.svg?style=flat
[npm-downloads]: http://img.shields.io/npm/dm/observe-event.svg?style=flat

[travis-url]: http://travis-ci.org/mikaelbr/observe-event
[travis-image]: http://img.shields.io/travis/mikaelbr/observe-event.svg?style=flat

[depstat-url]: https://gemnasium.com/mikaelbr/observe-event
[depstat-image]: http://img.shields.io/gemnasium/mikaelbr/observe-event.svg?style=flat