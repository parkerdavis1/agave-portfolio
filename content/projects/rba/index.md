---
title: Rare Bird Alert!
description: Full stack web app extending the features and styles of the eBird Rare Bird Alert.
techtags:
  - Svelte/Sveltekit
  - TailwindCSS
  - HTML
  - CSS
  - Javascript
tags:
  - svelte/sveltekit
  - tailwindcss
  - html
  - css
  - javascript
githubUrl: https://github.com/parkerdavis1/eBirdRareBird
liveUrl: https://rarebird.parkerdavis.dev/US-AZ-013?days=7
featured: true
date: 2023-11-16
---

## Links

{% include "components/project-links.njk" %}

## Screenshot

{% image "./rba-dark3.png", "Screenshot of Rare Bird Alert!" %}

## Overview

I created this full stack multi-page app using Sveltekit and TailwindCSS. It uses eBird's own RESTful API to gather and summarize large amounts of data with sorting and grouping by species and location, greatly reducing window scroll height when compared to eBird original design. It is progressively enhanced with essential data being loaded with no client-side javascript required.

For the design, I incorporated some of the more modern design elements found in other parts of eBird such as boldly colored title and filter bars, filter tags, as well as incorporating fades and slide-in animations for details and filter modals.
