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

this is where you load your libraries that other scripts/tests depend on and your tests.js for the resources that load conditionally [more info](https://github.com/Paul-Browne/LALT/blob/master/js/assets.js)

```javascript
$LAB
.script("js/jquery.js", "js/head.css3.js").wait()
.script("js/tests.js")
```

#### tests.js

this is where you carry out tests which determine if scripts/stylesheets will be needed
[more info](https://github.com/Paul-Browne/LALT/blob/master/js/tests.js)

```javascript
$LAB
.script(function(){
	if ($('table').length) {return "js/stupidtable.min.js"; }
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
