yepnope({ 
  test: ($('table').length),
  yep: ['//cdnjs.cloudflare.com/ajax/libs/stupidtable/0.0.1/stupidtable.js', 'css/table.css'],
  callback: function (url, result, key) {
    $("table").stupidtable();
  }
});
yepnope({ 
  test: ($('[class*="-col-"]').length),
  yep: 'js/jquery.jaygrid.min.js',
  callback: function (url, result, key) {
    $.jaygrid();
  }
});
yepnope({ 
  test: ($('.fontface [class*="icon-"]').length),
  yep: 'css/iconfont.css'
});
yepnope({ 
  test: ($('.no-fontface [class*="icon-"]').length),
  yep: 'css/iconfont-fallback.css'
});
yepnope({ 
  test: ($('[data-sr]').length),
  yep: 'js/scrollReveal.min.js',
  callback: function (url, result, key) {
    window.sr = new scrollReveal({
  		reset: true,
  		move: '222px',
  		mobile: true
	});
  }
});
yepnope({ 
  test: ($('#test-4').length),
  yep: '//cdnjs.cloudflare.com/ajax/libs/jquery-parallax/1.1.3/jquery-parallax-min.js',
  callback: function (url, result, key) {
    $("#test-4").parallax("50%", 0.3);
  }
});
yepnope({ 
  test: ($('.desktop').length),
  yep: '//rawgit.com/addyosmani/visibly.js/master/visibly.js',
  callback: function (url, result, key) {
    visibly.onHidden(function (){
      $("body").css({"opacity":"0"})
    }); 
    visibly.onVisible(function (){
      $("body").velocity({ opacity: 1 }, { duration: 600 })
    });
  }
});
//yepnope('js/alldone.js');
