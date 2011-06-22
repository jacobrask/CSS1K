document.addEventListener("DOMContentLoaded", init, false);

function init() {

    var styleName, styleUrl, styleLink, authorName, authorUrl, authorLink,
        li, s,
        hash = window.location.hash,
        nav = document.querySelector('header nav ul'),
        styles = document.querySelectorAll('link[rel^=stylesheet]'),
        defaultLink = nav.querySelector('a[href="#default"]');
   

    // set stylesheet from window hash
    var switchStyle = function() {
        styles[0].href = 'css/' + window.location.hash.slice(1) + '-full.css';
        console.log(styles[0].href);
        // track style change as page view in Google Analytics 
        _gaq.push(['_trackPageview', window.location.href]);
    }

    // for hash permalinks    
    if (hash.length > 1) {
        switchStyle();
    }

    // track hash
    if ('onhashchange' in window) {
        window.addEventListener('hashchange', switchStyle, false);
    } else {
        setInterval(function() {
            if (window.location.hash != hash) {
                hash = window.location.hash;
                switchStyle();
            }
        }, 500);
    }

    // loop through stylesheet links and build style switcher
    // skip first one (default)
    for(var i = 1; styles.length > i; i++) {
        s = styles[i];
        styleName = s.getAttribute('title');
        styleId = s.getAttribute('data-id');
        styleUrl = s.getAttribute('href');

        authorName = s.getAttribute('data-author-name');
        authorUrl = s.getAttribute('data-author-url');

        styleLink = document.createElement('a');
        styleLink.innerHTML = styleName;
        styleLink.href = '#' + styleId;
        styleLink.setAttribute('data-src', styleUrl);

        authorLink = document.createElement('a');
        authorLink.innerHTML = authorName;
        authorLink.href = authorUrl;

        li = document.createElement('li');
        li.appendChild(styleLink);
        li.appendChild(authorLink);
        
        styleLink.addEventListener('click', switchStyle, false);
        nav.appendChild(li);
    }
    
}
