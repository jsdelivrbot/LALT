$LAB
.script("//cdnjs.cloudflare.com/ajax/libs/FitText.js/1.1/jquery.fittext.min.js")
.wait(function(){
	$.jaygrid();
	$("#test-4").parallax("50%", 0.3);
	$("table").stupidtable();
	window.sr = new scrollReveal({
		reset: true,
		move: '222px',
		mobile: true
	});
	visibly.onHidden(function (){
    	$("body").css({"opacity":"0"})
	}); 
    visibly.onVisible(function (){
    	$("body").velocity({ opacity: 1 }, { duration: 600 })
	});
}); // <-- remember to end with a semi-colon
