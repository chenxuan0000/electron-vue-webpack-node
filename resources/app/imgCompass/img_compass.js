/*
 * @Author: chenxuan 
 * @Date: 2017-05-20 15:48:24 
 * @Last Modified by: chenxuan
 * @Last Modified time: 2017-05-21 23:33:57
 */

var msgTip = require("../component/msgTip");
var cpoyFile = require('./copy.js');
var newFileFolder = require('./newFile-folder.js');
var child_process = require('child_process');
var holder1 = document.getElementById("holder1"),
    holder2 = document.getElementById("holder2"),
    compassCopy = document.getElementById("compassCopy"),
    newSass = document.getElementById("newSass-img"),
    itemImgCopy = document.getElementById("itemImgCopy"),
    runBat = document.getElementById("runBat"),
    body = document.querySelector("body"),
    runPath = process.cwd(),
    testCompressPath, //缓存每次测试img地址
    localFlieReg = /^[a-zA-Z]:(([a-zA-Z]*)||([a-zA-Z]*\\))*/i,
    innerInput = document.querySelectorAll(".el-input__inner");

//拖拽事件
var dragEvent = function (dom) {
    dom.ondragover = () => {
        return false;
    }
    dom.ondragleave = dom.ondragend = () => {
        return false;
    }
    dom.ondrop = (e) => {
        e.preventDefault()
        for (let f of e.dataTransfer.files) {
            let src = f.path;
            if (dom === holder1) {
                innerInput[0].value = src;
            } else {
                //如果加减innerInput条目需要修改
                innerInput[5].value = src;
            }
        }
        return false;
    }
};

dragEvent(holder1);
var clearTip = function () {
    var childTip = document.querySelectorAll(".tip");
    childTip && childTip.forEach(function (e, i) {
        e.remove()
    }); //存在的话先清空tip
};
// compass项目复制
compassCopy.addEventListener("click", function (e) {
    e.preventDefault();
    clearTip();
    var targetRoot = innerInput[0].value;
    if (localFlieReg.test(targetRoot)) {
        //新建个compass项目文件夹
        newFileFolder.newFolder(targetRoot + '/compassTest/');
        cpoyFile.copyFile(runPath + '/compassTest', targetRoot + '/compassTest/');
    } else {
        body.appendChild(msgTip.errorTip("非正常路径!!!"));
    }
}, false);

// newSass创建*sass和*img文件夹
newSass.addEventListener("click", function (e) {
    e.preventDefault();
    clearTip();
    var targetRoot = innerInput[0].value,
        newImgPath = targetRoot + '/compassTest/images/' + innerInput[4].value + '/';
    if (localFlieReg.test(targetRoot)) {
        //新建img 目录
        newFileFolder.newFolder(newImgPath);
        //新建sass配置文件
        var configData = {
            "targetRoot": targetRoot,
            "layout": innerInput[1].value,
            "hasSize": innerInput[2].value,
            "clearSprite": innerInput[3].value,
            "baseClass": innerInput[4].value
        };
        newFileFolder.newconfig(configData);
        testCompressPath = newImgPath; //缓存
        //启动导入图片的deag事件
        dragEvent(holder2);
    } else {
        body.appendChild(msgTip.errorTip("请先完成第一步设置!!!"));
    }

}, false);

// 导入图片
itemImgCopy.addEventListener("click", function (e) {
    e.preventDefault();
    clearTip();
    var sourseRoot = innerInput[5].value;
    if (localFlieReg.test(sourseRoot)) {
        cpoyFile.copyFile(sourseRoot, testCompressPath);
    } else {
        body.appendChild(msgTip.errorTip("导入图片路径非正常!!!"));
    }
}, false);
// 执行bat
runBat.addEventListener("click", function (e) {
    e.preventDefault();
    clearTip();
    var compassTest = innerInput[0].value + '/compassTest/';
    child_process.execFile(compassTest + 'test.bat', null, {
        cwd: compassTest
    }, function (error, stdout, stderr) {
        if (error !== null) {
            body.appendChild(msgTip.errorTip("exec error:" + error));
        } else {
            body.appendChild(msgTip.successTip("成功执行指令!!!"));
        };
    });
}, false);

