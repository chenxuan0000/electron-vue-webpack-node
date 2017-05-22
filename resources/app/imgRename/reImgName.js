/*
 * @Author: chenxuan 
 * @作用：正则匹配图片文件名
 * @Date: 2017-05-19 17:16:58 
 * @Last Modified by: chenxuan
 * @Last Modified time: 2017-05-21 23:34:47
 */

var fs = require("fs");
var path = require('path');
var msgTip = require("../component/msgTip");
var body = document.querySelector("body");
// name="vue_icon" es6默认值写法
function rename(src, reg, rename) {
    fs.readdir(src, function (err, files) {
        if (err) {
            body.appendChild(msgTip.errorTip(err));
            return;
        }
        files.forEach(function (filename, i) {
            var isImgReg = /(.*).(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/,
                isImg = isImgReg.test(filename);

            var innerRename = function () {
                var oldPath = src + '/' + filename,
                    extname = path.extname(oldPath), //后缀名
                    justName = path.basename(oldPath, extname), //去掉后缀哦 文件名
                    imgReg = reg ? new RegExp(reg, "gi") : justName,
                    newFlieName = reg ? justName.replace(imgReg, rename) + extname : rename + i + extname,
                    newPath = src + '/' + newFlieName;

                // 重命名
                fs.rename(oldPath, newPath, function (err) {
                    if (err) {
                        body.appendChild(msgTip.errorTip(filename + "替换失败:" + err));
                        return;
                    }
                    setTimeout(function () {
                        body.appendChild(msgTip.successTip(filename + '成功替换为:' + newFlieName));
                    }, i * 600);
                })
            };
            //略去非图片的name过滤
            // isImg && innerRename();
            if (isImg) {
                innerRename();
            } else {
                setTimeout(function () {
                    body.appendChild(msgTip.errorTip(filename + ":this is not imgFile"));
                }, i * 2000)

            }
        });
    })
}
exports.rename = rename;