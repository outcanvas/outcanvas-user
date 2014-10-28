  'use strict';
  module.exports = function (grunt, init) {

    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      rewrite: {
        version: {
          src: '../outcanvas-dashboard.php',
          editor: function(contents, filePath) {
            var version = grunt.config.get('pkg.version');
            contents = contents.replace(/Version:(.)*/g, 'Version: ' + version);
            return contents;
          }
        }
      },

      prompt: {
        target: {
          options: {
            questions: [
              {
                config: 'message', // arbitray name or config for any other grunt task
                type: 'input', // list, checkbox, confirm, input, password
                message: 'Enter a commit message (an empty message will abort the process)', // Question to ask the user, function needs to return a string,
              }
            ]
          }
        }
      },

      imagemin: {                          // Task
        dynamic: {                         // Another target
          files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: '../assets/img/',         // Src matches are relative to this path
            src: ['*.{png,jpg,gif}'],      // Actual patterns to match
            dest: '../assets/img/'         // Destination path prefix
          }]
        }
      },

      bumper: {
        options: {
          tasks: ['rewrite:version'],
          commitMessage: '<%= message %>' //|| "Release v%VERSION%"
        }
      },

      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        all: [
        'Gruntfile.js',
        '../assets/js/*.js',
        '!../assets/js/scripts.min.js'
        ]
      },

      less: {
        dist: {
          files: {
            '../assets/css/main.css': [
            '../assets/less/app.less'
            ]
          }
        }
      },

      cssmin: {
        options: {
          banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
          ' * <%= pkg.homepage %>\n' +
          ' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
          ' */\n'
        },

        minify: {
          expand: true,

          cwd: '../assets/css/',
          src: ['main.css'],

          dest: '../assets/css/',
          ext: '.min.css'
        }
      },

      uglify: {
        dist: {
          files: {
            '../assets/js/scripts.min.js': [
            '../assets/js/plugins/bootstrap/transition.js',
            '../assets/js/plugins/bootstrap/alert.js',
            '../assets/js/plugins/bootstrap/button.js',
            '../assets/js/plugins/bootstrap/carousel.js',
            '../assets/js/plugins/bootstrap/collapse.js',
            '../assets/js/plugins/bootstrap/dropdown.js',
            '../assets/js/plugins/bootstrap/modal.js',
            '../assets/js/plugins/bootstrap/tooltip.js',
            '../assets/js/plugins/bootstrap/popover.js',
            '../assets/js/plugins/bootstrap/scrollspy.js',
            '../assets/js/plugins/bootstrap/tab.js',
            '../assets/js/plugins/bootstrap/affix.js',
            '../assets/js/plugins/*.js',
            '../assets/js/_*.js'
            ]
          },

          options: {
            // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
            // sourceMap: '../assets/js/scripts.min.js.map',
            // sourceMappingURL: '/app/themes/roots/assets/js/scripts.min.js.map'
          }
        }
      },

      version: {
        options: {
          file: '../outcanvas-dashboard.php',
          css: '../assets/css/main.min.css',
          cssHandle: 'outcanvasStyles',
          js: '../assets/js/scripts.min.js',
          jsHandle: 'outcanvasScripts'
        }
      },

      watch: {
        less: {
          files: [
          '../assets/less/*.less',
          '../assets/less/**/*.less',
          ],
          tasks: ['less', 'cssmin', 'version'],
          options: {
            livereload: true,
          },
        },

        js: {
          files: [
          '<%= jshint.all %>'
          ],
          tasks: ['jshint', 'uglify', 'version'],
          options: {
            livereload: true,
          },
        },

        livereload: {
            // Browser live reloading
            // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
            options: {
              livereload: true
            },
            files: [
            '../assets/css/main.min.css',
            '../assets/js/scripts.min.js',
            '../templates/*.php',
            '*.php'
            ]
          }
        }
      });

      // Load tasks
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-less');
      grunt.loadNpmTasks('grunt-wp-version');
      grunt.loadNpmTasks('grunt-bumper');
      grunt.loadNpmTasks('grunt-contrib-imagemin');
      grunt.loadNpmTasks('grunt-prompt');
      grunt.loadNpmTasks('grunt-rewrite');

      // Register tasks
      grunt.registerTask('default', [
        'less',
        'cssmin',
        'uglify',
        'version'
      ]);

      grunt.registerTask('dev', [
        'watch'
      ]);

      grunt.task.registerTask('commit', 'Commit your stuff', function(type) {
        if (arguments.length === 0) {
          grunt.task.run(['prompt', 'bumper']);
        } else {
          var bumper = 'bumper:' + type;
          grunt.task.run(['prompt', bumper]);
        }
      });
    };