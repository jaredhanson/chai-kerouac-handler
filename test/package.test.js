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
      }).to.throw("expected { Object (_events, _eventsCount, ...) } to have property '_layout'");
    }); // render method
    
    it('locals method', function() {
      var page = new Page();
      page.locals = Object.create(null);
      page.locals.title = 'Example';
      page.locals.description = 'This website is for use in illustrative examples.';
      
      expect(page).to.have.locals({ title: 'Example' });
      expect(page).to.have.deep.locals({ title: 'Example', description: 'This website is for use in illustrative examples.' });
      expect(page).to.include.locals([ 'title' ]);
      expect(page).to.include.any.locals([ 'subtitle', 'title' ]);
      expect(page).to.include.all.locals([ 'title', 'description' ]);
      
      expect(function () {
        expect(page).to.have.locals({ subtitle: 'alice', title: 'Alice' });
      }).to.throw("expected { Object (title, description) } to have property 'subtitle'");
      
      expect(function () {
        expect(page).to.not.have.locals({ title: 'Example' });
      }).to.throw("expected { Object (title, description) } to not have property 'title' of 'Example'");
      
      
      expect(function () {
        expect(page).to.have.deep.locals({ subtitle: 'An illustrative website', title: 'Example', description: 'This website is for use in illustrative examples.' });
      }).to.throw("expected { Object (title, description) } to deeply equal { Object (subtitle, title, ...) }");
      
      expect(function () {
        expect(page).to.not.have.deep.locals({ title: 'Example', description: 'This website is for use in illustrative examples.' });
      }).to.throw("expected { Object (title, description) } to not deeply equal { Object (title, description) }");
      
      /*
      expect(function () {
        expect(res).to.include.locals([ 'username', 'name' ]);
      }).to.throw("expected { Object (title, description) } to contain keys 'username', and 'name'");
      
      expect(function () {
        expect(res).to.not.include.locals([ 'name' ]);
      }).to.throw("expected { Object (title, description) } to not contain key 'name'");
      
      expect(function () {
        expect(res).to.include.any.locals([ 'username', 'email' ]);
      }).to.throw("expected { Object (title, description) } to have keys 'username', or 'email'");
      
      expect(function () {
        expect(res).to.not.include.any.locals([ 'username', 'name' ]);
      }).to.throw("expected { Object (title, description) } to not have keys 'username', or 'name'");
      
      expect(function () {
        expect(res).to.include.all.locals([ 'name' ]);
      }).to.throw("expected { Object (title, description) } to have key 'name'");
      
      expect(function () {
        expect(res).to.include.all.locals([ 'username', 'name', 'csrfToken' ]);
      }).to.throw("expected { Object (title, description) } to have keys 'username', 'name', and 'csrfToken'");
      
      expect(function () {
        expect(res).to.not.include.all.locals([ 'name', 'csrfToken' ]);
      }).to.throw("expected { Object (title, description) } to not have keys 'name', and 'csrfToken'");
      
      expect(function () {
        expect({}).to.have.locals({ foo: 'bar' });
      }).to.throw('expected {} to be an instance of Response');
      
      expect(function () {
        expect(new Response()).to.have.locals({ foo: 'bar' });
      }).to.throw("expected { Object (_events, _eventsCount, ...) } to have property 'locals'");
      */
    }); // locals method
    
  });
  
});
