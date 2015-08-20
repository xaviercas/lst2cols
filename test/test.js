/**
 * Created by xavier on 19/08/2015.
 */

// Options
// var o = {
//   colNum: 3,
//   method: 'tb',
//   colClass: 'col col-lr',
//   colBlockClass: 'col-block blah'
// };

// ===========================================================
// Test throws
// ===========================================================

QUnit.test('Throws', function(assert) {

  'use strict';

  assert.throws(function() {
    return $('#t-empty').lst2cols();
  }, 'Zero item throws an error');

  assert.throws(function() {
    return $('#t-one').lst2cols();
  }, 'Only 1 item throws an error');

  assert.throws(function() {
    return $('#t-1').lst2cols({colNum: 1});
  }, 'Zero or one column throws an error');

  assert.throws(function() {
    return $('#t-1').lst2cols({method: 'abc'});
  }, 'Wrong method throws an error');

});

// ===========================================================
// Check classes
// ===========================================================

QUnit.test('Classes', function(assert) {

  'use strict';

  assert.ok($('#t-1').lst2cols().hasClass('col-block'),
      'ul must have default class: col-block');

  assert.ok($('#t-2').lst2cols({colBlockClass: 'test'}).hasClass('test'),
      'ul must receive class: test passed as option');

  // Top to bottom method
  assert.ok($('#t-3').lst2cols().children('li').hasClass('col'),
      'tb method li first descendant must have default class: col');

  assert.ok($('#t-4').lst2cols({colClass: 'test'}).children('li').hasClass('test'),
      'tb method li first descendant must receive class: test passed as option');

  // Left to right method
  assert.ok($('#t-5').lst2cols({method: 'lr'}).children('li').hasClass('col'),
      'lr method li first descendant must have default class: col');

  assert.ok($('#t-6').lst2cols({method: 'lr', colClass: 'test'}).children('li').hasClass('test'),
      'lr method li first descendant must receive class: test passed as option');
});

// ===========================================================
// Number of columns expected
// ===========================================================

QUnit.test('Column count', function(assert) {

  'use strict';

  var o = {
    colNum: 3,
    method: 'tb'
  };

  // tb method
  assert.equal($('#t-1').lst2cols().children('li').length, 2,
      'tb method default to 2 columns');

  assert.equal($('#t-2').lst2cols(o).children('li').length, 3,
      'tb method set to 3 columns');

  o.colNum = 10;
  assert.equal($('#t-3').lst2cols(o).children('li').length, 8,
      'tb method set to 10 columns too many should create 8 (1 item per column)');

  // lr method
  o.method = 'lr';

  assert.equal($('#t-4').lst2cols({method: 'lr'}).children('li').length, 2,
      'lr method default to 2 columns');

  o.colNum = 3;
  assert.equal($('#t-5').lst2cols(o).children('li').length, 9,
      'lr method set to 3 columns');

  o.colNum = 10;
  assert.equal($('#t-6').lst2cols(o).children('li').length, 8,
      'lr method set to 10 columns too many should create 8 (1 item per column)');
});

// ===========================================================
// Number of items per column expected
// ===========================================================

QUnit.test('Item count per column', function(assert) {

  'use strict';

  // List has eight element
  // Split into 3 columns
  // col-1 should contain 1 ul, 3 li
  // col-2 should contain 1 ul, 3 li
  // col-3 should contain 1 ul, 2 li

  var o = {
    colNum: 3
  };

  // tb method
  assert.equal($('#t-1').lst2cols(o).find('li.col-1 ul').children('li').length, 3,
      'tb method 1 of 3 column has 3 items');

  assert.equal($('#t-2').lst2cols(o).find('li.col-2 ul').children('li').length, 3,
      'tb method 2 of 3 column has 3 items');

  assert.equal($('#t-3').lst2cols(o).find('li.col-3 ul').children('li').length, 2,
      'tb method 3 of 3 column has 2 items');

  // Even distribution
  assert.equal($('#t-4').lst2cols().find('li.col-1 ul').children('li').length, 4,
      'tb method 1 of 2 column has 4 items');

  assert.equal($('#t-5').lst2cols().find('li.col-2 ul').children('li').length, 4,
      'tb method 2 of 2 column has 4 items');

  // lr method
  o.method = 'lr';
  assert.equal($('#t-6').lst2cols(o).find('li.col-1 ul').children('li').length, 3,
      'lr method 1 of 3 column has 3 items');

  assert.equal($('#t-7').lst2cols(o).find('li.col-2 ul').children('li').length, 3,
      'lr method 2 of 3 column has 3 items');

  assert.equal($('#t-8').lst2cols(o).find('li.col-3 ul').children('li').length, 2,
      'lr method 3 of 3 column has 2 items');

  // Even distribution
  assert.equal($('#t-9').lst2cols({method: 'lr'}).find('li.col-1 ul').children('li').length, 4,
      'lr method 1 of 2 column has 4 items');

  assert.equal($('#t-10').lst2cols({method: 'lr'}).find('li.col-2 ul').children('li').length, 4,
      'lr method 2 of 2 column has 4 items');
});

// ===========================================================
// Check html for one item in column and many items in column
// ===========================================================
// @todo reworked below and add test for lr method
QUnit.test('Html for tb', function(assert) {

  'use strict';

  var o = {
    colNum: 8
  };

  // if single item in column, item should not contain <ul><li></li></ul> markup
  // but simply have a column class added to it

  assert.equal($('#t-1').lst2cols(o).children('li').length, 8,
      'created 8 columns');

  assert.equal($('#t-2').lst2cols(o).find('li.col-1 ul').length, 0,
      '8 columns contains no ul markup because single item each');

  assert.ok($('#t-3').lst2cols(o).children('li').hasClass('col'),
      'first descendant lis thus must have default class: col');

  assert.equal($('#t-4').lst2cols(o).children('li.col-1').html(), '1',
      'and first column html must be 1');

  // Multiple columns
  o.colNum = 4;

  assert.equal($('#t-5').lst2cols(o).children('li').length, 4,
      'created 4 columns');

  assert.equal($('#t-6').lst2cols(o).find('li.col-1 ul').length, 1,
      '1 of 4 columns contains ul markup because many items in columns');

  assert.equal($('#t-7').lst2cols(o).find('li.col-4 ul').length, 1,
      '4 of 4 columns contains ul markup because many items in columns');

  assert.ok($('#t-8').lst2cols(o).children('li').hasClass('col'),
      'tb method first descendant li thus must have default class: col');

  assert.equal($('#t-9').lst2cols(o).children('li.col-1').html(), '<ul><li>1</li><li>2</li></ul>',
      'tb method and first column html must be 1');
});
