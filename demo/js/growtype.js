var w=window,
    d=document,
    e=d.documentElement,
    g=d.getElementsByTagName("body")[0],
    x=w.innerWidth||e.clientWidth||g.clientWidth;
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};
on_resize(function() {
g.style.fontSize = (x+4320)/5120 + "em";
g.style.lineHeight = 125e-6*x + 1.2;

/*
size in pixels
g.style.fontSize = x/320 + 13.5 + "px";

old equation
g.style.fontSize = (x+2400)/3200 + "em";
*/

})();
