---
title: Equestrian Volunteer Scheduler
description: Custom server-rendered full stack administrative web application with role-based access control for local non-profit.
techtags:
    - React
    - Remix
    - Typescript
    - SQLite
    - Prisma
    - CI/CD
    - TailwindCSS
    - Playwright
    - Zod
githubUrl: https://github.com/opportunity-hack/evs
---
## Links
{% include "components/project-links.njk" %}


## Screenshot
{% image "./EVS-light.png", "EVS screenshot" %}

## Overview
I collaborated closely with other developers to create an application that allows [The Barn](https://www.thebarnaz.com/) to schedule volunteers for their horse lessons and  therapy. It was done in collaboration with [Opportunity Hack](https://www.ohack.org/), a local organization that pairs developers with non-profits who need custom software to accomplish their goals.


## Contributions
My github pull requests for this project can be found [here](https://github.com/opportunity-hack/evs/pulls?q=is%3Apr+author%3Aparkerdavis1+).

### Summary

- UI/UX optimizations
- Updated forms with custom validation logic and corresponding database schemas
- Added feature to allow horse cooldown scheduling
    - Allows scheduling of rest time for horses
    - [Removes horse from events during cooldown period and alerts user of these changes](https://github.com/opportunity-hack/evs/pull/43)
    - [Prevents horse from being scheduled to new events during cooldown period](https://github.com/opportunity-hack/evs/pull/47)
- [Added feature to allow the creation of events on multiple dates](https://github.com/opportunity-hack/evs/pull/54)

## Recognition

My contributions and accomplishments were officially recognized by Opportunity Hack:

- Standups Completed
- Code Reliability
- Customer Driven Innovation and Design Thinking
- Iterations of Code Pushed to Production
- Requirements gathering
- Code Quality
- Unit Test Writing

{% image "./opportunity_hack_hearts.png", "Opportunity Hack hearts" %}