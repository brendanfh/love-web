module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            options: {
                banner: "//Love on the web\nvar Love;\n",
                separator: ";"
            },
            dist: {
                src: ["js/love/**/*.js"],
                dest: "js/love.js"
            }
        }
    });
    
    grunt.loadNpmTasks("grunt-contrib-concat");
    
    grunt.registerTask('default', ["concat"]);
};