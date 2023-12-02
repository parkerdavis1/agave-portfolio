---
title: Responsive dark/light mode with 1 line of CSS
description: Note to self for next time I make a super simple HTML page
date: 2023-11-21
tags: 
    - css
draft: false
---
## 1 Line

```css
:root { color-scheme: light dark; }
```

Alternatively, you can use a `<meta>` property in your HTML markup.

```html
<meta name="color-scheme" content="dark light">
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme) / [Spec](https://drafts.csswg.org/css-color-adjust/#preferred)

## About

This is a property I love to use on simple pages where having a dark mode is desirable but I don't want to spend a lot of time styling. Sometimes (often) the browser default stylesheets will do!

Browsers these days come with default light and dark color schemes, but the default behavior (`color-scheme: normal`) is to always use the light color scheme. By indicating your site can also accommodate dark themes, the browser will switch to the appropriate built-in color scheme based on the user's preferences. You can also specify if you want only dark or only light.

This doesn't mean you can't further refine the color scheme of your site. You can still do all the `@media (prefers-color-scheme: dark) { ... }` styling you want, but instead of having to define every single style to override the default light theme, including buttons, form controls, highlight colors etc., you can refine off the default dark.

If the need arises, you can set the property on individual elements or sections of your site and even include the 'only' keyword to ensure that things like [Auto Dark Theme](https://developer.chrome.com/blog/auto-dark-theme/#per-element-opt-out) don't override the intended color scheme.

One line of CSS to get light and dark mode for free rocks...

## Disclaimer

...mostly. At the time of writing, Safari does not have suitably contrasting link colors in their default dark style sheet for some reason. Be sure to set those colors if you use this property.

[Useful demo site for viewing browsers default coloring for various elements](https://color-scheme-demo.glitch.me)