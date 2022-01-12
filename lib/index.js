var Page = require('./page');


exports = module.exports = function(chai, utils) {
  var Test = require('./test');
  
  chai.kerouac = chai.kerouac || {};
  chai.kerouac.page = function(callbacks) {
    return new Test(callbacks);
  };
  
  
  var Assertion = chai.Assertion;
  
  /**
   * Assert that a page has rendered the supplied layout.
   *
   * ```js
   * expect(page).to.render('home');
   * ```
   *
   * @function
   * @name render
   * @param {String} layout
   * @access public
   */
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
  
  /**
   * Assert that a page has the supplied local variables.
   *
   * ```js
   * expect(page).to.have.locals({ name: 'Alice' });
   * ```
   *
   * To assert that a page has defined the supplied local variables, without
   * asserting the values of those variables, use an `include` chain.
   *
   * ```js
   * expect(page).to.include.locals([ 'name' ])
   * ```
   *
   * @function
   * @name locals
   * @param {Object|Array} locals
   * @access public
   */
  Assertion.addMethod('locals', function(locals) {
    var obj = this._obj;
    
    new Assertion(obj).to.be.an.instanceof(Page);
    new Assertion(obj).to.have.property('locals');
    
    var assertion;
    var deep = utils.flag(this, 'deep');
    var contains = utils.flag(this, 'contains');
    var all = utils.flag(this, 'all');
    var any = utils.flag(this, 'any');
    
    if (contains && (all !== undefined || any !== undefined)) {
      assertion = new Assertion(obj.locals);
      utils.transferFlags(this, assertion, false);
      // This assertion method is reinterpreting `.include` to mean "defined".
      // Since `.include` combined with `.all` asserts that the target’s keys
      // be a superset of the expected keys, rather than identical sets, the
      // `contains` flag is explicitly disabled to operate as if `.include`
      // isn't present in the chain, thus requiring an identical set.
      utils.flag(assertion, 'contains', false);
      assertion.have.keys(locals);
    } else if (contains) {
      assertion = new Assertion(obj.locals);
      utils.transferFlags(this, assertion, false);
      // Combine the `all` flag with `contains` to require that the target's
      // keys be a superset of the expected keys.
      utils.flag(assertion, 'all', true);
      assertion.have.keys(locals);
    } else if (deep) {
      assertion = new Assertion(obj.locals);
      utils.transferFlags(this, assertion, false);
      assertion.deep.equal(locals);
    } else {
      assertion = new Assertion(obj.locals);
      utils.transferFlags(this, assertion, false);
      // Use of `include()` in the default condition, rather than `equals()`,
      // is done because testing locals set by the handler for strict equality
      // is nonsensical due to the fact that the test case will never have a
      // reference to the exact object which is owned by the handler.
      //
      // Furthermore, using `include()` in the default condition allows tests
      // which check the value of a (subset of) response local variables to be
      // written concisely in natural language:
      //
      //     expect(res).to.have.locals({ name: 'Alice' });
      //
      // If the test wants to check the value of all response local variables,
      // a deep assertion can be expressed:
      //
      //     expect(res).to.have.deep.locals({
      //       name: 'Alice',
      //       csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql'
      //     });
      assertion.include(locals);
    }
  });

  Assertion.addMethod('content', function(content) {
    var obj = this._obj;
    
    new Assertion(obj).to.be.an.instanceof(Page);
    new Assertion(obj).to.have.property('_content');
    
    var starts = utils.flag(this, 'starts');
    
    if (starts) {
      this.assert(
          obj._content.indexOf(content) === 0
        , 'expected page to begin with content #{exp} but began with #{act}'
        , 'expected page to not begin with content #{act}'
        , content  // expected
        , obj._content.slice(0, content.length)  // actual
      );
    } else {
      this.assert(
          obj._content == content
        , 'expected page to have content #{exp} but had #{act}'
        , 'expected page to not have content #{act}'
        , content  // expected
        , obj._content  // actual
      );
    }
  });
  
  Assertion.addChainableMethod('beginWith', function(str) {
    var obj = this._obj;
    
    this.assert(
        obj.indexOf(str) === 0
      , 'expected #{act} to begin with #{exp}'
      , 'expected #{act} to not begin with #{exp}'
      , str  // expected
      , obj  // actual
    );
  }, function() {
    utils.flag(this, 'starts', true);
  });
  
};
