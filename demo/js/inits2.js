
$LAB
.wait(function(){
	$.jaygrid();
})
.wait(function(){
	$("#test-4").parallax("50%", 0.3);
})
.wait(function(){
	$("table").stupidtable();
})
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
}); // <-- remember to end with a semi-colon
