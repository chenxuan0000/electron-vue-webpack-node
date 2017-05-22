/*
 * @Author: chenxuan 
 * @Date: 2017-05-21 14:02:30 
 * @Last Modified by: chenxuan
 * @Last Modified time: 2017-05-21 23:34:16
 */

var msgTip = require("../component/msgTip");
var fs = require('fs');
var body = document.querySelector("body");

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var newFolder = function (src) {
    fs.exists(src, function (exists) {
        if (exists) {
            body.appendChild(msgTip.errorTip(src + '文件夹已存在!'));
        } else {
            fs.mkdir(src, function (error) {
                if (error) {
                    body.appendChild(msgTip.successTip('error:' + error));
                    return;
                }
                body.appendChild(msgTip.successTip(src + '文件夹创建成功!'));
            });
        }
    });
};
var newconfig = function (config) {
    var text = "$" + config.baseClass + "-layout: " + config.layout + ";" +
        "$" + config.baseClass + "-sprite-dimensions: " + config.hasSize + ";" +
        "$" + config.baseClass + "-clean-up: " + config.hasSize + ";" +
        "@import 'compass/utilities/sprites';" +
        "@import '" + config.baseClass + "/*.png';" +
        "@include all-" + config.baseClass + "-sprites;";
    writeSass(text, config.targetRoot + "/compassTest/sass/" + config.baseClass + ".scss");
};
// 新建文件并写入数据
var writeSass = function (text, src) {
    fs.writeFile(src, text, function (err) {
        if (err) {
            body.appendChild(msgTip.errorTip('error:' + err));
        }
        body.appendChild(msgTip.successTip("数据写入成功"));
    });
};
// 新建文件夹
exports.newFolder = newFolder;
// 新建文件并写入配置参数F
exports.newconfig = newconfig;