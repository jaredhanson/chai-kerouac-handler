var Page = require('./page');


var page = Object.create(Page.prototype)

module.exports = page;

Page.prototype.render = function(layout) {
  this._layout = layout;
  this.end();
};

Page.prototype.compile = function(content, type, layout) {
  this._content = content;
  this._type = type;
  this.render(layout);
};
