var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'PLEASE_GET_CORRECT_ID_FROM_CLIENT']); // //ACCOUNT_ID_DIFFERENT_FOR_EACH_GAME
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

window.onerror = function myErrorHandler(msg, url, lineNumber) {
	_gaq.push(['_trackEvent', msg, url, lineNumber]);
}
