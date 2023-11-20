---
title: eBird Compress - my first bookmarklet
description: I create my first bookmarklet to group eBird sightings by species
date: 2023-11-20
updatedOn: 2023-11-20
tags:
  - bookmarklet
  - javascript
  - esbuild
  - ebird
  - project
draft: true
---

## Intro

I only recently learned that [bookmarklets](https://thehistoryoftheweb.com/postscript/wait-whats-a-bookmarklet/) exist. A portmanteau of bookmark and applet, they are pieces of Javascript you can run from the address bar or be called from your bookmarks. The idea of running Javascript directly from the address bar sounds strange at first but has fun applications, literally.

Previously I built an alternative [Rare Bird Alert](https://parkerdavis.dev/projects/rba/) web application whose primary feature was grouping rare eBird sightings by species into expandable `<details>` elements by pulling data from the public eBird API. Creating the same feature for your eBird [Needs Alerts](https://ebird.org/alerts) is a lot trickier because it requires authentication and access to your personal eBird data. Instead of some convoluted login and CSV data upload system, how about we just modify the DOM on the actual eBird website to our liking and group sightings by species!

## Here it is

{% renderTemplate 'html' %}
<a href='javascript:(()=>{const i=document.querySelectorAll(".Observation"),a=i[0].parentNode;function r(n){return n.querySelector(".Observation-species .Heading-main").innerText}function u(n){let e=[];for(const s of n){const t=r(s);e.includes(t)||e.push(t)}return e}function p(n,e){for(const s of n){const t=document.createElement("details");t.setAttribute("data-species",s),t.setAttribute("style","margin-top: 0.5em");const o=document.createElement("summary");o.setAttribute("style","cursor: pointer; list-style:"),o.innerText=s,t.appendChild(o),e.appendChild(t)}}function d(n){for(let e of n){const s=r(e),t=document.querySelector(`[data-species="${s}"]`),o=e.previousElementSibling;t.appendChild(o),t.appendChild(e)}}function l(n){for(species of n){const e=document.querySelectorAll(`[data-species="${species}"] .Observation`).length.toString(),s=document.querySelector(`[data-species="${species}"] summary`);s.innerText=`${s.innerText} (${e})`}}const c=u(i);p(c,a),d(i),l(c)})();'>Bookmark this link!</a>
{% endrenderTemplate %}
or copy this code to your clipboard:

<!-- prettier-ignore-start -->
```js
javascript:(()=>{const i=document.querySelectorAll(".Observation");!i.length>0&&alert("No observations found on page!");const a=i[0].parentNode;function r(n){return n.querySelector(".Observation-species .Heading-main").innerText}function u(n){let e=[];for(const o of n){const t=r(o);e.includes(t)||e.push(t)}return e}function p(n,e){for(const o of n){const t=document.createElement("details");t.setAttribute("data-species",o),t.setAttribute("style","margin-top: 0.5em");const s=document.createElement("summary");s.setAttribute("style","cursor: pointer; list-style:"),s.innerText=o,t.appendChild(s),e.appendChild(t)}}function d(n){for(let e of n){const o=r(e),t=document.querySelector(`[data-species="${o}"]`),s=e.previousElementSibling;t.appendChild(s),t.appendChild(e)}}function l(n){for(species of n){const e=document.querySelectorAll(`[data-species="${species}"] .Observation`).length.toString(),o=document.querySelector(`[data-species="${species}"] summary`);o.innerText=`${o.innerText} (${e})`}}const c=u(i);p(c,a),d(i),l(c)})();
```
<!-- prettier-ignore-end -->

## How to use it

First you need to bookmark the link above.

For Firefox, this is trivially simple (right-click, "Bookmark link...")

For Safari, Chrome, Edge you first need to:

1. Create a random bookmark (this blog post for instance)
2. Open your bookmark manager
3. Edit the bookmark you just created, rename it to whatever you want, and paste the code above into the URL input
4. Save your new bookmark

Now when you go to any [eBird alert page](https://ebird.org/alert/summary?sid=SN36093&sortBy=obsDt&o=desc), while you are on the alert page, open the bookmark that you just created. Voila!

### Demo

{% animatedImage "./ebird-compress-demo.gif", "eBird compress demo" %}

## So, what is the code doing?

First, it stores all the DOM elements for observations in a variable. If no observations are found (like if the script is run on a non-eBird alert page) it shows an alert message and stops the execution of the script. The parent container DOM element is stored in another variable. It defines a function to extract the species name from an element, then a function to create an array of unique species names.

```js
const observations = document.querySelectorAll(".Observation");
if (!observations.length > 0) {
	alert("No eBird observations found on page!");
	return;
}
const parentContainer = observations[0].parentNode;

function getSpeciesName(observation) {
	return observation.querySelector(".Observation-species .Heading-main")
		.innerText;
}

function getUniqueSpeciesList(observations) {
	let uniqueSpecies = [];
	for (const observation of observations) {
		const commonName = getSpeciesName(observation);
		if (!uniqueSpecies.includes(commonName)) {
			uniqueSpecies.push(commonName);
		}
	}
	return uniqueSpecies;
}
```

It defines a function that will create new `<details>` DOM elements for each species, assign the species name to a data-species attribute and a `<summary>` element, then mount the new DOM elements where they need to go.

```js
function createUniqueSpeciesWrappers(uniqueSpeciesArray, containerNode) {
	for (const species of uniqueSpeciesArray) {
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

It then defines a function to move all of the observations into the new DOM elements we just created. It uses the `getSpeciesName()` function we created earlier to select each observation and place it into its respective `<detail>` node.

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

```js
function appendSpeciesObsCount(list) {
	for (species of list) {
		const observationCount = document
			.querySelectorAll(`[data-species="${species}"] .Observation`)
			.length.toString();
		const summaryNode = document.querySelector(
			`[data-species="${species}"] summary`
		);
		summaryNode.innerText = `${summaryNode.innerText} (${observationCount})`;
	}
}
```

All that is left to do is call all of the functions to action!

```js
// GO GO GO!
const uniqueSpeciesList = getUniqueSpeciesList(observations);
createUniqueSpeciesWrappers(uniqueSpeciesList, parentContainer);
moveObservationsIntoWrappers(observations);
appendSpeciesObsCount(uniqueSpeciesList);
```

I then run the above code through [esbuild's code minifier](https://esbuild.github.io/api/#minify), which basically removes whitespace and shortens variable names to keep all the same functionality in a more compressed format. This results in the code I shared before:

<!-- prettier-ignore-start -->
```js
javascript:(()=>{const i=document.querySelectorAll(".Observation");!i.length>0&&alert("No observations found on page!");const a=i[0].parentNode;function r(n){return n.querySelector(".Observation-species .Heading-main").innerText}function u(n){let e=[];for(const o of n){const t=r(o);e.includes(t)||e.push(t)}return e}function p(n,e){for(const o of n){const t=document.createElement("details");t.setAttribute("data-species",o),t.setAttribute("style","margin-top: 0.5em");const s=document.createElement("summary");s.setAttribute("style","cursor: pointer; list-style:"),s.innerText=o,t.appendChild(s),e.appendChild(t)}}function d(n){for(let e of n){const o=r(e),t=document.querySelector(`[data-species="${o}"]`),s=e.previousElementSibling;t.appendChild(s),t.appendChild(e)}}function l(n){for(species of n){const e=document.querySelectorAll(`[data-species="${species}"] .Observation`).length.toString(),o=document.querySelector(`[data-species="${species}"] summary`);o.innerText=`${o.innerText} (${e})`}}const c=u(i);p(c,a),d(i),l(c)})();
```
<!-- prettier-ignore-end -->

## Feedback
There you have it, my first bookmarklet. If you have any questions or run into any issues using it, [send me an email](mailto:hello@parkerdavis.dev). I'd be glad to help.
