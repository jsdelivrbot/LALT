$LAB
// write each test in a seperate .script function
// all tests are run simultaneously/asynchronously

.script(function(){
	
// load script if the <table> element exists
	
	if ($('table').length) {return "js/stupidtable.min.js"; }
	
// otherwise do nothing
	
	else {return null;}	
})
.script(function(){
	if ($('[class*="-col-"]').length) {return "js/jquery.jaygrid.min.js"; }
	else {return null;}
})
.script(function(){
		if ($('.desktop').length) {return "js/visibly.js"; }
		else {return null;}
})

/*

// add stylesheets by including a .js file, that will inturn
// create a <link> with your stylesheets. This is commented out
// because I prefer creating the <link> directly in a .wait
// function see below...

.script(function(){
	if ($('.fontface [class*="icon-"]').length) {return "js/font-includes.js"; }
	else if ($('.no-fontface [class*="icon-"]').length) {return "js/font-includes-fallback.js"; }
	else {return null;}
})
*/

// again, write each inline initialization script in a seperate .wait function
// these init. scripts are chained, they DON'T run simultaneously/asynchronously

.wait(function(){
	
// conditionally include a stylesheet 
	
// this is quite handy, If @fontface is supported
// and there is an icon in use somewhere in the doc.
// then the iconfont is loaded, if there is no @fontface
// support then a fallback is loaded, eg. .png icons
// in place of an iconfont. If no icons are found, then 
// neither are loaded.
	
	if ($('.fontface [class*="icon-"]').length) { 
		var link = document.createElement("link");
		link.href = "css/iconfont.css";
		link.type = "text/css";
		link.rel = "stylesheet";
		document.getElementsByTagName("head")[0].appendChild(link);
	}
	else if ($('.no-fontface [class*="icon-"]').length) { 
		var link = document.createElement("link");
		link.href = "css/iconfont-fallback.css";
		link.type = "text/css";
		link.rel = "stylesheet";
		document.getElementsByTagName("head")[0].appendChild(link);
	}
	else {return null;}
})
.wait(function(){
	$("table").stupidtable();
})
.wait(function(){
	$.jaygrid();
})

// this is the second part of the avoiding FOUC script,
// it should come last in the chain unless...

.wait(function(){
    var a = document.getElementsByTagName("body")[0];
    var c = document.getElementById("loader");           
    a.removeChild(c);
    a.className = a.className.replace("notdone","alldone");
})

// ...unless you use a script that doesn't affect the layout of the page
// and wont be missed/triggered at page load, eg. a script that validates forms (validate.js), 
// or one for tooltips (bootstrap-tooltip.js) or this init. below which triggers when you switch tabs

.wait(function(){
	visibly.onHidden(function (){
    	$("body").css({"opacity":"0"})
	}); 
    visibly.onVisible(function (){
    	$("body").velocity({ opacity: 1 }, { duration: 600 })
	});
})

// ignore this, this is just to help me see the
// classes that head.js is adding to the html

.script("js/classes.js")
.wait(function(){
	var theclasses = $('html').classes().toString().replace(/,/g," ");
	$(".theclasses").html(theclasses);
}); // <-- but remember to end with a semi-colon
