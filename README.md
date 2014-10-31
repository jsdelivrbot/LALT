## LALT

LALT - LABS.js Asset Loading Technique

#### What is LALT?

Built on [LAB.js](http://labjs.com/) fantastic script loader, LALT is a technique for loading assets - js & css - conditionally, so resources are only ever loaded when they are needed.

### Setup

these are the only two scripts you'll need in your `<head>`

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/labjs/2.0.3/LAB.min.js"></script>
<script src="js/assets.js"></script>
```

####assets.js

this is where you load your libraries that other scripts/tests depend on and your tests.js for scripts that load conditionally [more info](https://github.com/Paul-Browne/LALT/blob/master/js/assets.js)

```javascript
$LAB
.script("js/jquery.js", "js/modernizr.js").wait()
.script("js/tests.js")
```
