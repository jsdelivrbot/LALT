var w=window,
    d=document,
    e=d.documentElement,
    g=d.getElementsByTagName("body")[0],
    x=w.innerWidth||e.clientWidth||g.clientWidth;
(function() {
window.addEventListener('resize', fontSize);
function fontSize(){
    g.style.fontSize = (x+4320)/5120 + "em";
    g.style.lineHeight = 125e-6*x + 1.2;
} 
})();
