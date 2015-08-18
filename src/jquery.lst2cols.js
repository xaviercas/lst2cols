/**
 * @preserve jquery.lst2cols.js
 * Jquery plugin to columnise an html list
 * ==============================================
 * @author xavier@ekkocreatives.com (Xavier)
 * @license Licence MIT
 * Copyright (c) 2015 Xavier Castagne
 */

(function($) {

  'use strict';

  $.fn.lst2cols = function(options) {
    // Merge settings
    var settings = $.extend(
        {},
        {
          // Number of column
          colNum: 2,

          // Method top to bottom or left to right
          method: 'tb',

          // Class applied to col container
          colBlockClass: 'col-block',

          // Class applied to col
          colClass: 'col'
        },
        options);

    // Items to columnise
    settings.colItems = this.children();

    // Number of items to columnise
    settings.l = settings.colItems.length;

    // Run plugin
    return this.each(function() {

      // Don't do 1 column, or non-existent method
      if (settings.colNum <= 1 || settings.l <= 1)return null;
      if (settings.method !== 'tb') {
        if (settings.method !== 'lr') return null;
      }

      var e = $(this);

      // Add a class to columns parent
      e.addClass(settings.colBlockClass);

      // Run private methods
      // @todo what if only 1 item per column
      // @todo data-attrib from item 0 to item n
      if (settings.method === 'tb') e.html(tb_columns(settings));
      if (settings.method === 'lr') e.html(lr_columns(settings));

      return e;
    });
  };

  /**
   * Columnise reading from top to bottom
   * @param   {object} s
   * @return  {string}
   */
  function tb_columns(s) {

    // Base num of item / column
    var itemsPerCol = Math.floor(s.l / s.colNum);

    // Remaining items to distribute
    // across columns
    var itemsToDistribute = s.l % s.colNum;

    // Array key, html output
    var key = 0, classAtr = '', html = '';

    // Loop on columns
    for (var i = 0; i < s.colNum; i++) {

      // Num of items for current column
      var itemsCurCol = itemsToDistribute ? itemsPerCol + 1 : itemsPerCol;

      // Adjust items to distribute next
      if (itemsToDistribute) itemsToDistribute--;

      // Exit if we have more cols than items
      if (itemsCurCol < 1) break;

      // css
      classAtr = 'col' + '-' + i + ' ' + s.colClass;

      if (itemsCurCol === 1) {

        // Only one item in column, no html, add col classes t item
        html += $(s.colItems[key]).first().addClass(classAtr).prop('outerHTML');
        key++;
      } else {

        // More than one item wrap up in li.col and ul
        html += '<li class="' + classAtr + '"><ul>';

        // Grabs the number of items to put in column
        // Using for loop because faster then $.each
        // or using $.slices of items array
        for (var j = 0; j < itemsCurCol; j++) {
          html += $(s.colItems[key]).prop('outerHTML');
          key++;
        }
        html += '</ul></li>';
      }
    }
    return html;
  }

  /**
   * Columnise reading left to right
   * @param   {object} s
   * @return  {string}
   */
  function lr_columns(s) {

    var key = 0, columnArr = [], html = '';

    // Distribute items across columns
    for (var i = 0; i < s.l; i++) {
      // for column [key] init array
      if (typeof columnArr[key] === 'undefined') columnArr[key] = [];

      // Return to first column
      key = key < s.colNum ? key : 0;

      // Insert items into list
      columnArr[key][i] = $(s.colItems[i]).prop('outerHTML');
      key++;
    }

    // Build html
    for (var j = 0; j < s.colNum; j++) {
      html += '<li class="col' + '-' + j + ' ' + s.colClass + '"><ul>';
      html += columnArr[j].join(' ');
      html += '</ul></li>';
    }
    return html;
  }
})(jQuery);
