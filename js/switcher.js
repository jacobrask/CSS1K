document.addEventListener("DOMContentLoaded", init, false);

function init() {

    var styleName, styleUrl, styleLink, authorName, authorUrl, authorLink, 
        li, s,
        nav = document.querySelector('header nav ul'),
        styles = document.querySelectorAll('link[rel^=stylesheet]'),
        defaultLink = nav.querySelector('a:first-child');

    // loop through stylesheet links, but skip first one (default)
    for(var i = 1; styles.length > i; i++) {
        s = styles[i];
        styleName = s.getAttribute('data-name');
        styleUrl = s.getAttribute('href');
        authorName = s.getAttribute('data-author-name');
        authorUrl = s.getAttribute('data-author-url');

        styleLink = document.createElement('a');
        styleLink.innerHTML = styleName;
        styleLink.href = styleUrl;
        styleLink.onclick = switchStyle;

        authorLink = document.createElement('a');
        authorLink.innerHTML = authorName;
        authorLink.href = authorUrl;

        li = document.createElement('li');
        li.appendChild(styleLink);
        li.appendChild(authorLink);
        
        nav.appendChild(li);
    }
    
    defaultLink.onclick = switchStyle;

    function switchStyle(ev) {
        styles[0].href = this.href;
        ev.preventDefault();
    }
}
