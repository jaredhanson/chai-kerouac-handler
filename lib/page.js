/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter
  , util = require('util');


/**
 * Creates an instance of `Page`.
 *
 * This class is used as a mock when testing Kerouac middleware, substituted in
 * place of of a Kerouac's `Page`.
 *
 * @constructor
 * @api protected
 */
function Page() {
  EventEmitter.call(this);
  
  this.locals = {};
  this._data = '';
}

util.inherits(Page, EventEmitter);

Page.prototype.render = function(layout) {
  this._layout = layout;
  this.end();
}

Page.prototype.write = function(data) {
  if (data) { this._data += data; }
};

Page.prototype.end = function(data) {
  if (data) { this._data += data; }
  if (this._data.length) { this.body = this._data; }
  
  this.emit('finish');
};


/**
 * Expose `Response`.
 */
module.exports = Page;
