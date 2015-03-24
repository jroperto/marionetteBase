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

	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist'
	};

	grunt.initConfig({
		yeoman: yeomanConfig,

		open : {
			dev : {
				path: 'http://localhost:8888',
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
					port: 8888,
					base: '<%= yeoman.app %>'
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
			dist: ['.tmp', '<%= yeoman.dist %>/*'],
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
				'<%= yeoman.app %>/scripts/{,*/}*.js',
				'!<%= yeoman.app %>/scripts/_vendor/*',
				'test/spec/{,*/}*.js'
			]
		},


		// require
		requirejs: {
			dist: {
				// Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
				options: {
					baseUrl: '<%= yeoman.app %>/scripts',
					optimize: 'uglify2',
					paths: {
						'templates': '../../.tmp/scripts/templates'
					},
					include: 'init',
					name: '../bower_components/almond/almond',
					out: '<%= yeoman.dist %>/scripts/init.js',
					almond: true,
					replaceRequireScript: [{
						files: ['<%= yeoman.dist %>/index.html'],
						module: 'init'
					}],

					mainConfigFile: '<%= yeoman.app %>/scripts/init.js',
					preserveLicenseComments: false,
					useStrict: true,
					wrap: true,
					pragmasOnSave: {
						//removes Handlebars.Parser code (used to compile template strings) set
						//it to `false` if you need to parse template strings even after build
						excludeHbsParser : true,
						// kills the entire plugin set once it's built.
						excludeHbs: true,
						// removes i18n precompiler, handlebars and json2
						excludeAfterBuild: true
					}
				}
			}
		},

		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},

		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				dirs: ['<%= yeoman.dist %>']
			}
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},

		cssmin: {
			dist: {
				files: {
					'<%= yeoman.dist %>/styles/main.css': [
						'.tmp/styles/{,*/}*.css',
						'<%= yeoman.app %>/styles/{,*/}*.css',
						'!<%= yeoman.app %>/styles/vendor/*'
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
					cwd: '<%= yeoman.app %>',
					src: '*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
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
				rjsConfig: '<%= yeoman.app %>/scripts/main.js'
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
