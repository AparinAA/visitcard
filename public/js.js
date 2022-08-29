const height = ( (document.documentElement.clientHeight - 50) / 3 ) + 'px';
let options = {
    root: null,
    rootMargin: height,
    threshold: new Array(20).fill(0).map( (item, index) => (index + 1) * 0.05)
}


let observer = new IntersectionObserver(cleaned, options);
document.getElementById('title').style.opacity = 1;
document.scrollingElement.scrollTop = 0;

let info = document.getElementById('info');
info.style.opacity = 0;

let curPos = 1;

function cleaned(entries, observer) {
    const [entry] = entries;
    
    if ( (Number(entry.target.style.opacity) <= 1.0) && (Number(entry.target.style.opacity) >= 0) ) {
        if ( (curPos > Number(entry.intersectionRatio) ) ) {
            info.style.opacity = Number(info.style.opacity) + 0.1;
            entry.target.style.opacity = Number(entry.target.style.opacity) - 0.1;
            
            if ( Number(entry.target.style.opacity) < 0) {
                entry.target.style.opacity = 0;
            } 
            
            if ( Number(info.style.opacity) > 1) {
                info.style.opacity = 1;
            }
        } else if ( ( curPos < Number(entry.intersectionRatio) ) ) {
            info.style.opacity = Number(info.style.opacity) - 0.1;
            entry.target.style.opacity = Number(entry.target.style.opacity) + 0.1;
            
            if (  Number(entry.target.style.opacity) > 1) {
                entry.target.style.opacity = 1;
            } 
            
            if (  Number(info.style.opacity) < 0) {
                info.style.opacity = 0;
            }
        }
    }
    curPos = Number(entry.intersectionRatio);
}

observer.observe(document.getElementById('title'));
