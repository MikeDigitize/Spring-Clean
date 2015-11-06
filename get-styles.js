var fs = require("fs");
var styles = fs.readdirSync("./src/styles/global");
styles = styles.filter(function(file) {
    return ~file.indexOf("scss") || ~file.indexOf("css");
});
module.exports = styles;
