$LAB
.script("js/john.js")
.wait(function(){
	$.jaygrid();
})
.script("js/paul.js")
.wait(function(){
	$("#test-4").parallax("50%", 0.3);
})
.script("js/george.js")
.wait(function(){
	$("table").stupidtable();
})
.script("js/ringo.js")
.wait(function(){
	window.sr = new scrollReveal({
		reset: true,
		move: '222px',
		mobile: true
	});
})
.wait(function(){
	visibly.onHidden(function (){
    	$("body").css({"opacity":"0"})
	}); 
    visibly.onVisible(function (){
    	$("body").velocity({ opacity: 1 }, { duration: 600 })
	});
})
.script("js/alldone.js"); // <-- remember to end with a semi-colon
