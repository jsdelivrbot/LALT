function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};
on_resize(function() {
    var g = document.getElementsByTagName("body")[0]
g.style.fontSize = (viewport().width+4320)/5120 + "em";
g.style.lineHeight = 125e-6*viewport().width + 1.2;

/*
size in pixels
g.style.fontSize = x/320 + 13.5 + "px";

old equation
g.style.fontSize = (x+2400)/3200 + "em";
*/

})();
