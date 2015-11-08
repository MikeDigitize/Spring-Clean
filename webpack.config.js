var path = require("path");
var uglify = require("webpack/lib/optimize/UglifyJsPlugin");

module.exports = {
    entry : {
        global : "./src/js/global.js"
    },
    resolve: {
        root: path.resolve(__dirname + "/src"),
        extensions: ["", ".js", ".json"]
    },
    output: {
        path: __dirname + "/build",
        filename: "js/[name].js",
        hash: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    watch : true,
    plugins:[new uglify()]
};
