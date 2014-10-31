/*!
 * Bootstrap v3.3.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=ba78b4afece08235e718)
 * Config saved to config.json and https://gist.github.com/ba78b4afece08235e718
 */
+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),n=i.data("bs.tab");n||i.data("bs.tab",n=new o(this)),"string"==typeof e&&n[e]()})}var o=function(e){this.element=t(e)};o.VERSION="3.3.0",o.TRANSITION_DURATION=150,o.prototype.show=function(){var e=this.element,o=e.closest("ul:not(.dropdown-menu)"),i=e.data("target");if(i||(i=e.attr("href"),i=i&&i.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var n=o.find(".active:last a"),s=t.Event("hide.bs.tab",{relatedTarget:e[0]}),r=t.Event("show.bs.tab",{relatedTarget:n[0]});if(n.trigger(s),e.trigger(r),!r.isDefaultPrevented()&&!s.isDefaultPrevented()){var a=t(i);this.activate(e.closest("li"),o),this.activate(a,a.parent(),function(){n.trigger({type:"hidden.bs.tab",relatedTarget:e[0]}),e.trigger({type:"shown.bs.tab",relatedTarget:n[0]})})}}},o.prototype.activate=function(e,i,n){function s(){r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),a?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu")&&e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),n&&n()}var r=i.find("> .active"),a=n&&t.support.transition&&(r.length&&r.hasClass("fade")||!!i.find("> .fade").length);r.length&&a?r.one("bsTransitionEnd",s).emulateTransitionEnd(o.TRANSITION_DURATION):s(),r.removeClass("in")};var i=t.fn.tab;t.fn.tab=e,t.fn.tab.Constructor=o,t.fn.tab.noConflict=function(){return t.fn.tab=i,this};var n=function(o){o.preventDefault(),e.call(t(this),"show")};t(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',n).on("click.bs.tab.data-api",'[data-toggle="pill"]',n)}(jQuery);
