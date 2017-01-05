var path = require('path')
var baseConfig = require('./baseConfig')

var config = Object.assign(baseConfig, {
    
    entry: path.join(__dirname, "/src/main.js"),
    
    output: {
        path: path.join(__dirname + "/dist/"),
        filename: "myLibrary.js",
        library: "myLibrary",
        libraryTarget: "umd"
    }
});
module.exports = config;