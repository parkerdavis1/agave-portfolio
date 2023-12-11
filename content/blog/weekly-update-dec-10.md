---
title: "[Weekly Update] RainCrow, EVS, CCAM, SVGs"
description: "Weekly roundup of what I've been working on this week: bug fixes, optimizations, new features, rebuilds, and Christmas trees."
date: 2023-12-10
updatedOn: 
tags:
  - weekly-update
  - updates
  - dayjs
  - error-handling
  - timezones
  - new-feature
  - consulting
  - RainCrow
  - EVS
  - CCAM
draft: false
eleventyExcludeFromCollections: false
---
## RainCrow

### Error Handling

RainCrow has seen an uptick in use lately, with several days in a row exceeding the 1000 free OpenWeather API requests. This helped me focus on improving the error handling, making sure to show users an appropriate error when OpenWeather runs out of requests for the day. 

### Timezone efficiency

With fresh eyes, I was able to fix an old problem and cut down on OpenWeather API calls by **over 33%**! When RainCrow was fully client-side, I was unable to use node.js libraries like [node-geo-tz](https://github.com/evansiroky/node-geo-tz) that can return timezone names from GPS coordinates because that would involve sending the entirety of worldwide timezone data to the browser for every use. Since OpenWeather returns timezone offset data with their requests, I initially settled on making an additional preliminary OpenWeather request to get the timezone data before making the actual weather requests.

However, since moving to Sveltekit and therefore having servers (or more specifically, serverless functions) at my disposal, `node-geo-tz` was now on the table. After a bit more head-scratching on how to convert a named timezone to a UTC offset ([they are not equivalent!](https://stackoverflow.com/tags/timezone/info)) I was able to eliminate the extra OpenWeather API timezone call. This will cut down requests by 33-50%, which rocks.

I used Day.js to append the timezone name returned from node-geo-tz to all datetimes, which then uses the native Internationalization API to calculate the offset and give you the proper unix time.

```js
dayjs(date).tz(timezone, true).unix()
```
[https://day.js.org/docs/en/timezone/converting-to-zone](https://day.js.org/docs/en/timezone/converting-to-zone)

I've learned it over and over: datetimes are surprisingly tricky to work with! I initially didn't include the optional `true` parameter to the `tz` method, which when left off doesn't just edit the timezone but converts the time as well. As I was testing data locally, there was no problem because the calculations were happening on a computer in Phoenix with data from Phoenix so the conversion had no effect. Once in production though, times got wonky. Thankfully I caught and fixed that quickly.

## Equestrian Volunteer Scheduler

I got busy on a new email feature for the [EVS](/projects/evs) application. It basically allows admins to send custom emails to select groups with defined roles within the application. It uses Resend to send the emails, React Email for email formatting, and as Zod and conform for validation and error handling. Pull Requests: [61](https://github.com/opportunity-hack/evs/pull/61), [62](https://github.com/opportunity-hack/evs/pull/62), [63](https://github.com/opportunity-hack/evs/pull/63).

There are some more error cases to account for but a good start on a 'Must have' feature before we can put the application into production.

## CCAM website rebuild

I also got started with a website rebuild I'm consulting on. I'm working off an awesome design from [Ioan Butiu](https://www.ioan.website/) and thinking carefully about how best to structure the data, content, and components for maximum code legibility and ease of editing down the road. CCAM website maintainers will be tech-saavy so using markdown and other simple data structures for editing content is preferable but bringing in a CMS like Sanity might be on the table as well.

## Advent of SVG

I came across a fun Christmas-y [SVG tutorial](https://svg-tutorial.com/) (which for some reason is not called Advent of SVG). I've used SVGs plenty but never considered manually writing the code or understanding much of its contents beyond a few choice attributes. Learning fundamentals like this makes me unreasonably happy.

And now, I leave you with a cheery SVG tree:

<svg width="200" height="400" viewBox="-100 -200 200 400" style="margin: auto;">
  <polygon points="0,0 80,120 -80,120" fill="#234236" />
  <polygon points="0,-40 60,60 -60,60" fill="#0C5C4C" />
  <polygon points="0,-80 40,0 -40,0" fill="#38755B" />
  <rect x="-20" y="120"width="40" height="30" fill="brown" />
</svg>
