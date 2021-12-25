/**
 * Module dependencies.
 */
var Page = require('./page')
  , flatten = require('array-flatten')
  , slice = Array.prototype.slice;


/**
 * Creates an instance of `Test`.
 *
 * @constructor
 * @api protected
 */
function Test(callbacks) {
  this._callbacks = flatten(slice.call(arguments, 0));
}

/**
 * Register a callback to be invoked when page is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.page = function(cb) {
  this._page = cb;
  return this;
};

/**
 * Register a callback to be invoked when handler `end()`s response.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.end = function(cb) {
  this._end = cb;
  return this;
};

/**
 * Register a callback to be invoked when handler calls `next()`.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.next = function(cb) {
  this._next = cb;
  return this;
};

/**
 * Register a callback to be invoked when handler `render()`s response.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.render = function(cb) {
  this._render = cb;
  return this;
};

/**
 * Dispatch mock request to handler.
 *
 * @api public
 */
Test.prototype.dispatch = function(err) {
  var self = this
    , before = this._page;
  
  var page = new Page(
    function onrender(layout) {
      if (!self._render) { throw new Error('page#render should not be called'); }
      self._render.call(this, this, layout);
    },
    function() {
      if (!self._end) { throw new Error('page#end should not be called'); }
      self._end.call(this, page);
    });
  
  function ready() {
    function next(err) {
      if (!self._next) { throw new Error('next should not be called'); }
      self._next.call(this, err);
    }
    
    var i = 0;
    function callbacks(err) {
      var fn = self._callbacks[i++];
      if (!fn) { return next(err); }
      try {
        if (err) {
          if (fn.length < 3) { return callbacks(err); }
          fn(err, page, callbacks);
        } else {
          if (fn.length < 3) { return fn(page, callbacks); }
          callbacks();
        }
      } catch (err) {
        // NOTE: Route handlers are not expected to throw exceptions.  So, in
        //       the context of a unit test, exceptions are re-thrown, rather
        //       than being caught and passed to `next`.
        throw err;
      }
    }
    callbacks();
  }
  
  if (before && before.length == 2) {
    before(page, ready);
  } else if (before) {
    before(page);
    ready();
  } else {
    ready();
  }
};


/**
 * Expose `Test`.
 */
module.exports = Test;
