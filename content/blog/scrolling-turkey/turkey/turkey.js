function adjustTurkeyAnimation() {
    const pixelsPerSecond = 30
    const width = document.querySelector('.turkey-container').scrollWidth;
    const widthString = width + 'px';
    document.documentElement.style.setProperty('--container-width', widthString);
    const seconds = width / pixelsPerSecond + 's';
    document.documentElement.style.setProperty('--animation-duration', seconds);
}

window.addEventListener('load', adjustTurkeyAnimation);
window.addEventListener('resize', adjustTurkeyAnimation);