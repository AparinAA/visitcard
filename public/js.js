const height = ( (document.documentElement.clientHeight - 50) / 5 ) + 'px',
      options = {
          root: null,
          rootMargin: 0,
          threshold: new Array(50).fill(0).map( (item, index) => (index + 1) * 0.02)
      },
      observer = new IntersectionObserver(opacityControl, options),
      info = document.getElementById('info');

document.scrollingElement.scrollTop = 0;
info.style.opacity = 0;

function opacityControl(entries) {
    const [entry] = entries;
    const ratio = Number(entry.intersectionRatio);

    info.style.opacity = 1 - ratio;
    entry.target.style.opacity = ratio * ratio * ratio * ratio;
}

observer.observe(document.getElementById('title'));
