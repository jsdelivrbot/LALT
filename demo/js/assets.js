$LAB

// add scripts with no dependencies and no conditions first
// eg. scripts that you want to load on every device that
// don't depend on jquery or some other library or an environment test

// add jquery, velocity.js and head.js then wait until they are loaded before loading "tests.js"
// I just use these 3 for my examples, you could just as easily use Zepto, Prototype, Modernizr etc
  
  .script("//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js", "js/velocity.min.js", "//cdnjs.cloudflare.com/ajax/libs/headjs/1.0.3/head.css3.min.js").wait()
  
// all scripts that are loaded conditionally
// are placed inside the tests.js" file
// which is queued after jquery, velocity.js and head.js
// are loaded & executed, because the tests depend upon
// one or more of them being loaded

  .script("js/tests.js")
