var webpack = require("webpack");
var config = require("./webpack.config");
var fs = require("fs");
var watcher, compiler;
var get = {
    styles : require("./get-styles"),
    images : require("./get-images")
};

fs.writeFileSync("./src/js/styles.js", get.styles.map(function(style) {
    return "import \"../styles/global/" + style + "\";\n";
}).reduce(function (a,b) {
    return a + b;
}, ""));

fs.writeFileSync("./src/js/images.js", get.images.map(function(img) {
    return "import \"../images/" + img + "\";\n";
}).reduce(function (a,b) {
    return a + b;
}, ""));

compiler = webpack(config);
watcher = compiler.watch({
    aggregateTimeout: 1000,
    poll: true
}, function(err, stats) {
    if(err){
        console.log(err);
        watcher.close();
    }
    console.log("Compiled successfully");
});