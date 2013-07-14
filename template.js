/*
 * grunt-init-ghpages
 * https://github.com/assemble/grunt-init-ghpages
 *
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT license.
 */

'use strict';

var path  = require('path');

// Basic template description.
exports.description = 'Build gh-pages documentation from a project README. Node.js alternative to Jekyll.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'For more information about creating Assemble projects, ' +
  'please see the docs at http://assemble.io';

// Template-specific notes to be displayed after question prompts.
exports.after = 'Now install project dependencies with "npm install".' +
  'After that, you may execute project tasks with "grunt assemble". For ' +
  'more information about installing and configuring Assemble, please ' +
  'visit:' +
  '\n\n' +
  'http://assemble.io';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = ['*'];

// The actual init template.
exports.template = function(grunt, init, done) {

  // Use lodash mixin to create sublime text project file
  // when a new project is created. Delete related files
  // if you don't want them ;-)
  grunt.util._.mixin(require('./lib/mixins').init(grunt));

  init.process({type: 'assemble'}, [
    // Prompt for these values.
    init.prompt('name', 'foo'),
    {
      name: 'description',
      message: 'Description',
      default: 'Documentation for the best project on GitHub.',
      warning: 'May consist of any characters.'
    },
    init.prompt('version'),
    init.prompt('author_name'),
    init.prompt('author_url'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses'),
    init.prompt('grunt_version'),
    {
      name: 'assemble_version',
      message: 'What versions of Assemble does it require?',
      default: '~0.4.0',
      warning: 'Must be a valid semantic version range descriptor.'
    },
  ], function(err, props) {

    // Set a few grunt-plugin-specific properties.
    props.keywords   = ['assemble', 'generate gh-pages', 'build gh-pages', 'alternative to jekyll'];
    props.devDependencies = {
      'grunt': '~0.4.1',
      'assemble': props.assemble_version
    };
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};