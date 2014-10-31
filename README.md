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

this is where you load your libraries so that tests in tests.js can run and determine weather or not to load resources conditionally [more info](https://github.com/Paul-Browne/LALT/blob/master/js/assets.js)

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
.wait(function(){
	window.sr = new scrollReveal();
});
```

#### Whats going on here?

OK, so we have 1 script and 1 init. for the [scrollReveal]() plugin, the test runs like so...

If the class `.desktop` is found and the attribute `[data-sr]` is a child of `.desktop` then the scrollReveal script will load. If not, then nothing is loaded. simple.

The `.desktop` class is added to the `<html>` element by the head.css3.js script back in assets.js, and the test is 'written' in jquery, which is why both of these needed to be loaded and executed before the tests.js file is loaded. The attrib. `[data-sr]` is added to any element that you want to add some fancy scrolling effect to.

After the `.script` test is done, then comes the `.wait` init. which is usually found inside a `<script>` just before the closing `</body>` tag

#### Multiple tests

Probably you'll want to be loading more than one script

```javascript
$LAB
.script(function(){
	if ($('.desktop [data-sr]').length) {return "js/scrollReveal.min.js"; }
	else {return null;}	
})
.script(function(){
	if ($('th[data-sort]').length) {return "js/stupidtable.js"; }
	else {return null;}	
})
.wait(function(){
	window.sr = new scrollReveal();
})
.wait(function(){
	$("table").stupidtable();
});
```

Here i've added another test for a script I want to load, when I have a table that is sorted by the [stupidtable]() plugin. The test looks to see if the `[data-sort]` attrib. is attached to a `<th>` element. If it is, then the script is loaded, if not, nothing is loaded.
The `.scripts` are chained like so because they are run simultaneously/asynchronously, if you chained everything like `.script` `.wait` `.script` `.wait` you would lose the asynchronicity

#### Multiple scripts per test

You can load more than one script when a test is passed, like so

```javascript
.script(function(){
	if (some test) {return "path/to/script1.js", "path/to/script2.js", "path/to/script3.js..."; }
	else {return null;}
})
```

#### Multiple conditions per test

You can have more than one condition, like so

```javascript
.script(function(){
	if ($('.desktop .hasclass').length) {return "path/to/script1.js", "path/to/script2.js"; }
	else if ($('.mobile.landscape .hasclass').length) {return "path/to/script3.js", "path/to/script4.js"; }
	else if ($('.mobile.portrait .hasclass').length) {return "path/to/script5.js", "path/to/script6.js"; }
	else if ($('.lt-ie8 .hasclass').length) {return "shoot/me/now.js"; }
	else {return null;}
})
```
this could also be written like so
```javascript
.script(function(){
	if ($('.hasclass').length) {
		if ($('.desktop').length) {return "path/to/script1.js", "path/to/script2.js"; }
		else if ($('.mobile').length) {
			if ($('.landscape').length) {return "path/to/script3.js", "path/to/script4.js"; }
			else if ($('.portrait').length) {return "path/to/script5.js", "path/to/script6.js"; }
			else {return null;}
		}
		else if ($('.lt-ie8').length) {return "shoot/me/now.js"; }
		else {return null;}
	}
	else {return null;}
})
```

#### loading stylesheets

When a test is passed the `.script` only returns scripts, so you need to write a script which will in turn load a stylesheet

```javascript
.script(function(){
	if ($('.mobile.retina').length) {return "script1.js", "retina.css.js"; }
	else {return null;}
})
```

##### retina.css.js

retina.css.js is this script which will append a `<link>` to the `<head>`

```javascript
var link = document.createElement("link");
link.href = "css/retina.css";
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);
```















