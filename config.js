import path from "path";
import uglify from "webpack/lib/optimize/UglifyJsPlugin";

export function webpackConfig(name, src) {
    let entry = {};
    entry[name] = src;
    return {
        entry,
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
        }
    };
}
