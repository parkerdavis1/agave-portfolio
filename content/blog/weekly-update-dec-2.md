---
title: "[Weekly Update] Plausible, droplet, prep, posts"
description: Updates for December 2nd, 2023
date: 2023-12-02
updatedOn:
tags:
  - plausible
  - droplet
  - web-audio
  - updates
  - weekly-update
  - freelancing
  - linux
  - ssh
  - vps
  - nginx
  - docker
  - ssl
  - swap
  - bug-fixes
  - christmas
draft: false
eleventyExcludeFromCollections: false
---

Welcome to the inaugural weekly update, which in this case will cover the last few weeks.

## Last week+

I got this blog up and running, wrote four posts, did some birding, enjoyed the weather, and had Thanksgiving with my family.

- [My plans for this blog](/blog/blog-plans/)

- [eBird Compress, my first bookmarklet](/blog/ebird-bookmarklet/)

- [Responsive dark/light mode with 1 line of CSS](/blog/one-line-light-dark-mode/)

- [I added a scrolling turkey to my links page and you can too](/blog/scrolling-turkey/)

## This week

### Droplet and Plausible Analytics

I spun up my own Digital Ocean droplet, a virtual private server (VPS). Unlike a lot of modern cloud hosting providers, you have to get your hands dirty and do all the server configuration yourself. They take care of the hardware, you take care of the software. I've already gotten a lot of hands-on experience with Docker, nginx, and Linux in general.

On this droplet I've set up an instance of Plausible Analytics, an open source privacy-focused analytics tool, and configured it for all of my sites. Using this [well written tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-plausible-analytics-on-ubuntu-22-04) as my guide, I installed Plausible on the VPS then used their Docker Compose file to spin up the Docker containers to get it running, including the Plausible application, a PostgreSQL database, and a Clickhouse database. I installed and configured nginx as the public-facing reverse proxy and installed Certbot to automate SSL encryption and certification.

On day 2, I had some connectivity issues with the droplet. I learned how to monitor a remote linux machine using the [uptime and top](https://www.digitalocean.com/community/tutorials/how-to-monitor-cpu-use-on-digitalocean-droplets) commands. I could see the CPU and RAM were getting overloaded. I'm not exactly sure what the hang up was but after restarting the droplet, I set up some [swap space](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04) on the server to help prevent future memory issues. My VPS has 1GB of RAM so when it gets overloaded, the dedicated swap file on the SSD can temporarily store data that can no longer be held in RAM. So far so good!

Another useful command to monitor logs is the `tail` command, which displays the end of a file, and the `-f` flag continuously reads the file as it changes until you stop it:

```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/plausible.access.log
tail -f /var/log/nginx/plausible.error.log
```

### LinkedIn

I updated [my LinkedIn](https://www.linkedin.com/in/parkerdavisaz/) to include more of my work background. I initially left out the bulk of my field biology work to emphasize my software engineering experience. Unfortunately that left a lot to the imagination as far as how much work experience I actually have. I didn't go all the way back to teaching guitar lessons and slinging coffee but I think it better represents my varied experiential intelligence and what strengths I bring to the table. Speaking of...**hey, do you know of any SE jobs? Get in touch!**

### Freelancing preparation

I took care of some preliminary planning for a website rebuild for the [Center for Concrete + Abstract Machines](https://abstractconcrete.center/) that I'm consulting on. In the same vein, I gathered some final requirements to get the [Equestrian Volunteer Scheduler](/projects/evs/) project into production and help get people volunteering with those horses.

### RainCrow 🪲

I took care of a bug in [RainCrow](https://raincrow.netlify.app) where users wouldn't be able to view their last weather request of the day. On the final weather request, the data was gathered and processed, the `dailyCount` incremented, but instead of displaying the data, there was the error message indicating that they had reached their limit – which is true, but less important than the just-gathered weather data available to be displayed. That is fixed now. It just took a little bit of [conditional finessing and light refactoring](https://github.com/parkerdavis1/raincrow-sveltekit/commit/bf120b8ed09d783aadb0288eda567cf6965cbb90) in the `ResultsPane.svelte` component.

### Writing

I wrote a [follow up to my Scrolling Turkey post](/blog/scrolling-turkey-part-ii/), explaining how I used the Web Audio API to add more delightful interactivity to my festive links page.

### Links Page

Speaking of my [links page](https://links.parkerdavis.dev), the gobbling turkey is resting for the year and the Christmas light bokehs are back. 'Tis the season! 🎄
