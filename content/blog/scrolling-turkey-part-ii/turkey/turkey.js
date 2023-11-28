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

// Audio
const gobble = new Sprite({
    src: "./turkey/turkey-sprite.m4a",
    sprite: {
        a: [0, 1000],
        b: [1000, 1000],
        c: [2000, 1100]
    }
})

window.addEventListener('load', () => {
    const turkey = document.querySelector('.turkey');
    turkey.addEventListener('click', () => {
        const sprites = ['a', 'b', 'c'];
        const randomSprite = sprites[Math.floor(Math.random() * sprites.length)] 
        gobble.play(randomSprite)
    })
})