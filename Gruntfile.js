/*
 * modules
 * https://github.com/crossjs/modules
 *
 * Copyright (c) 2013 crossjs
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: {
        files: {
          src: ['dist/**']
        }
      }
    },

    transport: {
      options: {
        debug: true,
        idleading: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['*.js'],
          dest: 'dist/',
          ext: '.js'
        }]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
        beautify: {
          'ascii_only': true
        },
        // mangle: true,
        compress: {
          'global_defs': {
            'DEBUG': false
          },
          'dead_code': true
        }
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['*.js', '!*-debug.js'],
          dest: 'dist/',
          ext: '.js'
        }]
      }
    }

  });

  grunt.registerTask('build', ['clean', 'transport', 'uglify']);

  grunt.registerTask('default', ['build']);

};
