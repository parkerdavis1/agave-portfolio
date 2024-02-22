---
title: htmz - a low power tool for html
description: A cool javascript not-framework for loading HTML snippets without full page reloads
date: 2024-02-23
updatedOn:
tags:
    - html
    - javascript
draft: true
eleventyExcludeFromCollections: false
---

I came across [htmz](https://leanrada.com/htmz/) this week and think its a really fun and clever way to swap HTML fragments without full page reloads using a super minimal script (~166 bytes). Check out the [documentation/landing page](https://leanrada.com/htmz/) and enjoy all the little winks and nods Lean peppers in.

```html
<iframe
    hidden
    name="htmz"
    onload="setTimeout(()=>document.querySelector(contentWindow.location.hash||null)?.replaceWith(...contentDocument.body.childNodes))"
></iframe>
```

## What does this snippet do?

### \<iframes>

I haven't worked with iframes much since my pre-CSS high school band website days. I'm surprised they aren't used more in modern web dev honestly - they're fun.

You can set targets for anchor links. The target you see most often is `target="_blank"` which opens a link in a new window. If you have iframes on the page, you can target them by referencing their `name`. To use htmz you set the target for links to a hidden iframe named `htmz`.

If you include a [base](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base) element anywhere on your HTML page with a target of "htmz", this automatically adds the target to all links on the page.

```html
<base target="htmz" />
```

With the target set, clicking a link loads the content in the hidden iframe, which when it finishes loading, triggers a script.

## The onload script

Let's take a look at the expanded "hacker" version where the script and iframe are separated out:

```html
<script>
    function htmz(frame) {
        // Remove setTimeout to let the browser autoscroll content changes into view
        setTimeout(() =>
            document
                .querySelector(frame.contentWindow.location.hash || null)
                ?.replaceWith(...frame.contentDocument.body.children)
        );
    }
</script>

<iframe hidden name="htmz" onload="htmz(this)"></iframe>
```

First up, there's an optional setTimeout to add the function call to the queue of the [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop).

Then, it searches the `document` with a `querySelector`.

The query selector starts with `frame`, the parameter of the function, which when you pass in `this` as the argument on the iframe onload function call, refers to the itself, the iframe html element. This referential pointing around is omitted in the condensed all-in-one snippet.

[.contentWindow](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow) – returns the window object of the embedded iframe

[.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) – returns the URL of the window

[.hash](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash) – returns the string following a hash symbol (#), usually used to navigate to an ID on the page. In this case, it is being used as a CSS selector within the querySelector to grab the element on the page where you want the new content to be inserted.

The `|| null` is there to prevent an Uncaught DOM exception, in case the location loaded in the hidden iframe does not include a hash.

The question mark allows [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) where if the expression on the left side of the question mark evaluates to `null` or `undefined` it will short-circuit the overall expression and return `undefined` instead of throwing an error.

[.replaceWith()](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceWith) – replaces the HTML element with the nodes passed in as arguments.

Then `...frame.contentDocument.body.children` uses [rest parameter syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) (_not_ the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) , see below) to allow a function to accept an indefinite number of arguments as an array. In this case this is all of the children elements of the body within the iframe.

> From MDN: "Spread syntax looks exactly like rest syntax. In a way, spread syntax is the opposite of rest syntax. Spread syntax "expands" an array into its elements, while rest syntax collects multiple elements and "condenses" them into a single element. See [rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) and [rest property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#rest_property)."

So, in total, the onload function grabs the HTML element (with the ID from the hash found in the `a href`) and replaces it with all of the DOM nodes that load in the hidden iframe. As the htmz documentation puts it:

> htmz is essentially a **proxy target**.
>
> Like how a proxy server forwards requests to some specified server, proxy target htmz forwards responses into some specified target."

## Conclusion

Go check out [htmz](https://leanrada.com/htmz/) and the other examples. I think its a fun option for loading content within a page. 

<a href="./see/index.html#load-cow" target="htmz">See</a>
<a href="./what/index.html#load-cow" target="htmz">what</a>
<a href="./I/index.html#load-cow" target="htmz">I</a>
<a href="./mean/index.html#load-cow" target="htmz">mean</a>?

<div id="load-cow"></div>

<iframe hidden style="display:none" name=htmz onload="setTimeout(()=>document.querySelector(contentWindow.location.hash||null)?.replaceWith(...contentDocument.body.childNodes))"></iframe>
