---
title: Update dependencies with npm-check-updates
description: Micropost to help me remember the ncu command.
date: 2024-02-22
updatedOn: 
tags:
  - npm
  - javascript
  - ncu
draft: false
eleventyExcludeFromCollections: false
---
## Installation and use

Install npm-check-updates globally (add a sudo if needed)
```shell
npm install -g npm-check-updates
```

View updates available for project in current directory
```shell
ncu
```

Interactive mode
```shell
ncu -i
```

Select the dependencies you want to update with <kbd>spacebar</kbd>

{% image "./ncu.png", "NCU terminal screenshot of output" %}

Press <kbd>return</kbd> to update the package.json. It will ask if you want to install the updates.

## Strategy
When updating a project, it is generally a good idea to progressively update dependencies. Things can break and it is much easier to sort through smaller chunks of changes. 
### Semantic Versioning (major.minor.patch)

You can usually safely update patch updates without too much trouble. I often install the minor updates together then test the project to make sure nothing broke. For major updates, I install them one by one after reading the change logs for each package then test.
## Links

[npm-check-updates documentation](https://github.com/raineorshine/npm-check-updates)

[Free Code Camp Article](https://www.freecodecamp.org/news/how-to-update-npm-dependencies/)