/*
 * {%= name %}
 * https://github.com/{%= author_name %}/{%= name %}
 * Copyright (c) {%= grunt.template.today('yyyy') %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
 grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: 'assets'
        },
        files: {
          'index.html': ['src/index.hbs']
        }
      }
    }

  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');

  // Default tasks to be run.
  grunt.registerTask('default', ['assemble']);
};

