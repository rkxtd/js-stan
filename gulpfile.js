var config = require('./gulp/config');
var gulp = require('gulp');
var gulpPlugins = require('gulp-load-plugins')();

require('./gulp/tasks')(gulp, gulpPlugins, config);