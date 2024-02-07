---
title: Sort an array alphabetically while ignoring case
description: .sort() won't do it for you
date: 
updatedOn: 
tags: 
draft: true
eleventyExcludeFromCollections: true
---
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#options

```node
const array = ['goose', 'Goose', 'GOOSE', 'g00se', 'Goos3', 'animal', 'bear'];
const sorted = array.sort();
console.log(sorted);

// output
[ "GOOSE", "Goos3", "Goose", "animal", "bear", "g00se", "goose" ]
```

```js
const alternateSort = array.sort(new Intl.Collator('en').compare)

// output
[ "animal", "bear", "g00se", "Goos3", "goose", "Goose", "GOOSE" ]
```