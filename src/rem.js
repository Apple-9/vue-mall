const baseSize = 37.5
    // 设置 rem 函数
function setRem() {
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    // const scale = document.documentElement.clientWidth / 750;
    const scale = document.documentElement.clientWidth / 375;
    // 设置页面根节点字体大小

    let fontSize = (baseSize * Math.min(scale, 2));
    if (fontSize > 37.5) {
        fontSize = 37.5;
    }
    document.documentElement.style.fontSize = fontSize + "px";

}
// 初始化
setRem()
    // 改变窗口大小时重新设置 rem
window.onresize = function() {
    setRem()
}