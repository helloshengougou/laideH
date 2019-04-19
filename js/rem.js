function resize(){
    var dom = document.documentElement;
    var w = dom.getBoundingClientRect().width;
    var fontSize = w/7.5;
    dom.style.fontSize = fontSize + "px";
}
resize();
window.onresize = function(){
    console.log("resize");
    setTimeout(function(){
        resize();
    },16.7)
}