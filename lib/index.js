var Page = require('./page');


exports = module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.kerouac = chai.kerouac || {};
  chai.kerouac.page = function(callbacks) {
    return new Test(callbacks);
  };
  
  
  var Assertion = chai.Assertion;
  
  Assertion.addMethod('render', function(layout) {
    var obj = this._obj;
    
    new Assertion(obj).to.be.an.instanceof(Page);
    new Assertion(obj).to.have.property('_layout');
    
    this.assert(
        obj._layout == layout
      , 'expected page to render layout #{exp} but rendered #{act}'
      , 'expected page to not render layout #{act}'
      , layout  // expected
      , obj._layout  // actual
    );
  });
};
