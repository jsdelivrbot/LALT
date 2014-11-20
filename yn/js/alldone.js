var a = document.getElementsByTagName("body")[0];
var c = document.getElementById("loader");           
a.removeChild(c);
a.className = a.className.replace("notdone","alldone");
