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
You can have multipe conditions on one test
```javascript
.script(function(){
	if ($('.desktop .hasclass').length) {return "path/to/script1.js", "path/to/script2.js"; }
	else if ($('.mobile.landscape .hasclass').length) {return "path/to/script3.js", "path/to/script4.js"; }
	else if ($('.mobile.portrait .hasclass').length) {return "path/to/script3.js", "path/to/script5.js"; }
	else if ($('.lt-ie8 .hasclass').length) {return "shoot/me/now.js"; }
	else {return null;}
})
```
this could also be written like so
```javascript
.script(function(){
	if ($('.hasclass').length) {
		if ($('.desktop').length) {return "path/to/script1.js", "path/to/script2.js"; }
		else if ($('.mobile').length) { return "path/to/script3.js";
			if ($('.landscape').length) {return "path/to/script4.js"; }
			else if ($('.portrait').length) {return "path/to/script5.js"; }
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

retina.css.js is this script which will append this `<link>` to the `<head>`

```javascript
var link = document.createElement("link");
link.href = "css/retina.css";
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);
```
#### FOUC

Flashes of unstyled content are much more prevelent when loading assets this way. This is because the `window.onload` event is triggered a lot sooner, before assets have had time to load and execute. To avoid this
add a simple `<script>` right after the opening `<body>` element, with some `<style>` in the `<head>`

```html
	<style>
		.notdone { overflow:hidden;}
		#loader ~ * { opacity:0; }
		#loader:before { 
			position:fixed;
			text-align:center;
			width:100%;
			top:50%;
			content:"loading...";
		}
	</style>
</head>
<body>
    <script>
        var a = document.getElementsByTagName("body")[0];
        a.className = a.className + " notdone";
        var b = document.createElement("div");
        a.appendChild(b);
        b.id = "loader";
    </script>
```
and add this script at the end of the queue in tests.js
```javascript
.wait(function(){
    var a = document.getElementsByTagName("body")[0];
    var c = document.getElementById("loader");           
    a.removeChild(c);
    a.className = a.className.replace("notdone","alldone");
});
```

Basically, what's happening here is that the script is adding the class `.notdone` to the `<body>` element, as well as creating an empty `<div>` with the class `.loader` In the second part - which is triggered when all scripts are loaded - the empty `.loader` `<div>` is removed and the class `.notdone` is changed to `.alldone`

Now if you bind animations, transitions etc to `body.alldone` they will only start when the page has finished loading.

#### Compatibility

works on every browser i've tried so far

Firefox 3, IE8, Chrome 14, Opera 15 Safari 5.1

Android: Stock browser for Android 2.3, Chrome, Opera Mini, Firefox, UC Browser

iphone 3GS

WP7.5 (the 1st Windows Phone for lumia 800) and UC Browser for Windows Phone

pretty much compatible with any browser that LABjs itself is compatible with















