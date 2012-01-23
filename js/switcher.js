(function() {

var hash = window.location.hash;

var switchStyle = function() {
  var styleSlug, styleUrl, $styleEls, $link;
  styleSlug = window.location.hash.slice(1);
  styleUrl = 'styles/' + styleSlug + '.css';
  $styleEls = $('style');
  // Use PrefixFree to prefix CSS if it exists.
  if ($styleEls.length > 0 && PrefixFree) {
    $.get(styleUrl).success(function(data) {
      $styleEls.first().text(PrefixFree.prefixCSS(data));
    });
  // Otherwise update existing or add new link tag.
  } else {
    if ($('link[rel=stylesheet]').length > 0) {
      $link = $('link[rel=stylesheet]');
    } else {
      $link = $('<link rel="stylesheet" />').appendTo($('head'));
    }
    $link.attr('href', styleUrl);
  }
  if (window.location.host === 'css1k.com') {
    _gaq.push(['_trackPageview', styleSlug]);
  }
};

$(function() {

  // Handle direct hash links.
  if (hash.length > 1) {
    switchStyle();
  }

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
