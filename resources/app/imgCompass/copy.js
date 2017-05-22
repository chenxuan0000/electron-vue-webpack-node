/*
 * @Author: chenxuan 
 * @Date: 2017-05-21 14:02:30 
 * @Last Modified by: chenxuan
 * @Last Modified time: 2017-05-21 23:35:02
 */

var msgTip = require("../component/msgTip");
var fs = require('fs'),
    stat = fs.stat;
var body = document.querySelector("body");

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var copy = function (src, dst) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, function (err, paths) {
        if (err) {
            body.appendChild(msgTip.errorTip(err));
            throw err;
        }
        paths.forEach(function (path, i) {
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;
            stat(_src, function (err, st) {
                if (err) {
                    body.appendChild(msgTip.errorTip(err));
                    throw err;
                }
                // 判断是否为文件
                if (st.isFile()) {
                    // 创建读取流
                    readable = fs.createReadStream(_src);
                    // 创建写入流
                    writable = fs.createWriteStream(_dst);
                    // 通过管道来传输流
                    readable.pipe(writable);

                    setTimeout(function () {
                        body.appendChild(msgTip.successTip(path + '复制成功!'));
                    }, 600 * i);
                }
                // 如果是目录则递归调用自身
                else if (st.isDirectory()) {
                    exists(_src, _dst, i);
                }
            });
        });
    });
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function (src, dst) {
    var delayTime = arguments[2] * 800;
    fs.exists(dst, function (exists) {
        // 已存在
        if (exists) {
            copy(src, dst);
        }
        // 不存在
        else {
            fs.mkdir(dst, function () {
                copy(src, dst);
                setTimeout(function () {
                    body.appendChild(msgTip.successTip(dst + '文件夹创建成功!'));
                }, delayTime);
            });
        }
    });
};
// 复制目录
exports.copyFile = exists;