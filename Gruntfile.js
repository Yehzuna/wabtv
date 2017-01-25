module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist:[
                'public/js',
                'public/css',
                'public/img'
            ]
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'public/css',
                    imagesDir: 'public/img',
                    spriteLoadPath: 'src/img/',
                    httpGeneratedImagesPath: "../img/",
                    specify: 'src/scss/styles.scss'
                }
            },
            prod: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'public/css',
                    imagesDir: 'public/img',
                    spriteLoadPath: 'src/img/',
                    httpGeneratedImagesPath: "../img/",
                    specify: 'src/scss/styles.scss',
                    environment: 'production'
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**', '!sprite/**'],
                    dest: 'public/img',
                    filter: 'isFile'
                }]
            }
        },
        ngAnnotate: {
            dist: {
                options: {
                    singleQuotes: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: ['**'],
                    dest: 'tmp/js',
                    filter: 'isFile'
                }]
            }
        },
        concat: {
            dist: {
                files: [{
                    src: ['tmp/js/**'],
                    dest: 'public/js/app.js',
                    filter: 'isFile'
                }]
            }
        },
        uglify: {
            js: {
                src: ['public/js/app.js'],
                dest: 'public/js/app.js'
            }
        },
        watch: {
            css: {
                files: [
                    '*.js',
                    '*.scss'
                ],
                tasks: [
                    'compass',
                    'copy',
                    'ngAnnotate',
                    'concat'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.registerTask('default', ['watch']);

    grunt.registerTask('dev', [
        'clean',
        'compass:dev',
        'copy',
        'ngAnnotate',
        'concat'
    ]);

    grunt.registerTask('prod', [
        'clean',
        'compass:prod',
        'copy',
        'ngAnnotate',
        'concat',
        'uglify'
    ]);
};