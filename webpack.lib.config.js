var path = require('path')
var baseConfig = require('./baseConfig')

var config = Object.assign(baseConfig, {
    entry: {
        'MyComponentA': path.join(__dirname, "/src/MyComponentA.js"),
        'MyComponentB': path.join(__dirname, "/src/MyComponentB.js"),
    },
    
    output: {
        path: path.join(__dirname + "/lib/"),
        filename: "[name].js",
        library: ["myLibrary", "[name]"],
        libraryTarget: "umd"
    }
});
module.exports = config;