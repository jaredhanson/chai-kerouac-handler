var Page = require('./page');


var page = Object.create(Page.prototype)

module.exports = page;

Page.prototype.render = function(layout, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = undefined;
  }
  
  this._layout = layout;
  this._renderOptions = options;
  
  if (cb) {
    return cb();
  }
  this.end();
};

Page.prototype.compile = function(content, format, layout, cb) {
  this._content = content;
  this._format = format;
  this.render(layout, cb);
};
