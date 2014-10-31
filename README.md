## LALT

LALT - LAB.js Asset Loading Technique

#### What is LALT?

Built on [LAB.js](http://labjs.com/) fantastic script loader, LALT is a technique for loading assets - js & css - conditionally, so resources are only ever loaded when they are needed.

### Setup

these are the only two scripts you'll need in your `<head>`

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/labjs/2.0.3/LAB.min.js"></script>
<script src="js/assets.js"></script>
```

#### assets.js

this is where you load your libraries that scripts in tests.js depend upon to be able to load resources conditionally [more info](https://github.com/Paul-Browne/LALT/blob/master/js/assets.js)

```javascript
$LAB
.script("js/jquery.js", "js/head.css3.js").wait()
.script("js/tests.js")
```

#### tests.js

this is where you carry out tests which determine if resources will be needed
[more info](https://github.com/Paul-Browne/LALT/blob/master/js/tests.js)

```javascript
$LAB
.script(function(){
	if ($('.desktop [data-sr]').length) {return "js/scrollReveal.min.js"; }
	else {return null;}	
})
.script(function(){
	if ($('input[type="radio"], input[type="checkbox"]').length) {return "js/icheck.min.js"; }
	else {return null;}	
})
.script(function(){
	if ($('th[data-sort]').length) {return "js/stupidtable.min.js"; }
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
.wait(function(){
	$("table").stupidtable();
})
.wait(function(){
	$.jaygrid();
})
.wait(function(){
	visibly.onHidden(function (){
    	$("body").css({"opacity":"0"})
	}); 
    visibly.onVisible(function (){
    	$("body").velocity({ opacity: 1 }, { duration: 600 })
	});
});
```

#### Whats going on here?

OK, so we have 5 scripts and 5 inits. The first `.script` is for the [scrollReveal]() plugin, the test runs like so...

If the class `.desktop` is found and the attribute `[data-sr]` is a child of `.desktop` then the scrollReveal script will load. If not, then nothing is loaded. simple.

```javascript
.script(function(){
	if ($('.desktop [data-sr]').length) {return "js/scrollReveal.min.js"; }
	else {return null;}	
})
```

The `.desktop` class is added to the `<html>` element by the head.css3.js script back in assets.js, and the test is 'written' in jquery, which is why both of these needed to be loaded and executed before the tests.js file is loaded 

```javascript
.script(function(){
	if (/*some test*/) {return "/*script1*/", "/*script2*/", "/*script3...*/"; }
	else {return null;}
```














