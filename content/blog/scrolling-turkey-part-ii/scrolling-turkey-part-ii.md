---
title: "Scrolling Turkey Part II: The Gobble"
description: A trotting turkey is awesome, but what about a gobbling turkey.
date: 2023-11-28
tags:
  - web-audio
  - javascript
  - css
  - turkeys
draft: false
eleventyExcludeFromCollections: false
---
In my last post I made a [scrolling turkey](/blog/scrolling-turkey) but quickly realized, it needed to gobble.

I started by getting a few audio files of turkeys gobbling. I assembled the samples into a single file so that I could load them with a single http request but play them as audio sprites. I used OcenAudio to do it manually but I probably should have used the NPM package [audiosprite](https://www.npmjs.com/package/audiosprite) which uses FFMPEG to automatically create audio sprites with associated metadata. 

I grabbed the Sprite class from [this repo](https://github.com/musicandcode/WAAPI-Audio-Sprite/blob/main/app.js) and in its simplicity it works wonders!

```javascript
class Sprite {
  constructor(settingsObj) {
    this.src = settingsObj.src;
    this.samples = settingsObj.sprite;

    this.init();
  }

  async init() {
    // Set up web audio
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioCtx;
    // Load file
    this.audioBuffer = await this.getFile();
  }
  async getFile() {
    // Request file
    const response = await fetch(this.src);
    if (!response.ok) {
      console.log(`${response.url} ${response.statusText}`);
      throw new Error(`${response.url} ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  play(sampleName) {
    const startTime = this.samples[sampleName][0] / 1000;
    const duration = this.samples[sampleName][1] / 1000;
    const sampleSource = this.ctx.createBufferSource();
    sampleSource.buffer = this.audioBuffer;
    sampleSource.connect(this.ctx.destination);
    sampleSource.start(this.ctx.currentTime, startTime, duration);
  }
}
```

An instance of the class loads the audio file as an audio buffer. You pass in an options object with a path to the audio file in `src`, and a `sprite` object with named sprite keys with start times and duration in milliseconds. I just plugged in my audio file and the metadata for the three gobbles named a, b, and c:

```javascript
const gobble = new Sprite({
	src: "assets/turkey/turkey-sprite.m4a",
	sprite: {
		a: [0, 1000],
		b: [1000, 1000],
		c: [2000, 1100]
	}
})
```

I then add an event listener after the page loads to handle when someone clicks the turkey:

```javascript
window.addEventListener('load', () => {
	const turkey = document.querySelector('.turkey');
	turkey.addEventListener('click', () => {
		const sprites = ['a', 'b', 'c'];
		const randomSprite = sprites[Math.floor(Math.random() * sprites.length)]
		gobble.play(randomSprite)
	})
})
```

As a result, I am filled with delight.

<div class="turkey-container"><div class="turkey">
{% image "./turkey/turkey.png", "Don't click me" %}
</div></div>

{% css %}{% include "./turkey/turkey.css" %} {% endcss %}
{% js %}
{% include "./turkey/sprite.js" %}
{% include "./turkey/turkey.js" %}
{% endjs %}
