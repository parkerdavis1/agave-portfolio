---
title: eBird Compress, my first bookmarklet
description: I create my first bookmarklet to group eBird sightings by species
date: 2023-11-20
tags:
  - bookmarklet
  - javascript
  - esbuild
  - ebird
  - project
draft: false
---

## Introduction

I only recently learned that [bookmarklets](https://thehistoryoftheweb.com/postscript/wait-whats-a-bookmarklet/) exist. A portmanteau of bookmark and applet, they are pieces of Javascript you can run from the address bar or be called from your bookmarks. The idea of running Javascript directly from the address bar sounds strange at first but has fun applications, literally.

I previously built an alternative [Rare Bird Alert!](https://parkerdavis.dev/projects/rba/) web application whose primary feature was grouping rare eBird sightings by species into expandable `<details>` elements by pulling data from the public eBird API. Creating the same feature for your eBird [Needs Alerts](https://ebird.org/alerts) is a little trickier because it requires authentication and access to your personal eBird data. Instead of some convoluted login and CSV data upload system, how about we just modify the DOM on the actual eBird website to  group sightings by species?

## Here it is

<!-- prettier-ignore-start -->
```js
javascript:{{ebirdBookmarklet | safe}}
```
<!-- prettier-ignore-end -->

## How to use it

1. Create a random bookmark (this blog post for instance)
2. Open your bookmark manager
3. Edit the bookmark you just created, rename it to whatever you want (maybe "eBird Compress"), and replace the URL with the code above
4. Save your new bookmark

Now when you go to any [eBird alert page](https://ebird.org/alert/summary?sid=SN36093&sortBy=obsDt&o=desc) you can open the bookmark that you just created and voila! 

### Demo

{% animatedImage "./ebird-compress-demo.gif", "eBird compress demo" %}

It works on both desktop and mobile. Consult your browser's documentation if you're not sure how to edit and save bookmarks.

## So, what is the code doing?

[Here](https://github.com/parkerdavis1/eBird-compress-bookmarklet/blob/main/script.js) is the full non-minified script for your perusal. If you are curious how it works, here is a beat by beat breakdown:

First, we store a NodeList of all the DOM elements for observations in a variable called `observations`. If no observations are found (like if the script is run on a non-eBird alert page) it shows an alert message and stops the execution of the script. If the script has already been run on a page, it will alert you about that as well.

<!-- prettier-ignore-start -->
```js
const observations = document.querySelectorAll(".Observation");
if (observations.length === 0) {
	alert("No eBird observations found on page!");
	return;
}
if (document.querySelector("[data-species]")) {
	alert("Already run script. If you are having issues, reload page and try again.");
	return;
}
```
<!-- prettier-ignore-end -->

The parent container of the observations is stored in another variable. We define a function to extract the species name from an element, then a function to create a set of unique species names. Sets can only store unique values so no need to check for duplicate species names.

```js
const parentContainer = observations[0].parentNode;

function getSpeciesName(observation) {
	return observation.querySelector(".Observation-species .Heading-main")
		.innerText;
}

function getUniqueSpeciesList(observations) {
	let uniqueSpecies = new Set();
	for (const observation of observations) {
		uniqueSpecies.add(getSpeciesName(observation));
	}
	return uniqueSpecies;
}
```

We define a function that will create new `<details>` DOM elements for each species, assign the species name to a data-species attribute and a `<summary>` element, then mount the new DOM elements where they need to go.

```js
function createUniqueSpeciesWrappers(uniqueSpeciesSet, containerNode) {
	for (const species of uniqueSpeciesSet) {
		// Create wrapper node
		const detailsNode = document.createElement("details");
		// Add data-species attribute
		detailsNode.setAttribute("data-species", species);
		// Add spacing styles
		detailsNode.setAttribute("style", "margin-top: 0.5em;");
		// Create summary node
		const summaryNode = document.createElement("summary");
		// Style to visually indicate clickability
		summaryNode.setAttribute("style", "cursor: pointer;");
		// Insert species name into summary element
		summaryNode.innerText = species;
		// Add summary element to details
		detailsNode.appendChild(summaryNode);
		// Add details element to container
		containerNode.appendChild(detailsNode);
	}
}
```

We then define a function to move all of the observations into the new DOM elements we just created.

```js
function moveObservationsIntoWrappers(observations) {
	for (let observation of observations) {
		const commonName = getSpeciesName(observation);
		const detailNode = document.querySelector(`[data-species="${commonName}"]`);
		// Also, grab the spacer node just before each observation
		const spacerNode = observation.previousElementSibling;
		detailNode.appendChild(spacerNode);
		detailNode.appendChild(observation);
	}
}
```

The spacer nodes are also grabbed and moved because otherwise you end up with a mess of gray bars at the top:

{% image "./spacers.png", "Spacer nodes shown jumbled at the top of the list", "small-image" %}

Next, we get the number of observations for each species and append that number to the name of each species.

<!-- prettier-ignore-start -->
```js
function appendSpeciesObsCount(list) {
	for (species of list) {
		const observationCount = document
			.querySelectorAll(`[data-species="${species}"] .Observation`)
			.length.toString();
		const summaryNode = document.querySelector(`[data-species="${species}"] summary`);
		summaryNode.innerText = `${summaryNode.innerText} (${observationCount})`;
	}
}
```
<!-- prettier-ignore-end -->

All that is left to do is call all of the functions to action!

```js
// GO GO GO!
const uniqueSpeciesList = getUniqueSpeciesList(observations);
createUniqueSpeciesWrappers(uniqueSpeciesList, parentContainer);
moveObservationsIntoWrappers(observations);
appendSpeciesObsCount(uniqueSpeciesList);
```

We then run the above code through [esbuild's code minifier](https://esbuild.github.io/api/#minify), which basically removes whitespace and shortens variable names to keep all the same functionality in a more compressed format. The result is terse code ready for a bookmark:

<!-- prettier-ignore-start -->
```js
javascript: {{ebirdBookmarklet | safe}}
```
<!-- prettier-ignore-end -->

## Feedback

There you have it, my first bookmarklet. [Let me know](mailto:hello@parkerdavis.dev) how it works for you.
