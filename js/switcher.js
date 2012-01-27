(function() {
$("abbr").each(function() {
	$(this).text()==="CSS"?$(this).attr("title", "Cascading Style Sheets")
	:$(this).text()==="K"?$(this).attr("title", "Kibibyte")
	:$(this).attr("title", "Unified Resource Identificator")
});
var hash = window.location.hash;

var switchStyle = function() {
  var styleSlug = window.location.hash.slice(1) || 'default'
    , styleUrl = 'styles/' + styleSlug + '.css';
  // Use PrefixFree to add vendor prefixes if it exists and is functional.
  $.get(styleUrl).success(function(data) {
    $('style').first().text(
      PrefixFree ? PrefixFree.prefixCSS(data)
                 : data
    );
  });
  if (window.location.host === 'css1k.com') {
    _gaq.push(['_trackPageview', styleSlug]);
  }
};

$(function() {

  // For permalinks and default style.
  switchStyle();

  // Track hash changes.
  if ('onhashchange' in window) {
    $(window).on('hashchange', switchStyle);
  } else {
    setInterval(function() {
      if (window.location.hash != hash) {
        hash = window.location.hash;
        switchStyle();
      }
    }, 250);
  }
});

})();
