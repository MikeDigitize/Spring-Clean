var fs = require("fs");
var images = fs.readdirSync("./src/images");
images = images.filter(function(img) {
    return ~img.indexOf("jpg") || ~img.indexOf("png");
});
module.exports = images;
