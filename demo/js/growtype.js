function typeScale(){
  var a=window,
      b=document,
      c=b.documentElement,
      d=b.getElementsByTagName("body")[0],
      e=a.innerWidth||c.clientWidth||d.clientWidth;
    d.style.fontSize=(e+4320)/5120+"em",
    d.style.lineHeight=125e-6*e+1.2
}
window.addEventListener("resize",typeScale),
typeScale();
