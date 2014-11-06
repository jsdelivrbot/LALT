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

this is where you load your libraries so that tests in tests.js can run and determine weather or not to load resources conditionally.

```javascript
$LAB
.script("js/jquery.js", "js/head.css3.js").wait()
.script("js/tests.js")
```

#### tests.js

this is where you carry out tests which determine if resources will be needed.

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

After the `.script` test is done, then comes the `.wait` init. which would normally be found inside a `<script>` just before the closing `</body>` tag

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
	if (some test) {return ["path/to/script1.js", "path/to/script2.js", "path/to/script3.js..."]; }
	else {return null;}
})
```

#### Multiple conditions per test
You can have multipe conditions on one test
```javascript
.script(function(){
	if ($('.desktop .hasclass').length) {return ["path/to/script1.js", "path/to/script2.js"]; }
	else if ($('.mobile.landscape .hasclass').length) {return ["path/to/script3.js", "path/to/script4.js"]; }
	else if ($('.mobile.portrait .hasclass').length) {return ["path/to/script3.js", "path/to/script5.js"]; }
	else if ($('.lt-ie8 .hasclass').length) {return "shoot/me/now.js"; }
	else {return null;}
})
```
this could also be written like so
```javascript
.script(function(){
	if ($('.hasclass').length) {
		if ($('.desktop').length) {return ["path/to/script1.js", "path/to/script2.js"]; }
		else if ($('.mobile').length) {
			if ($('.landscape').length) {return ["path/to/script3.js", "path/to/script4.js"]; }
			else if ($('.portrait').length) {return ["path/to/script3.js", "path/to/script5.js"]; }
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
	if ($('.mobile.retina').length) {return ["script1.js", "retina.css.js"]; }
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

##### when to load stylesheets conditionally?

The task of conditionally loading a stylesheet does create its own footprint, since you first have to point to a script (above) which will then load a stylesheet. So it's only worth doing this for medium-to-large sized .css files - such as ones that contain `@fontface`, base64 strings, or entire grid systems.   

#### FOUC

Flashes of unstyled content are much more prevelent when loading assets this way. This is because the `document.ready` event is triggered a lot sooner, before assets have had time to load and execute. To avoid this
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
        window.onload = function(){
            var c = document.getElementById("loader");
            a.removeChild(c);
            a.className = a.className.replace("notdone","alldone");
        };
    </script>
```

Basically, what's happening here is that the script is adding the class `.notdone` to the `<body>` element, as well as creating an empty `<div class="loader">`. Then on `windw.onload` the empty `<div class="loader">` is removed and the class `.notdone` is changed to `.alldone`

######Note: Some plugins, like [highlight.js](https://highlightjs.org/) offer you the option of binding the init. to the `window.onload` event. Don't do this! When the browser gets scripts from the cache there is a very good chance that the `window.onload` event will fire *before* the scripts are executed, which will result in non-execution of that script. 

Now if you bind animations, transitions, etc. to `body.alldone` they will only start when the page has finished loading.

#### Examples

##### Icon font loading

head.js, as well as modernizer have tests to see if the `@fontface` css property is supported by a browser. If so, the class `.fontface` is added to the `<html>`, if not `.no-fontface` is added.
Icon fonts are normally setup so that an empty `<span>` with a class `.icon-twitter` will display said icon.
Knowing this we can load an icon font via `@fontface` in a stylesheet if the class `icon-*` is a child of the class `.fontface`, if, on the other hand, `icon-*` is a child of the class `.no-fontface` we can load a png fallback. If no icons are needed in the page then nothing is loaded. 

```javascript
.script(function(){
	if ($('.fontface [class*="icon-"]').length) {return "js/iconfont.css.js"; }
	else if ($('.no-fontface [class*="icon-"]').length) {return "js/png-fallback.css.js"; }
	else {return null;}
})
```

Contents of iconfont.css.js and png-fallback.css.js

```javascript
var link = document.createElement("link");
link.href = "css/iconfont.css";
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);
```
png-fallback.css.js is the same except for the line
```javascript
link.href = "css/png-fallback.css";
```
##### iconfont.css

```css
@font-face {
	font-family: 'iconfont';
	src:url('../fonts/iconfont.eot');
	src:url('../fonts/iconfont.eot?#iefix')   format('embedded-opentype'),
	url('../fonts/iconfont.woff')             format('woff'),
	url('../fonts/iconfont.ttf')              format('truetype'),
	url('../fonts/iconfont.svg#iconfont')     format('svg');
	font-weight: normal;  
	font-style: normal;
}
[class*="icon-"] {
	font-family: 'iconfont';
	speak: none;
	font-variant: normal;
	text-transform: none;
	line-height: 0;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke: 0;
}
.icon-ampersand:before {
	content: "\21";
}
.icon-facebook:before {
	content: "\22";
}
.icon-twitter:before {
	content: "\24";
}
.etc .etc
```
##### png-fallback.css
```css
[class*="icon-"] {
	display: inline-block;
	background-repeat: no-repeat;
	background-size: contain;
	width:1em;
	height:1em;
}
.icon-ampersand {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANS...;
}
.icon-facebook {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEU...;
}
.icon-twitter {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACg...;	
}
.etc .etc
```

#### Compatibility

works on every browser i've tried so far

Firefox 3, IE8, Chrome 14, Opera 15 Safari 5.1

Android: Stock browser for Android 2.3, Chrome, Opera Mini, Firefox, UC Browser

iphone 3GS

WP7.5 (the 1st Windows Phone for lumia 800) and UC Browser for Windows Phone

pretty much compatible with any browser that LABjs itself is compatible with

##### Issues

The LALT for loading resources is supported by the browsers above, any failure is probably down to the script(s) being loaded. So check the browser compatibility of your plugins. 

head.js/modernizr - might not be 100% accurate eg. The head.js @fontface test throws a false positive for IE9 on WP7.5

##### Note
This repository is just a guide, there is nothing to download here













