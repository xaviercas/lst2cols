module.exports = function(grunt) {
  grunt.initConfig({

    qunit: {
      all: ['test/index.html']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('default', ['test']);
};