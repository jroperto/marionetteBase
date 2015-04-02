'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.loadNpmTasks('grunt-requirejs');

	// show elapsed time at the end
	require('time-grunt')(grunt);


	grunt.initConfig({
		buildConfig: {
			app: 'app',
			dist: 'dist'
		},

		open : {
			dev : {
				path: 'http://localhost:8085',
				app: 'chrome'
			}
		},

		// testing server
		connect: {
			testserver: {
				options: {
					port: 1234,
					base: '.'
				}
			},
			dist: {
				options: {
					port: 8085,
					base: '<%= buildConfig.app %>'
				}
			}

		},

		// mocha command
		exec: {

			test : {
				command: 'yo marionette2:model test',
				stdout: true
			},
			mocha: {
				command: '\"node_modules/.bin/mocha-phantomjs\" http://localhost:<%= connect.testserver.options.port %>/test',
				stdout: true
			}
		},

		clean: {
			dist: ['.tmp', '<%= buildConfig.dist %>/*'],
			server: '.tmp'
		},

		// linting
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= buildConfig.app %>/scripts/**/*.js',
				'!<%= buildConfig.app %>/scripts/_vendor/*',
				'test/spec/**/*.js'
			]
		},


		// require
		requirejs: {
			dist: {
				// Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
				options: {
					baseUrl: '<%= buildConfig.app %>/scripts',
					optimize: 'uglify2',
					paths: {
						'templates': '../../.tmp/scripts/templates'
					},
					include: 'init',
					name: '../bower_components/almond/almond',
					out: '<%= buildConfig.dist %>/scripts/init.js',
					almond: true,
					replaceRequireScript: [{
						files: ['<%= buildConfig.dist %>/index.html'],
						module: 'init'
					}],

					mainConfigFile: '<%= buildConfig.app %>/scripts/init.js',
					preserveLicenseComments: false,
					useStrict: true,
					wrap: true,
					pragmasOnSave: {
						// removes i18n precompiler, handlebars and json2
						excludeAfterBuild: true
					}
				}
			}
		},

		useminPrepare: {
			html: '<%= buildConfig.app %>/index.html',
			options: {
				dest: '<%= buildConfig.dist %>'
			}
		},

		usemin: {
			html: ['<%= buildConfig.dist %>/{,*/}*.html'],
			css: ['<%= buildConfig.dist %>/styles/{,*/}*.css'],
			options: {
				dirs: ['<%= buildConfig.dist %>']
			}
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= buildConfig.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= buildConfig.dist %>/images'
				}]
			}
		},

		cssmin: {
			dist: {
				files: {
					'<%= buildConfig.dist %>/styles/main.css': [
						'.tmp/styles/{,*/}*.css',
						'<%= buildConfig.app %>/styles/{,*/}*.css',
						'!<%= buildConfig.app %>/styles/vendor/*'
					]
				}
			}
		},

		htmlmin: {
			dist: {
				options: {
					/*removeCommentsFromCDATA: true,
					 // https://github.com/yeoman/grunt-usemin/issues/44
					 //collapseWhitespace: true,
					 collapseBooleanAttributes: true,
					 removeAttributeQuotes: true,
					 removeRedundantAttributes: true,
					 useShortDoctype: true,
					 removeEmptyAttributes: true,
					 removeOptionalTags: true*/
				},
				files: [{
					expand: true,
					cwd: '<%= buildConfig.app %>',
					src: '*.html',
					dest: '<%= buildConfig.dist %>'
				}]
			}
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= buildConfig.app %>',
					dest: '<%= buildConfig.dist %>',
					src: [
						'*.{ico,txt}',
						'.htaccess',
						'images/{,*/}*.{webp,gif}',
						'bower_components/requirejs/require.js'
					]
				}]
			}
		},

		bower: {
			all: {
				rjsConfig: '<%= buildConfig.app %>/scripts/main.js'
			}
		}

	});

	grunt.registerTask('default', ['build', 'open', 'connect:dist:keepalive']);


	grunt.registerTask('test', [
		'clean:server',
		'connect:testserver',
		'exec:mocha'
	]);

	grunt.registerTask('build', [
        'jshint',
		'useminPrepare',
		'imagemin',
		'htmlmin',
		'concat',
		'cssmin',
		'uglify',
		'copy',
		'requirejs',
		'usemin'
	]);

};
