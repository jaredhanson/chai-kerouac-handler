/**
 * Module dependencies.
 */
var Page = require('./page')
  , middleware = require('./middleware')
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
  this._callbacks.unshift(middleware.init());
}

/**
 * Register a callback to be invoked when page is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.request = function(cb) {
  this._request = cb;
  return this;
};

/**
 * Register a callback to be invoked when handler `end()`s response.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.finish = function(cb) {
  this._finish = cb;
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
 * Dispatch mock request to handler.
 *
 * @api public
 */
Test.prototype.generate = function(err) {
  var self = this
    , page = new Page()
    , prepare = this._request;
  
  page.once('finish', function() {
    if (!self._finish) { throw new Error('page#end should not be called'); }
    self._finish.call(this);
  });
  
  function ready() {
    function next(err) {
      if (!self._next) { throw new Error('next should not be called'); }
      self._next.call(self, err, page);
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
  
  if (prepare && prepare.length == 2) {
    prepare(page, ready);
  } else if (prepare) {
    prepare(page);
    ready();
  } else {
    ready();
  }
};


/**
 * Expose `Test`.
 */
module.exports = Test;
