---
title: This Portfolio Site
description: Minimal static site with sitemap, feeds, robots.txt, favicons, manifest, image optimization, and more.
techtags:
  - Eleventy
  - Luxon
  - Prism
  - HTML
  - CSS
  - Javascript
githubUrl: https://github.com/parkerdavis1/agave-portfolio
liveUrl: https://parkerdavis.dev/
featured: false
draft: true
v1: https://v1.parkerdavis.dev
---

## Links

{% include "components/project-links.njk" %}

I rebuilt this portfolio primarily to add a blog. I thought I'd use [Astro](astro.build) this time and was digging Chris Williams' [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus) theme – however, I did not love the workflow for customizing the [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin) plugin. I definitely could have worked around it but I decided to give Eleventy another go. I like Astro and would like to use it more but Eleventy for static sites just makes sense and helps me stay rooted in the fundamental web technologies. If I want to use the View Transitions API (which I do!) I'll have to add the code myself – sounds like a great learning experience!

## Starter and Plugins

After having built numerous Eleventy sites from scratch (and it really feels like "from scratch" with Eleventy, it doesn't even give you a config file out of the box), I felt comfortable taking some shortcuts and using code from the community.

I started with the [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog/tree/main) for some sensible defaults, with image optimization, navigation, css & js bundling, feeds, and syntax highlighting configured.

[markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor) and [eleventy-plugin-nesting-toc](https://www.npmjs.com/package/eleventy-plugin-nesting-toc) creates a Table of Contents for all posts.

[@11tyrocks/eleventy-plugin-emoji-readtime](https://www.npmjs.com/package/@11tyrocks/eleventy-plugin-emoji-readtime) adds an estimated read time.

[markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs) allows you to add arbitrary attributes to elements within markdown.

## Previous portfolio versions

[Version 1]({{v1}})
