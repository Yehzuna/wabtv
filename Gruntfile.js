module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'public/css',
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
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['compass', 'copy']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['compass', 'copy']);
};