/* global describe, it */

var expect = require('chai').expect;
var chai = require('chai');
var helper = require('..');
var Page = require('../lib/page');


before(function() {
  chai.use(helper);
});

describe('chai-kerouac-handler', function() {
  
  it('should add kerouac helper to chai', function() {
    expect(chai.kerouac).to.be.an('object');
    expect(chai.kerouac.page).to.be.a('function');
  });
  
  describe('chai.Assertion', function() {
    
    it('render method', function() {
      var page = new Page();
      page._layout = 'home';
      expect(page).to.render('home');
      
      expect(function () {
        expect(page).to.render('index');
      }).to.throw("expected page to render layout 'index' but rendered 'home'");
      
      expect(function () {
        expect(page).to.not.render('home');
      }).to.throw("expected page to not render layout 'home'");
      
      expect(function () {
        expect({}).to.render('home');
      }).to.throw('expected {} to be an instance of Page');
      
      expect(function () {
        expect(new Page()).to.render('home');
      }).to.throw("expected { Object (_events, _eventsCount, ...) } to have a property '_layout'");
    }); // render method
    
  });
  
});
