const height = ( (document.documentElement.clientHeight - 50) / 5 ) + 'px';

let options = {
    root: null,
    rootMargin: 0,
    threshold: new Array(50).fill(0).map( (item, index) => (index + 1) * 0.02)
},
observer = new IntersectionObserver(cleaned, options),
info = document.getElementById('info'),
curPos = 1;

document.scrollingElement.scrollTop = 0;
//document.getElementById('title').style.opacity = 1;
info.style.opacity = 0;

function cleaned(entries) {
    const [entry] = entries;
    console.info(entry.intersectionRatio)
    if ( (Number(entry.target.style.opacity) <= 1.0) && (Number(entry.target.style.opacity) >= 0) ) {
        info.style.opacity = 1 - Number(entry.intersectionRatio);
        entry.target.style.opacity = Number(entry.intersectionRatio) * Number(entry.intersectionRatio) * Number(entry.intersectionRatio) * Number(entry.intersectionRatio);
    }
    curPos = Number(entry.intersectionRatio);
}

observer.observe(document.getElementById('title'));
