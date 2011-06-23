(function() {

    var styleName, styleId, styleLink, authorName, authorUrl, authorLink, li, s,
        hash = window.location.hash,
        nav = document.querySelector('header nav ul'),
        styles = document.querySelectorAll('link[rel^=stylesheet]');
   
    // set stylesheet from window hash
    var switchStyle = function() {
        if (window.location.hash.length <= 1) {
            newStyle = 'default';
        } else {
            newStyle = window.location.hash.slice(1);
        }
            styles[0].href = 'css/' + newStyle + '.css';
            // track style change as page view in Google Analytics 
            _gaq.push(['_trackPageview', window.location.href]);
    }

    // for hash permalinks    
    if (hash.length > 1) {
        switchStyle();
    }

    // track hash changes
    if ('onhashchange' in window) {
        window.addEventListener('hashchange', switchStyle, false);
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
        s = styles[i];

        styleName = s.getAttribute('title');
        styleId = s.getAttribute('data-id');
        styleLink = styleName.link('#' + styleId); 

        authorName = s.getAttribute('data-author-name');
        authorUrl = s.getAttribute('data-author-url');
        authorLink = authorName.link(authorUrl);

        li = document.createElement('li');
        li.innerHTML = styleLink + authorLink;
        
        nav.appendChild(li);
    }

})();
