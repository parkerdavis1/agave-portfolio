---
title: I added a scrolling turkey to my links page and you can too
description: Gobble gobble
date: 2023-11-22
tags:
    - css
    - javascript
    - turkeys
draft: false
---
## Introduction

I have a [very simple links page](https://links.parkerdavis.dev) for sharing links on Instagram and other social media. It currently looks like this:

{% image "./links-original.png", "Original links page screenshot", "small-image" %}

I like to add a little flair throughout the year though and with Thanksgiving being tomorrow, I thought, "why not give thanks to those who visit my links page by showing them one of the most beautiful birds there is, the Wild Turkey?".

{% animatedImage "./scrolling-turkey.gif", "Links page with scrolling turkey", "small-image" %}

I know, its breathtaking. After you take a moment to recover, let's go through the code.

## How did I do it?

### File System

All of the files will be kept in a single `turkey` folder:

```
- root
	- assets
		- turkey
			- turkey.css
			- turkey.html
			- turkey.js
			- turkey.png
```

### CSS

We start with a basic CSS animation. For the HTML there is a `<div class="turkey">` that we will be manipulating. Let's set the height and width of the `div` and the background image to the `.png` file of the turkey.

```css
:root {
	--turkey-width: 75px;
}

.turkey {
    height: var(--turkey-width);
    width: var(--turkey-width);
    background-image: url('/assets/turkey/turkey.png');
    background-position: bottom;
    background-repeat: no-repeat;
}
```

Position the turkey on the bottom of the screen and just out of view on the left side

```diff-css
.turkey {
    background-image: url('/assets/turkey/turkey.png');
    height: var(--turkey-width);
    width: var(--turkey-width);
    background-position: bottom;
    background-repeat: no-repeat;
+   position:fixed;
+   bottom: 0;
+   left: calc(-4 * var(--turkey-width));
}
```

Create a @keyframes animation with an identifier of "trot" to move it from the left side to the right

```css
@keyframes trot {
    0% {
        left: calc(-4 * var(--turkey-width));
    }
    100% {
        left: 100vw;
    }
}
```

...and add the trot animation to the .turkey class

```diff-css
:root {
    --turkey-width: 75px;
+   --animation-duration: 30s;
}

.turkey {
    background-image: url('/assets/turkey/turkey.png');
    height: var(--turkey-width);
    width: var(--turkey-width);
    background-position: bottom;
    background-repeat: no-repeat;
    position:fixed;
    bottom: 0;
    left: calc(-1 * var(--turkey-width));

+   animation-name: trot;
+   animation-duration: var(--animation-duration);
+   animation-direction: normal;
+   animation-iteration-count: infinite;
+   animation-timing-function: linear;
}
```

The CSS property `animation-delay` only applies to the first iteration of an animation so to create a delay before each turkey entrance,  I opted to position the turkey further to the left at the start of each iteration.

This all looks pretty good but there are two problems:

1) The speed at which the turkey trots depends on the width of the browser window since the animation duration is a set value
2) The width of the path the turkey trots is not updated when the user resizes the browser window with some browsers. For animations, the relative values (vw) get converted to absolute values but do not automatically get updated when the window resizes.

We're going to need a little bit of Javascript for this one.

### Javascript

Let's create a function that adjusts the animation duration based on the window size.

```javascript
function adjustTurkeyAnimation() {
    const pixelsPerSecond = 30
    const width = window.innerWidth;
    const seconds = width / pixelsPerSecond + 's';
    document.documentElement.style.setProperty('--animation-duration', seconds);
}
```

I wanted the turkey to trot a certain number of pixels per second, so we can calculate the animation duration by dividing the window width (px) by pixels per second (px/s).

The documentElement property allows you to programmatically set style properties on the root element of the document, the CSS equivalent of: 

```css
:root {
	--animation-duration: /* calculated seconds */
}
```

Now let's add two event listeners on the window, one for when the page finishes loading and one for resizing the window.

```js
window.addEventListener('load', adjustTurkeyAnimation);
window.addEventListener('resize', adjustTurkeyAnimation);
```

By modifying the value of the `animation-duration` property this causes all of the animation values to be recalculated on a window resize so this takes care of both of our problems: maintaining a constant turkey trot speed and making sure the turkey trots across the entire screen.

### Modularization

I wanted it to be completely modular so I could activate and deactivate the turkey very simply. 

Instead of hard coding the turkey `div` into the html, let's add it with the script we're already loading.

```diff-js
function adjustTurkeyAnimation() {
    const pixelsPerSecond = 30
    const width = window.innerWidth;

    const seconds = width / pixelsPerSecond + 's';
    document.documentElement.style.setProperty('--animation-duration', seconds);
}

+function createTurkeyContainer() {
+    const turkeyContainer = document.createElement('div');
+    turkeyContainer.setAttribute('class', 'turkey');
+    document.body.appendChild(turkeyContainer);
+    adjustTurkeyAnimation()
+}

-window.addEventListener('load', adjustTurkeyAnimation);
+window.addEventListener('load', createTurkeyContainer);
window.addEventListener('resize', adjustTurkeyAnimation);
```

When the page loads, we'll instead run the createTurkeyContainer function and append the adjustTurkeyAnimation to the end of the createTurkeyContainer function.

Now the turkey can be added to the page by loading the turkey CSS and JS files via an HTML snippet.

```html
<!-- turkey.html -->

<link rel="stylesheet" href="assets/turkey/turkey.css">

<script src="assets/turkey/turkey.js" defer></script>
```

My links page is an Eleventy site using the Nunjucks templating language, so to include the code I just add the following code to the `<head>` of my links page:

```html
{% raw %}{% include "assets/turkey/turkey.html" %}{% endraw %}
```

All done!

Happy Thanksgiving!

<div class="turkey-container"><div class="turkey">
{% image "./turkey/turkey.png", "Don't click me" %}
</div></div>

{% css %}{% include "./turkey/turkey.css" %} {% endcss %}
{% js %} 
{% include "./turkey/sprite.js" %}
{% include "./turkey/turkey.js" %} 
{% endjs %}
