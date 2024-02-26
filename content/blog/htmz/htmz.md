---
title: htmz - a low power tool for html
description: A cool javascript not-framework for loading HTML snippets without full page reloads
date: 2024-02-23
updatedOn: 
tags:
  - html
  - javascript
  - htmz
draft: false
eleventyExcludeFromCollections: false
---

I came across **`htmz`** this week and after a few chuckles reading through the landing page I was excited to try it out. Its a really fun and clever way to swap HTML fragments without full page reloads using a super minimal script (~166 bytes).

This is essentially all there is to it:

```html
<iframe hidden name="htmz" onload="setTimeout(()=>document.querySelector(contentWindow.location.hash||null)?.replaceWith(...contentDocument.body.childNodes))"
></iframe>
```

The [htmz website](https://leanrada.com/htmz/) gives a good and engaging overview so I direct your attention there first. The purpose of *this* post is to go through what each piece of the snippet does and explain to myself, in more detail than necessary, exactly how it works. 
## What does this snippet do?


<p>I haven't done much with iframes since working on my high school band's website in the early 2000s so I had to remind myself a bit about how they work. I'm surprised they aren't used more in modern web development honestly - <a href="https://superlative-pasca-66882e.netlify.app/" target="fun-frame" onclick="document.getElementById('fun-frame').style.display='inline';document.getElementById('hide-fun').style.display='inline'">they're fun</a>.</p>

<iframe name="fun-frame" id="fun-frame" width="100%" style="display:none; height: 15rem"></iframe>

<a href="#hide-fun" id="hide-fun" style="display:none" onclick="document.getElementById('fun-frame').style.display='none';this.style.display='none'">Hide</a>

You can set targets for anchor links. The target you see most often is `target="_blank"` which opens a link in a new window. If you have iframes on the page, you can target them by referencing their `name`. To use htmz you set the target for links to a hidden iframe named `htmz`.

Optionally, if you include a [base](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base) element anywhere in your HTML document with a target of "htmz", this automatically adds the target to all links on the page.

```html
<base target="htmz" />
```

With the target set, clicking a link loads the content in the hidden iframe, which when it finishes loading, triggers a script.

## The onload script

Let's take a look at the expanded "hacker" version where the script and iframe are separated out:

```html
<script>
    function htmz(frame) {
        setTimeout(() =>
            document
                .querySelector(frame.contentWindow.location.hash || null)
                ?.replaceWith(...frame.contentDocument.body.children)
        );
    }
</script>

<iframe hidden name="htmz" onload="htmz(this)"></iframe>
```

First up, there's an optional setTimeout to add the function call to the end of the queue in the [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop).

Then, it searches the `document` with a `querySelector`.

The query selector starts with `frame`, the parameter of the function. When you pass in `this` as the argument on the iframe onload function call, it refers to itself, the iframe html element. (This self-referential pointing around is omitted in the condensed all-in-one snippet.)

[.contentWindow](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow) – returns the window object of the embedded iframe

[.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) – returns the URL of the window

[.hash](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash) – returns the hash (#) and the string that follows (if present – otherwise it returns an empty string). In the URL context, hashes are usually used to navigate to an ID on the page. In this case it is being used as a CSS selector within the querySelector to grab the element on the page where you want the new content to be inserted.

The `|| null` is there to prevent an uncaught DOM exception from the querySelector, in case the location loaded in the hidden iframe does not include a hash.

Similarly, the question mark allows [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) where if the expression on the left side of the question mark evaluates to `null` or `undefined` it will short-circuit the overall expression and return `undefined` instead of throwing an error.

[.replaceWith()](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceWith) – replaces the selected HTML element with the nodes passed in as arguments.

`...frame.contentDocument.body.children` uses [rest parameter syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)  to allow the `replaceWith()` function to accept an indefinite number of arguments as an array – which in this case is all of the children elements of the body loaded within the hidden iframe.

> From MDN: "Spread syntax looks exactly like rest syntax. In a way, spread syntax is the opposite of rest syntax. Spread syntax "expands" an array into its elements, while rest syntax collects multiple elements and "condenses" them into a single element. See [rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) and [rest property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#rest_property)."

So, the content is loaded in the hidden iframe then copied wherever you specify.  As the htmz documentation puts it:

> htmz is essentially a **proxy target**.
>
> Like how a proxy server forwards requests to some specified server, proxy target htmz forwards responses into some specified target."

Go check out the examples on [htmz](https://leanrada.com/htmz/). There are some complex UIs that can be created with _very_ little client-side javascript. I probably wouldn't reach for this if my needs were *too* complex but it's a cool technique for loading simple interactive content within a page.

<a href="./see/index.html#load-cow" target="htmz">See</a>
<a href="./what/index.html#load-cow" target="htmz">what</a>
<a href="./I/index.html#load-cow" target="htmz">I</a>
<a href="./mean/index.html#load-cow" target="htmz">mean</a>?

<div id="load-cow"></div>

<!-- My next post will be about using this technique in a real world scenario – selectively loading an image gallery. _Spoiler: there were some unexpected complexities!_ -->

<iframe hidden style="display:none" name=htmz onload="setTimeout(()=>document.querySelector(contentWindow.location.hash||null)?.replaceWith(...contentDocument.body.childNodes))"></iframe>
