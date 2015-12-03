[TOC]
# 使用gulp管理项目

```javascript
var gulp            = require('gulp'),
    browserSync     = require('browser-sync').create(),
    reload          = browserSync.reload,
    sass            = require('gulp-sass'),
    cssmin          = require('gulp-minify-css'),
    autoprefixer    = require('gulp-autoprefixer'),
    useref          = require('gulp-useref'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    clean           = require('gulp-clean'),
    gulpif          = require('gulp-if'),
    htmlmin         = require('gulp-html-minifier
```
