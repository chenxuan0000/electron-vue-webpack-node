window.addEventListener("scroll", function () {
    let body = document.querySelector("body"),
        top = body.scrollTop,
        head = document.querySelector("head"),
        tipStyle = document.querySelector("#resetCss")
    if (!!tipStyle) {
        tipStyle.innerHTML = ".tip {top: " + (40 + top) + "px!important;}";
    } else {
        let reseTipCss = document.createElement('style');
        reseTipCss.id = "resetCss";
        reseTipCss.innerHTML = ".tip {top: " + (40 + top) + "px!important;}";
        head.appendChild(reseTipCss);
    }
}, false);