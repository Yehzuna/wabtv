module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist:[
                'public/fonts/',
                'public/js/',
                'public/css/',
                'public/img/'
            ]
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'src/scss/',
                    cssDir: 'public/css/',
                    imagesDir: 'public/img/',
                    fontsDir: 'public/fonts/',
                    spriteLoadPath: 'src/img/',
                    httpGeneratedImagesPath: "../img/",
                    httpFontsPath: "../fonts/",
                    specify: 'src/scss/styles.scss'
                }
            },
            prod: {
                options: {
                    sassDir: 'src/scss/',
                    cssDir: 'public/css/',
                    imagesDir: 'public/img/',
                    fontsDir: 'public/fonts/',
                    spriteLoadPath: 'src/img/',
                    httpGeneratedImagesPath: "../img/",
                    httpFontsPath: "../fonts/",
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
                    dest: 'public/img/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'src/fonts/',
                    src: ['**'],
                    dest: 'public/fonts/'
                }]
            },
            domFix: {
              src: 'node_modules/dom-to-image-chrome-fix/**',
              dest: 'public/bower_components/'
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
                    dest: 'tmp/js/',
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
                files: ['src/**/*.scss'],
                tasks: ['compass:dev']
            },
            img: {
                files: [
                    'src/**/*.jpg',
                    'src/**/*.png'
                ],
                tasks: ['copy']
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['concat']
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
        'copy',
        'compass:dev',
        'ngAnnotate',
        'concat'
    ]);

    grunt.registerTask('prod', [
        'clean',
        'copy',
        'compass:prod',
        'ngAnnotate',
        'concat',
        'uglify'
    ]);
};
