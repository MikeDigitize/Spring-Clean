var path = require("path"),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    Uglify = require("webpack/lib/optimize/UglifyJsPlugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        home: "./src/js/home.js",
        about: "./src/js/about.js"
    },
    resolve: {
        root: path.resolve(__dirname + "/src"),
        extensions: ["", ".js", ".css", ".scss"]
    },
    output: {
        path: __dirname + "/build",
        filename: "js/[name].js",
        hash: true
    },
    module: {
        loaders: [{
            test: /\.jsx$|\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.scss$|\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader?!sass")
        }, {
            test: /\.(woff|woff2|eot|ttf|svg|json)$/,
            loader: "url-loader?name=[path][name].[ext]&context=./src/"
        }, {
            test: /\.(png|jpg)$/,
            loader: "url-loader?limit=100000&name=[path][name].[ext]&context=./src/"
        }]
    },
    plugins:[
        new HtmlWebpackPlugin({ template: "./src/index.html", filename : "index.html", excludeChunks : ["about"], title : "home" }),
        new HtmlWebpackPlugin({ template: "./src/about.html", filename : "about.html", excludeChunks : ["home"], title : "about" }),
        new ExtractTextPlugin("./styles/[name].css", { allChunks : true })
    ]
};
