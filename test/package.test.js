/* global describe, it */

var expect = require('chai').expect;
var chai = require('chai');
var helper = require('..');


before(function() {
  chai.use(helper);
});

describe('chai-kerouac-handler', function() {
  
  it('should add kerouac helper to chai', function() {
    expect(chai.kerouac).to.be.an('object');
    expect(chai.kerouac.page).to.be.a('function');
  });
  
});
