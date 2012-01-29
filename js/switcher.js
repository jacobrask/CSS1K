(function() {

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
  if (window.location.host === 'css1k.com' && styleSlug !== 'default') {
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
