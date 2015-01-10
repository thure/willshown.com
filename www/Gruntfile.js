var path = require('path'),
    fs = require('fs'),
    os = require('os');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var rjs = os.platform() === 'win32' ? 'r.js.cmd' : 'r.js';

  var watchPort = 35729
    , assets = {
      'Will Shown': grunt.file.read('./src/chrome/name.svg'),
      'loading': grunt.file.read('./src/chrome/loading.svg'),
      'up': grunt.file.read('./src/chrome/up.svg'),
      'next': grunt.file.read('./src/chrome/next.svg'),
      'favicon': fs.readFileSync('./favicon.ico').toString('base64')
    };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: ['./dist'],
      prod: ['./prod']
    },
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
          dest: 'prod/style/main.min.css'
        }]
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "./dist/js",
          dir: './dist/opt-js',
          mainConfigFile: "./dist/js/main.js",
          removeCombined: true,
          optimize: 'uglify2',
          modules: [
            {
              name: 'main',
              include: 'requireLib'
            },
            {
              name: 'amd/geof',
              exclude: [
                'lib/jquery',
                'lib/underscore',
                'lib/async',
                'lib/moment'
              ]
            }
          ],
          paths: {
            requireLib: './lib/require'
          }
        }
      }
    },
    exec: {
      peels: {
        cmd: rjs + ' -convert dist/js/lib/peels dist/js/lib/peels.amd'
      },
      warmth: {
        cmd: rjs + ' -convert dist/js/lib/warmth dist/js/lib/warmth.amd'
      },
      three: {
        cmd: rjs + ' -convert lib/threejs dist/js/lib/three.amd'
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
          'q/q.js',
          'qxhr/qxhr.amd.js',
          'moment/moment.js',
          'async/async.js',
          'color/one-color.js'
        ],
        dest: './dist/js/lib/',
        rename: function(dest, src){
          return dest + src.replace(/\.amd/gi, '');
        }
      },
      libmodules: {
        expand: true,
        flatten: false,
        cwd: './node_modules',
        src: [
          'peels/lib/*',
          'peels/lib/**/*',
          'peels/index.js',
          'warmth/lib/*',
          'warmth/lib/**/*',
          'warmth/index.js'
        ],
        dest: './dist/js/lib'
      },
      minified: {
        expand: true,
        flatten: false,
        cwd: './dist/opt-js',
        src: [
          'main.js',
          'amd/geof.js'
        ],
        dest: './prod/js'
      },
      fonts: {
        expand: true,
        flatten: true,
        cwd: './src',
        src: 'fonts/*',
        dest: './dist/style/fonts'
      },
      fontsProd: {
        expand: true,
        flatten: true,
        cwd: './',
        src: './dist/style/fonts/*',
        dest: './prod/style/fonts'
      },
      chrome: {
        expand: true,
        flatten: true,
        cwd: './src',
        src: 'chrome/*',
        dest: './dist/images'
      },
      assets: {
        expand: true,
        flatten: true,
        cwd: './src',
        src: 'assets/*',
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
      images: {
        expand: true,
        flatten: true,
        cwd: './',
        src: ['./dist/images/*'],
        dest: './prod/images'
      }
    }
  });

  grunt.registerTask('default',      ['dist:watch', 'watch']);
  grunt.registerTask('styles',       ['less', 'autoprefixer']);
  grunt.registerTask('dist:copy',    ['copy:libjs', 'copy:libmodules', 'exec:peels', 'exec:warmth', 'exec:three', 'copy:chrome', 'copy:fonts', 'copy:assets', 'copy:amdconfig', 'copy:amdmain', 'copy:amdmodules', 'copy:amdsupport']);
  grunt.registerTask('prod:copy',    ['copy:fontsProd', 'copy:images', 'copy:minified']);
  grunt.registerTask('dist:watch',   ['styles', 'dist:copy', 'ejs:watch']);
  grunt.registerTask('dist:nowatch', ['clean:dist', 'styles', 'dist:copy', 'ejs:nowatch']);
  grunt.registerTask('prod',         ['clean:prod', 'dist:nowatch', 'cssmin', 'requirejs', 'ejs:prod', 'prod:copy']);
  grunt.registerTask('install',      ['bower:install']);

};