diaoyong();
function diaoyong(){
    var a=750;
    var b=200;
    var c=document.documentElement.offsetWidth;
    // console.log(c);
    var d=c/(a/b);
    document.documentElement.style.fontSize=d+'px';
}
window.addEventListener('resize',diaoyong);
