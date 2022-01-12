/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');


describe('Page', function() {
  
  describe('#render', function() {
  
    it('should render', function(done) {
      chai.kerouac.page(function(page, next) {
        var rv = page.render('index');
        expect(rv).to.be.undefined;
      })
      .finish(function() {
        expect(this._layout).to.equal('index');
        done();
      })
      .generate();
    }); // should render
  
  }); // #render
  
  describe('#compile', function() {
    
    it('should compile', function(done) {
      chai.kerouac.page(function(page, next) {
        var rv = page.compile('# Hello', 'md', 'index');
        expect(rv).to.be.undefined;
      })
      .finish(function() {
        expect(this._content).to.equal('# Hello');
        expect(this._type).to.equal('md');
        expect(this._layout).to.equal('index');
        done();
      })
      .generate();
    }); // should render
    
  });
  
});
