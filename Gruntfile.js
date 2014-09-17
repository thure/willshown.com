var path = require('path');

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ejs');

  var watchPort = 35729
    , assets = {
      'Will Shown': grunt.file.read('./src/chrome/name.svg'),
      'loading': grunt.file.read('./src/chrome/loading.svg')
    };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: watchPort
      },
      source: {
        files: ['src/**/*.js', 'src/**/*.ejs', 'src/**/*.scxml', 'src/chrome/*'],
        tasks: ['ejs:watch', 'copy:amdconfig', 'copy:amdmain', 'copy:amdmodules', 'copy:amdsupport']
      },
      styles: {
        files: 'src/**/*.less',
        tasks: ['styles']
      }
    },
    ejs: {
      watch: {
        expand: true,
        flatten: true,
        src: './src/app/index.ejs',
        dest: './dist/',
        ext: '.html',
        options: {
          assets: assets,
          watch: watchPort,
          prod: false
        }
      },
      nowatch: {
        expand: true,
        flatten: true,
        src: './src/app/index.ejs',
        dest: './dist/',
        ext: '.html',
        options: {
          assets: assets,
          watch: false,
          prod: false
        }
      },
      prod: {
        expand: true,
        flatten: true,
        src: './src/app/index.ejs',
        dest: './prod/',
        ext: '.html',
        options: {
          assets: assets,
          watch: false,
          prod: true
        }
      }
    },
    bower: {
      install: {
        options: {
          cleanup: true,
          targetDir: './lib'
        }
      }
    },
    less: {
      main: {
        options: {
          paths: ['./'],
          lineNumbers: true
        },
        files: {
          'dist/style/main.css': 'src/app/main.less'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      main: {
        src: 'dist/style/main.css',
        dest: 'dist/style/main.css'
      }
    },
    cssmin: {
      prod: {
        files: [{
          src: ['dist/style/main.css'],
          dest: 'dist/style/main.min.css'
        }]
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "dist/js",
          name: 'main',
          mainConfigFile: "dist/js/main.js",
          out: "dist/js/main.min.js",
          include: 'requireLib',
          paths: {
            requireLib: 'lib/require'
          }
        }
      }
    },
    copy: {
      libjs: {
        expand: true,
        flatten: true,
        cwd: './lib',
        src: [
          'underscore/underscore.js',
          'require/require.js',
          'text/text.js',
          'jquery/jquery.js',
          'scion/dist/scion.js',
          'q/q.js'
        ],
        dest: './dist/js/lib/',
        rename: function(dest, src){
          return dest + src.replace(/\.amd/gi, '');
        }
      },
      chrome: {
        expand: true,
        flatten: true,
        cwd: './src',
        src: 'chrome/*',
        dest: './dist/images'
      },
      amdconfig: {
        expand: true,
        flatten: true,
        cwd: './src/config',
        src: ['*.js', '*.json'],
        dest: './dist/js/config/'
      },
      amdmain: {
        expand: true,
        cwd: './src/app',
        src: 'main.js',
        dest: './dist/js/'
      },
      amdmodules: {
        expand: true,
        flatten: true,
        cwd: './src',
        src: '**/*.amd.js',
        dest: './dist/js/amd/',
        rename: function(dest, src){
          return dest + src.replace(/\.amd/gi, '');
        }
      },
      amdsupport: {
        expand: true,
        flatten: true,
        cwd: './src',
        src: [
          '**/*.ejs',
          '**/*.scxml'
        ],
        dest: './dist/js/amd/'
      },
      mins: {
        expand: true,
        flatten: true,
        cwd: './',
        src: ['./dist/**/*.min.*'],
        dest: './prod/'
      },
      images: {
        expand: true,
        flatten: true,
        cwd: './',
        src: ['./dist/images/*'],
        dest: './prod/images/*'
      }
    }
  });

  grunt.registerTask('default',      ['dist:watch', 'watch']);
  grunt.registerTask('styles',       ['less', 'autoprefixer']);
  grunt.registerTask('dist:copy',    ['copy:libjs', 'copy:chrome', 'copy:amdconfig', 'copy:amdmain', 'copy:amdmodules', 'copy:amdsupport']);
  grunt.registerTask('dist:watch',   ['styles', 'dist:copy', 'ejs:watch']);
  grunt.registerTask('dist:nowatch', ['styles', 'dist:copy', 'ejs:nowatch']);
  grunt.registerTask('prod',         ['styles', 'dist:copy', 'cssmin', 'requirejs', 'ejs:prod', 'copy:mins', 'copy:images']);
  grunt.registerTask('install',      ['bower:install']);

};