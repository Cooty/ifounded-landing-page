module.exports = function(grunt) {
    const scssSource = 'scss/';
    const cssFolder = 'css/';
    const buildDir = '../dist/';
    const sassSrc = ['*.scss'];
    const sassExt = '.css';

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            prod: {
                options: {
                    sourcemap: 'auto',
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: scssSource,
                    src: sassSrc,
                    dest: buildDir + cssFolder,
                    ext: sassExt
                }]
            },
            dev: {
                options: {
                    sourcemap: 'auto',
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: scssSource,
                    src: sassSrc,
                    dest: cssFolder,
                    ext: sassExt
                }]
            }
        },

        browserSync: {
            bsFiles: {
                src: ['css/*.css', './index.html']
            },
            options: {
                server: {
                    baseDir: "./"
                }
            }
        },

        htmlmin: { // Task
            prod: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true
                },
                files: { // Dictionary of files
                    '../dist/index.html': './index.html', // 'destination': 'source'
                }
            }
        },

        watch: {
            scss: {
                files: ['scss/**/*.scss'],
                tasks: ['sass:dev']
            }
        },

        clean: {
            images: {
                src: [buildDir + 'images']
            }
        },

        copy: {
            images: {
                files: [
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        src: ['images/**'],
                        dest: buildDir
                    }
                ],
            },
        },

        concurrent: {
            target: {
                tasks: ['browserSync', 'watch:scss'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }

    });

    grunt.registerTask('build', ['clean', 'copy', 'sass:prod', 'htmlmin']);
    grunt.registerTask('default', ['sass']);
    grunt.registerTask('start', ['concurrent']);
    grunt.option('force', true);
};
