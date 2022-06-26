var Page = require('./page');


var page = Object.create(Page.prototype)

module.exports = page;

Page.prototype.render = function(layout, options) {
  this._layout = layout;
  this._renderOptions = options;
  this.end();
};

Page.prototype.compile = function(content, format, layout) {
  this._content = content;
  this._format = format;
  this.render(layout);
};
