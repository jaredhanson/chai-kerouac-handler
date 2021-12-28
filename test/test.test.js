/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var Test = require('../lib/test');
var Page = require('../lib/page');


describe('Test', function() {
  
  describe('#request', function() {
    
    it('should invoke sync callback', function(done) {
      chai.kerouac.page(function(page, next) {
        page.end();
      })
      .request(function(page) {
        expect(page).to.be.an.instanceof(Page);
      })
      .finish(done)
      .generate();
    }); // should invoke sync callback
    
    it('should invoke async callback', function(done) {
      chai.kerouac.page(function(page, next) {
        page.end();
      })
      .request(function(page, cb) {
        expect(page).to.be.an.instanceof(Page);
        cb();
      })
      .finish(done)
      .generate();
    }); // should invoke sync callback
    
  }); // #request
  
  describe('#finish', function() {
  
    it('should invoke callback', function(done) {
      chai.kerouac.page(function(page, next) {
        page.end();
      })
      .finish(function() {
        expect(this).to.be.an.instanceof(Page);
        done();
      })
      .generate();
    }); // should invoke callback
  
  }); // #finish
  
  describe('#next', function() {
  
    it('should invoke callback', function(done) {
      chai.kerouac.page(function(page, next) {
        next();
      })
      .next(function(err, page) {
        expect(this).to.be.an.instanceof(Test);
        expect(err).to.be.undefined;
        expect(page).to.be.an.instanceof(Page);
        done();
      })
      .generate();
    }); // should invoke callback
    
    it('should invoke callback with error', function(done) {
      chai.kerouac.page(function(page, next) {
        next(new Error('something went wrong'));
      })
      .next(function(err, page) {
        expect(this).to.be.an.instanceof(Test);
        expect(err).to.be.an.instanceof(Error);
        expect(page).to.be.an.instanceof(Page);
        done();
      })
      .generate();
    }); // should invoke callback with error
  
  }); // #next
  
});
