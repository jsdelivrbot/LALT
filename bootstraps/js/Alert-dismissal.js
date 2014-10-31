/*!
 * Bootstrap v3.3.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=0ded4f6b95ae43e28ec8)
 * Config saved to config.json and https://gist.github.com/0ded4f6b95ae43e28ec8
 */
+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),r=i.data("bs.alert");r||i.data("bs.alert",r=new s(this)),"string"==typeof e&&r[e].call(i)})}var i='[data-dismiss="alert"]',s=function(e){t(e).on("click",i,this.close)};s.VERSION="3.3.0",s.TRANSITION_DURATION=150,s.prototype.close=function(e){function i(){a.detach().trigger("closed.bs.alert").remove()}var r=t(this),n=r.attr("data-target");n||(n=r.attr("href"),n=n&&n.replace(/.*(?=#[^\s]*$)/,""));var a=t(n);e&&e.preventDefault(),a.length||(a=r.closest(".alert")),a.trigger(e=t.Event("close.bs.alert")),e.isDefaultPrevented()||(a.removeClass("in"),t.support.transition&&a.hasClass("fade")?a.one("bsTransitionEnd",i).emulateTransitionEnd(s.TRANSITION_DURATION):i())};var r=t.fn.alert;t.fn.alert=e,t.fn.alert.Constructor=s,t.fn.alert.noConflict=function(){return t.fn.alert=r,this},t(document).on("click.bs.alert.data-api",i,s.prototype.close)}(jQuery);
