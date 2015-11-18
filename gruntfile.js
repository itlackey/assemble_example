module.exports = function (grunt) {
    grunt.initConfig({  
        paths:{
            src: 'src', 
            vendor: 'bower_components',
            dest: 'wwwroot'
        },
        //site: grunt.readJSONFile('src/data/site.json'),
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '<%= paths.dest %>',
                    livereload: true
                }
            }
        },    
        less: {
            main: {
                files: {
                    "<%= paths.src %>/styles/skin.css": 
                        "<%= paths.src %>/styles/skin.less"
                }
            },
        },
        assemble: {
            options: {
                data: ['<%= paths.src %>/data/*.json'],
                //assets: "<%= paths.src %>/assets",
                layout: "<%= paths.src %>/layouts/layout.hbs",
                partials: "<%= paths.src %>/partials/**/*.hbs"
            },
            main: {
                expand: true,
                cwd: '<%= paths.src %>/pages',
                dest: '<%= paths.dest %>',
                src: "**/*.hbs"
            }
        },
        copy:{
            images:{
                expand: true,
                cwd: '<%= paths.src %>/images',
                src: ['**'],
                dest: '<%= paths.dest %>/images'
            },
            vendor: {
                files: [
                  {
                      expand: true,
                      cwd: '<%= paths.vendor %>/jquery/dist/',
                      src: ['*.min.js'],
                      dest: '<%= paths.dest %>/scripts'
                  },
                  {
                      expand: true,
                      cwd: '<%= paths.vendor %>/bootstrap/dist/css',
                      src: ['*.min.css'],
                      dest: '<%= paths.dest %>/styles'
                  },
                  {
                      expand: true,
                      cwd: '<%= paths.vendor %>/bootstrap/dist/js',
                      src: ['*.min.js'],
                      dest: '<%= paths.dest %>/scripts'
                  },
                  {
                      expand: true,
                      cwd: '<%= paths.vendor %>/bootstrap/dist/fonts',
                      src: ['*.*'],
                      dest: '<%= paths.dest %>/fonts'
                  }
                ],
            },
        },
        cssmin:{
           options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                '<%= paths.dest%>/styles/core.min.css': ['<%= paths.src %>/styles/*.css']
                }
            } 
        },
        uglify: {
            all: {
                files: {
                    '<%= paths.dest %>/scripts/core.min.js': ['<%= paths.src %>/scripts/*.js']
                }
            }
        },
        watch: {
            options:{
             livereload: true
            },
            images:{
                files: ['<%= paths.src %>/images/**/*.*'],
                tasks: ['copy:images']
            },
            data:{
                files: ['<%= paths.src %>/data/*.*'],
                tasks: ['assemble']
            },
            pages:{
                files: ['<%= paths.src %>/**/*.hbs'],
                tasks: ['assemble']
            },
            styles:{
               files: ['<%= paths.src %>/styles/*.less'],
                tasks: ['less', 'cssmin'] 
            },
            scripts:{
                files: ['<%= paths.src %>/scripts/*.js'],
                tasks: ['uglify']
            }
        }
    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    grunt.registerTask('build_all', ['less', 'assemble', 'uglify', 'cssmin', 'copy']);
    
    grunt.registerTask('default', ['build_all', 'connect', 'watch']);
    

};