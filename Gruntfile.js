module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.config('ngAnnotate', {
        options: {
            singleQuotes: true
        },
        app: {
            files: {
                'tmp/min-safe/mainServices.js': ['public/views/main/mainServices.js'],
                'tmp/min-safe/mainController.js': ['public/views/main/mainController.js'],
                'tmp/min-safe/app.js': ['public/app.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.config('concat', {
        scripts: {
            src: [
                'tmp/min-safe/mainServices.js',
                'tmp/min-safe/mainController.js',
                'tmp/min-safe/app.js'],
            dest: 'tmp/main.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.config('uglify', {
        scripts: {
            files: {
                'public/assets/js/main.js' : 'tmp/main.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.config('sass', {
        app: {
            files: {
                'tmp/app.css': ['sass/style.scss']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.config('cssmin', {
        app: {
            files: {
                'public/assets/css/app.css': ['tmp/app.css']
            }
        }
    });



    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.config('watch', {
        scripts: {
            files: ['public/**/*.js'],
            tasks: ['ngAnnotate','concat', 'uglify'],

            options: {
                spawn: false
            }
        },
        styles: {
            files: ['sass/**/*.scss'],
            tasks: ['sass', 'cssmin'],
            options: {
                spawn: false
            }
        },
        interface: {
            files: ['public/index.html']
        },
        options: {
            livereload: true
        }
    });

    grunt.registerTask('build', "Builds the application.",
        ['sass', 'cssmin', 'ngAnnotate', 'concat','uglify' ]);


};

