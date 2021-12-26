var setPrototypeOf = require('setprototypeof');
var pgx = require('../page-ex');


exports = module.exports = function() {
  var page = Object.create(pgx);

  return function init(pg, next) {
    setPrototypeOf(pg, page);
    
    pg.params = pg.params || {};
    pg.locals = pg.locals || Object.create(null);
    next();
  };
};
