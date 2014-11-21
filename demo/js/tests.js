$LAB
// write each test in a seperate .script function
// all tests are run simultaneously/asynchronously
.script(function(){
	
	// load script if the the class *-col-* exists
	
	if ($('[class*="-col-"]').length) {return "//rawgit.com/Paul-Browne/jaygrid/master/js/jquery.jaygrid.min.js"; }
	
	// otherwise do nothing
	
	else {return null;}
})
.script(function(){
	if ($('table').length) {return ["//cdnjs.cloudflare.com/ajax/libs/stupidtable/0.0.1/stupidtable.js", "js/table.css.js"]; }
	else {return null;}	
})
.script(function(){
	
	// add stylesheets by including a .js file, that will inturn create a <link> with your stylesheets.
	
	if ($('.fontface [class*="icon-"]').length) {return "js/iconfont.css.js"; }
	else if ($('.no-fontface [class*="icon-"]').length) {return "js/iconfont-fallback.css.js"; }
	else {return null;}
})
.script(function(){
	if ($('.desktop').length) {return "//rawgit.com/addyosmani/visibly.js/master/visibly.js"; }
	else {return null;}
})
.script(function(){
	if ($('[data-sr]').length) {return "js/scrollReveal.min.js"; }
	else {return null;}
})
.script(function(){
	return "js/typeScale.min.js"; 
})
.script(function(){
	if ($('#test-4').length) {return "//cdnjs.cloudflare.com/ajax/libs/jquery-parallax/1.1.3/jquery-parallax-min.js"; }	
	else {return null;}
})
.wait()
.script("js/inits2.js");

// write each inline initialization script in a seperate .wait function
// these init. scripts are chained, they DON'T run simultaneously/asynchronously
