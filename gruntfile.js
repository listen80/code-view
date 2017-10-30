var grunt = require('grunt')
// console.log(process.argv)
var banner =
`/* 
  * CodeJS @' + ${new Date().toString()} + '
  */
`

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            options: {
                rebase: false,
                report: 'min',
                sourceMap: false
            },
            build: {
                expand: true,
                cwd: '',
                src: ['code.css'],
                dest: 'dist'
            }
        },
        uglify: {
            options: {
                banner: `${banner}`,
                footer: '',
                compress: {
                    warnings: false
                },
                mangle: {},
                beautify: false,
                report: false
            },
            build: {
                expand: true,
                cwd: 'src',
                src: '**/*.js',
                dest: 'dist'
            }
        },
        jshint: {
            check: {
                src: 'src/**/*.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify', 'cssmin']);
};

grunt.tasks('', {}, () => {
    var info = grunt.file.readJSON('package.json');
    console.log('\n' + [info.name, info.version, 'is built @', new Date().toLocaleString()].join(' '))
});