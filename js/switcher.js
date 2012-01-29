(function() {

    var styleName, styleId, styleLink, authorName, authorUrl, authorLink, li, s,
        hash = window.location.hash,
        nav = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0],
        styles = document.getElementsByTagName('link');
   
    // set stylesheet from window hash
    var switchStyle = function() {
        if (window.location.hash.length <= 1) {
            newStyle = 'default';
        } else {
            newStyle = window.location.hash.slice(1);
        }
            styles[0].href = 'styles/' + newStyle + '.css';
            // track style change as page view in Google Analytics if on the live site
            if (window.location.host === 'css1k.com') {
                _gaq.push(['_trackPageview', window.location.hash]);
            }
    }

    // for hash permalinks    
    if (hash.length > 1) {
        switchStyle();
    }

    // track hash changes
    if ('onhashchange' in window) {
        window.onhashchange = switchStyle;
    } else {
        setInterval(function() {
            if (window.location.hash != hash) {
                hash = window.location.hash;
                switchStyle();
            }
        }, 250);
    }

    // loop through stylesheet links and build style switcher
    // skip first one (default stylesheet)
    for(var i = 1; styles.length > i; i++) {
        if (/^stylesheet/.test(styles[i].getAttribute('rel'))) {
            s = styles[i];
            styleName = s.getAttribute('title');
            styleId = s.getAttribute('data-id');
            styleLink = styleName.link('#' + styleId);

            authorName = s.getAttribute('data-author-name');
            authorUrl = s.getAttribute('data-author-url');
            authorLink = authorName.link(authorUrl);

            li = document.createElement('li');
            li.innerHTML = styleLink + ' ' + authorLink;
 
            nav.appendChild(li);
        }
    }

})();
