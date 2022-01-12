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
      
      expect(function () {
        expect(page).to.include.locals([ 'subtitle', 'title' ]);
      }).to.throw("expected { Object (title, description) } to contain keys 'subtitle', and 'title'");
      
      expect(function () {
        expect(page).to.not.include.locals([ 'title' ]);
      }).to.throw("expected { Object (title, description) } to not contain key 'title'");
      
      expect(function () {
        expect(page).to.include.any.locals([ 'subtitle', 'url' ]);
      }).to.throw("expected { Object (title, description) } to have keys 'subtitle', or 'url'");
      
      expect(function () {
        expect(page).to.not.include.any.locals([ 'subtitle', 'title' ]);
      }).to.throw("expected { Object (title, description) } to not have keys 'subtitle', or 'title'");
      
      expect(function () {
        expect(page).to.include.all.locals([ 'title' ]);
      }).to.throw("expected { Object (title, description) } to have key 'title'");
      
      expect(function () {
        expect(page).to.include.all.locals([ 'subtitle', 'title', 'description' ]);
      }).to.throw("expected { Object (title, description) } to have keys 'subtitle', 'title', and 'description'");
      
      expect(function () {
        expect(page).to.not.include.all.locals([ 'title', 'description' ]);
      }).to.throw("expected { Object (title, description) } to not have keys 'title', and 'description'");
      
      expect(function () {
        expect({}).to.have.locals({ foo: 'bar' });
      }).to.throw('expected {} to be an instance of Page');
      
      expect(function () {
        expect(new Page()).to.have.locals({ foo: 'bar' });
      }).to.throw("expected { Object (_events, _eventsCount, ...) } to have property 'locals'");
    }); // locals method
    
    it('content method', function() {
      var page = new Page();
      page._content = '# Hello';
      expect(page).to.have.content('# Hello');
      expect(page).to.beginWith.content('# H')
      
      expect(function () {
        expect(page).to.have.content('# Goodbye');
      }).to.throw("expected page to have content '# Goodbye' but had '# Hello'");
      
      expect(function () {
        expect(page).to.not.have.content('# Hello');
      }).to.throw("expected page to not have content '# Hello'");
      
      expect(function () {
        expect(page).to.beginWith.content('# G');
      }).to.throw("expected page to begin with content '# G' but began with '# H'");
      
      expect(function () {
        expect(page).to.not.beginWith.content('# H');
      }).to.throw("expected page to not begin with content '# H'");
      
      expect(function () {
        expect({}).to.have.content('# Hello');
      }).to.throw('expected {} to be an instance of Page');
      
      expect(function () {
        expect(new Page()).to.have.content('# Hello');
      }).to.throw("expected { Object (_events, _eventsCount, ...) } to have property '_content'");
    }); // content method
    
  });
  
});
