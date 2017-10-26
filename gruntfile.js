var grunt = require('grunt')
var banner = 
`/* 
  * CodeJS @' + ${new Date().toLocaleString()} + '
  */
`
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			build: {
				expand: true,
				cwd: '',
				src: ['code.css'],
				dest: 'dist'
			}
		},
		uglify: {
			options: {
				banner: `${banner}`
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

grunt.tasks(this);