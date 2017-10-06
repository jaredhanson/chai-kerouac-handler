exports = module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.kerouac = chai.connect || {};
  chai.kerouac.handler = function(callbacks) {
    return new Test(callbacks);
  };
};
