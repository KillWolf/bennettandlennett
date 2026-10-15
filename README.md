# Hemmeligheden på Fyns Hoved — dev log

A small [Eleventy](https://www.11ty.dev/) blog, hosted on [statichost.eu](https://www.statichost.eu/).

## Run it locally

```sh
npm install
npm start        # http://localhost:8080, reloads on save
```

## Write a post

Add a Markdown file to `src/posts/`. The file name becomes the URL (`my-post.md` → `/posts/my-post/`).

```md
---
title: Drawing Grillo & Muldvarpen
description: One line shown on the home page.
date: 2026-10-20
---

The post, in Markdown.
```

The newest post is featured on the home page; the rest are listed below it.

## Where things live

| What | Where |
| --- | --- |
| Site title, Erik's lines | `src/_data/site.json` |
| Home page | `src/index.njk` |
| AI page | `src/ai.njk` |
| Page and post layouts | `src/_includes/` |
| Styles | `src/assets/style.css` |
| Erik and Charon sprites (from the game) | `src/assets/erik/`, `src/assets/charon/` |
| Fonts (self-hosted, no Google) | `src/assets/fonts/` |

## Deploy

`statichost.yml` tells statichost.eu to run `npm ci && npm run build` and publish `_site/`. Pushing to `master` triggers a rebuild once the webhook is set up in the repo settings.
