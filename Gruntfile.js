/* global process */

var _;
var matchdep;
var chalk;
var module;

_ = require('underscore');
matchdep = require('matchdep');
chalk = require('chalk');

module.exports = function(grunt) {

    var config;
    var deployTasks;
    var isDevLintTask;
    var isDevTasks;
    var pkg;
    var tasks;
    var username = process.env.UA5_USER || process.env.USER || 'unknown_user';
    var watchJavascriptFiles = [];
    var watchRequireFiles = {
        src: [],
        dest: []
    };

    pkg = grunt.file.readJSON('package.json');
    config = grunt.file.readYAML('config/grunt.yml').config;
    isDevTasks = !(_.contains(grunt.cli.tasks, 'deploy') || _.contains(grunt.cli.tasks, 'prod'));

    // If this is the `dev-lint` task, then assign javascript files to be
    // watched.
    isDevLintTask = isDevTasks && _.contains(grunt.cli.tasks, 'dev-lint');
    if (isDevLintTask) {
        watchJavascriptFiles = config.files.js.app.src;
    } else if (isDevTasks && _.contains(grunt.cli.tasks, 'dev-require')) {
        watchRequireFiles.dest.push('web/build/require-main.js');
        watchRequireFiles.src = config.files.js.app.src;
    }

    //-- version must match '^(?:^(?!-)[a-z\d\-]{0,62}[a-z\d]$)$'
    function sanitizeVersion(dirtyVersion) {
        return (dirtyVersion || '').replace(/(.)/, 'v$1').replace(/[^a-z0-9]/g, '-');
    }

    grunt.initConfig({
        pkg: pkg,
        sanitizeVersion: sanitizeVersion,
        semver: require('semver'),
        imagemin: {
            build: {
                files: [{
                    expand: true,
                    src: [config.files.img.src],
                    // Just replace the file
                    dest: '.'
                }]
            }
        },
        bump: {
            options: {
                commitFiles: [ //-- Files to add to release commit
                    'package.json',
                    'bower.json'
                ],
                files: [ //-- Files to bump
                    'package.json',
                    'bower.json'
                ],
                pushTo: 'origin',
                updateConfigs: ['pkg']
            }
        },
        exec: {
            'install-pip-requirements': {
                command: 'pip install -r requirements.txt -t vendor/'
            },
            'delete-python-vendor-directory': {
                command: 'rm -rf vendor/'
            },
            'write-scss-import-file': {
                command: './scssImport.sh'
            }
        },
        gae: {
            options: { //-- See: https://github.com/maciejzasada/grunt-gae
                auth: '.gae.auth',
                version: '<%= grunt.config("bump.increment") ? sanitizeVersion(pkg.version) : "' + username + '" %>'
            },
            deploy: {
                action: 'update'
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            inline: {
                files: {
                    src: config.files.js.app.src
                }
            },
            startup: {
                options: {
                    force: true
                },
                files: {
                    src: config.files.js.app.src
                }
            }
        },
        jscs: {
            inline: {
                files: {
                    src: config.files.js.app.src
                }
            },
            startup: {
                options: {
                    force: true
                },
                files: {
                    src: config.files.js.app.src
                }
            }
        },
        open: {
            deploy: {
                path: 'http://<%= grunt.config("bump.increment") ? sanitizeVersion(pkg.version) : "' + username + '" %>.app.appspot.com'
            }
        },
        prompt: {
            bump: {
                options: {
                    questions: [
                        {
                            config: 'bump.increment',
                            type: 'list',
                            message: 'Bump version from ' + pkg.version.cyan + ' to:',
                            choices: [
                                {
                                    value: 'patch',
                                    name: 'Patch:  '.yellow +
                                        '<%= semver.inc(pkg.version, "patch") %>'.yellow +
                                        '   Backwards-compatible bug fixes.'
                                },
                                {
                                    value: 'minor',
                                    name: 'Minor:  '.yellow +
                                        '<%= semver.inc(pkg.version, "minor") %>'.yellow +
                                        '   Add functionality in a backwards-compatible manner.'
                                },
                                {
                                    value: 'major',
                                    name: 'Major:  '.yellow +
                                        '<%= semver.inc(pkg.version, "major") %>'.yellow +
                                        '   Incompatible API changes.'
                                }
                            ]
                        }
                    ]
                }
            }
        },
        requirejs: {
            options: {
                findNestedDependencies: true,
                generateSourceMaps: true,
                optimize: 'uglify2',
                preserveLicenseComments: false,
                uglify2: {
                    //Example of a specialized config. If you are fine
                    //with the default options, no need to specify
                    //any of these properties.
                    output: {
                        beautify: false
                    },
                    compress: {
                        sequences: false
                    },
                    warnings: false,
                    mangle: false
                }
            },
            prod: {
                options: {
                    appDir: config.requirejs.appDir,
                    baseUrl: config.requirejs.baseUrl,
                    dir: config.requirejs.dir,
                    mainConfigFile: config.requirejs.mainConfigFile,
                    modules: config.requirejs.modules
                }
            },
            dev: {
                options: {
                    appDir: config.requirejs.appDir,
                    baseUrl: config.requirejs.baseUrl,
                    dir: config.requirejs.dir,
                    mainConfigFile: config.requirejs.mainConfigFile,
                    modules: config.requirejs.modules,
                    optimize: 'none'
                }
            }
        },
        sass: {
            options: {
                loadPath: config.files.scss.loadPaths,
                quiet: true,
                style: 'compact'
            },
            build: {
                src: config.files.scss.app.src,
                dest: config.files.scss.app.dest
            }
        },
        scsslint: {
            allFiles: config.files.scss.watch,
            options: {
                bundleExec: false,
                config: '.scss-lint.yml',
                colorizeOutput: true
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            'pre-commit-hook': {
                src: 'pre-commit-hook.sh',
                dest: '.git/hooks/pre-commit'
            }
        },
        watch: {
            imagemin: {
                files: config.files.img.src,
                tasks: 'newer:imagemin:build'
            },
            js: {
                files: watchJavascriptFiles,
                tasks: ['jshint:inline', 'jscs:inline']
            },
            livereload: {
                options: {
                    livereload: config.liveReloadPort
                },
                files: [].concat(
                    'web/css/main.css',
                    config.files.js.app.src,
                    config.files.handlebars.src
                )
            },
            require: {
                options: {
                    interrupt: true
                },
                files: watchRequireFiles.src,
                tasks: ['requirejs:dev']
            },
            scss: {
                options: {
                    interrupt: true
                },
                files: config.files.scss.watch,
                tasks: 'sass'
            },
            scssImport: {
                options: {
                    interrupt: true
                },
                files: config.files.scss.watch,
                tasks: 'scssImport'
            }
        }
    });
    matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('prepare_livereload', 'Build Locale files.', function() {
        var filename;
        var generateLiveReload;

        filename = config.files.js.livereload;
        generateLiveReload = function(port) {
            return '(function() {\n    \'use strict\';\n        var existing_script_tag = document.getElementsByTagName(\'script\')[0];\n        var host;\n        var new_script_tag = document.createElement(\'script\');\n        var url;\n        host = (location.host || \'localhost\').split(\':\')[0];\n        url = \'http://\' + host + \':' + port + '/livereload.js?snipver=1\';\n        new_script_tag.src = url;\n        existing_script_tag.parentNode.insertBefore(new_script_tag, existing_script_tag);\n})(); ';
        };

        if (isDevTasks) {
            grunt.file.write(filename, generateLiveReload(config.liveReloadPort));
            grunt.log.writeln('File ' + chalk.cyan(filename) + ' created');
        } else {
            grunt.file.write(filename, '');
        }
    });
    // delete-python-vendor-directory before installing vendor requirements is necessary because
    // pip is not idempotent when using the -t flag, which we want so the
    // vendor requirements are installed locally.
    // see: https://github.com/GoogleCloudPlatform/appengine-python-flask-skeleton/issues/1
    tasks = [
        'symlink:pre-commit-hook',
        'scssImport',
        'sass',
        'newer:imagemin:build',
        'prepare_livereload',
        'watch'
    ];

    grunt.registerTask('scssImport', function() {
        grunt.task.run('exec:write-scss-import-file');
    });
    grunt.registerTask('default', tasks);
    grunt.registerTask('python', ['exec:delete-python-vendor-directory', 'exec:install-pip-requirements']);

    // Register production build task
    // TODO: Add another task (or via python) to switch out
    // the main script source with the build version upon deploy
    grunt.registerTask('prod', ['requirejs:prod']);

    deployTasks = [
        //-- prep
        'exec:delete-python-vendor-directory',
        'exec:install-pip-requirements',

        //-- dist,
        'scssImport',
        'sass',
        'requirejs:prod',

        //-- deploy
        'gae:deploy',
        'open:deploy'
    ];

    grunt.registerTask('deploy', deployTasks);

    // Internal task to use the prompt settings to create a tag
    grunt.registerTask('bump:prompt', function() {
        var increment = grunt.config('bump.increment');
        if (!increment) {
            grunt.fatal('bump.increment config not set!');
        }

        grunt.task.run('bump:' + increment);
    });

    grunt.registerTask(
        'deploy:prod',
        [
            'prompt:bump',
            'bump:prompt'
        ].concat(
            deployTasks
        )
    );

    // Register task for validating code.
    grunt.registerTask('validate-code', ['jshint:inline', 'jscs:inline', 'scsslint']);
    grunt.registerTask('test', ['validate-code']);
};
