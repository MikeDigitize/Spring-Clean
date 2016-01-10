var fs = require('fs');
var globalCssPath = 'build/styles/global/global.css';
var globalJsPath = 'build/js/global.js';
var globalCssTarget = '<link href=styles/global/global.css media=all rel=stylesheet type=text/css>';
var globalJsTarget = '<script src=js/global.js></script>';

var files = [{
    src: 'build/styles/home/home.css',
    dest : 'build/index.html',
    target: '<link href=styles/home/home.css media=all rel=stylesheet type=text/css>'
}, {
    src: 'build/styles/services/services.css',
    dest : 'build/services.html',
    target: '<link href=styles/services/services.css media=all rel=stylesheet type=text/css>'
}, {
    src: 'build/styles/contact/contact.css',
    dest : 'build/contact.html',
    target: '<link href=styles/contact/contact.css media=all rel=stylesheet type=text/css>'
}, {
    src: 'build/styles/faqs/faqs.css',
    dest : 'build/faqs.html',
    target: '<link href=styles/faqs/faqs.css media=all rel=stylesheet type=text/css>'
}];

function start() {
    files.forEach(function(fileinfo) {
        getFiles(fileinfo);
    });
}

function getFiles(info) {
    getFileContents(info.src).then(function(contents) {
        info.css = contents;
        return getFileContents(info.dest);
    }).then(function(contents) {
        info.html = contents;
        return getFileContents(globalJsPath);
    }).then(function(contents) {
        info.globalJs = contents;
        return getFileContents(globalCssPath);
    }).then(function(contents) {
        info.globalCss = contents;
        replaceWithInline(info);
    }).catch(function (err) {
        console.log("error", err);
    });
}

function getFileContents(target) {
    return new Promise(function (res, rej) {
        fs.readFile(target, function (err, data) {
            if (err) {
                rej(err);
            }
            else {
                res(data.toString('utf8'));
            }
        });
    });
}

function replaceWithInline(info) {
    var localCss, globalCss, globalJs;
    localCss = '<style type=text/css>' + info.css.replace(/\.\.\/fonts/g, 'styles/fonts').replace(/\.\.\/\.\.\/images/g, 'images') + '</style>';
    globalCss = '<style type=text/css>' + info.globalCss.replace(/\.\.\/fonts/g, 'styles/fonts').replace(/\.\.\/\.\.\/images/g, 'images') + '</style>';
    globalJs = '<script type=text/javascript>' + info.globalJs + '</script>';
    writeFile(info.dest, info.html.replace(info.target, localCss).replace(globalCssTarget, globalCss).replace(globalJsTarget, globalJs));
}

function writeFile(filename, contents) {
    fs.writeFile(filename, contents, 'utf8', function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('new file created');
        }

    });
}

start();