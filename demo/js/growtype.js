var w=window,
    d=document,
    e=d.documentElement,
    g=d.getElementsByTagName("body")[0],
    x=w.innerWidth||e.clientWidth||g.clientWidth;
    
g.style.fontSize = (x+2400)/3200 + "em";
g.style.lineHeight = 125e-6*x + 1.2;

/*
size in pixels

g.style.fontSize = x/200 + 12 + "px";
*/
