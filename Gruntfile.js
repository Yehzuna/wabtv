module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dev: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'public/css',
                    specify: 'src/scss/styles.scss'
                }
            },
            prod: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'public/css',
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
                    src: ['**'],
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
                    dest: 'src/tmp/js',
                    filter: 'isFile'
                }]
            }
        },
        concat: {
            dist: {
                files: [{
                    //expand: true,
                    //cwd: 'src/tmp/js/',
                    src: ['src/tmp/js/**'],
                    dest: 'public/js/app.js',
                    filter: 'isFile'
                }]
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['compass', 'copy']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.registerTask('default', ['watch']);

    grunt.registerTask('dev', [
        'compass:dev',
        'copy',
        'ngAnnotate',
        'concat'
    ]);
};