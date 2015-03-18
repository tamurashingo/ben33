'use strict';

describe('Utilサービス', function () {

  var Util;

  beforeEach(inject(function () {
    var $injector = angular.injector(['ben33App']);
    Util = $injector.get('Util');
  }));


  it('markdown basis', function () {
    expect(Util.md2html('hello world')).toBe('<p>hello world</p>\n');
    expect(Util.md2html('# hello world')).toBe('<h1 id="hello-world">hello world</h1>\n');
    expect(Util.md2html('hello world\n========')).toBe('<h1 id="hello-world">hello world</h1>\n');
  });
  
});
