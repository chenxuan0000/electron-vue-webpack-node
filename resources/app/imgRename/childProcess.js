/*
 * @Author: chenxuan 
 * @Date: 2017-05-20 15:48:24 
 * @Last Modified by: chenxuan
 * @Last Modified time: 2017-05-21 00:55:44
 */
var reImgName = require("./reImgName"),
    holder = document.getElementById("holder"),
    resetBtn = document.querySelector("#reset-btn"),
    innerInput = document.querySelectorAll(".el-input__inner");

//拖拽事件
holder.ondragover = () => {
    return false;
}
holder.ondragleave = holder.ondragend = () => {
    return false;
}
holder.ondrop = (e) => {
    e.preventDefault()
    for (let f of e.dataTransfer.files) {
        let src = f.path;
        innerInput[0].value = src;
    }
    return false;
}

//点击确认reset按钮
resetBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var childTip = document.querySelectorAll(".tip");
    childTip && childTip.forEach(function(e,i){e.remove()}) //存在的话先清空tip
    //调用reImgName
    reImgName.rename(innerInput[0].value, innerInput[1].value, innerInput[2].value);
}, false)