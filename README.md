[![Build Status](https://travis-ci.org/xaviercas/lst2cols.svg?branch=master)](https://travis-ci.org/xaviercas/lst2cols)

# lst2cols

#### Jquery Plugin to Columnise an Html List

### Description

A simple, small and hopefully fast jquery plugin to turn an html list into columns. Originally created to work columns into 
multi level menus. The plugins adds `<ul>`'s and `<li>`'s to breakdown the list into columns, as well as a limited number 
of classes. (It does not add any css rules, you must supply your own css.) 

### Examples

http://xaviercas.github.io/lst2cols/


### Usage and Options

Vanilla: ` $('ul.my-list').lst2cols(); `

With options: ` $('ul.my-list').lst2cols({colNum:3, method:'lr'}); `

The plugin options are:

* `colNum` The number of column. Default is `2`.

* `method` The read direction top to bottom `tb` or left to right `lr`. Default is `tb`.

* `colClass` The class applied to columns. Default is `col`,
            
* `colBlockClass` The class applied to container for columns. Default is `col-block`

### License

The MIT License (MIT)

Copyright (c) 2015 Xavier Castagné

For Brodie