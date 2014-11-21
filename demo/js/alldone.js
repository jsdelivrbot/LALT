var a = document.getElementsByTagName("body")[0];
var c = document.getElementById("loader");
c.className = "loaded";
a.className = a.className.replace("notdone","alldone");
setTimeout(function() {
  a.removeChild(c);
}, 1500);
window.onbeforeunload = (function() {
  a.id = "byebye";
});
