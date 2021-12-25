exports = module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.kerouac = chai.kerouac || {};
  chai.kerouac.use = function(callbacks) {
    return new Test(callbacks);
  };
};
