module.exports = (grunt)=> {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/javascripts/ajax/*.js', 'public/javascripts/*.js'],
        dest: 'public/javascripts/dist/<%= pkg.name %>_client.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>_client <%= grunt.template.today("dd-mm-yyyy") %>\n Includes <%= concat.dist.src %> */\n'
      },
      dist: {
        files: {
          'public/javascripts/dist/<%= pkg.name %>_client.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', '*.js','models/*.js', 'logic/**/*.js',
             'ajax/*','test/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  })

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-qunit')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('test', ['jshint', 'qunit'])
  grunt.registerTask('all', ['jshint', 'qunit', 'concat', 'uglify'])
  grunt.registerTask('default', ['concat', 'uglify'])
  grunt.registerTask('uglify', ['uglify'])
  grunt.registerTask('concat', ['concat'])
}