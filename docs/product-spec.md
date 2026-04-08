# AISaidThat Product Spec

## Overview

AISaidThat is a community-driven archive of AI catchphrases, recurring expressions, and classic filler language used by models such as ChatGPT, Claude, and Gemini.

These phrases tend to share a few traits:

- They sound polished or authoritative.
- They are often vague in practice.
- They get repeated across many conversations.
- Over time, they become recognizable as part of an "AI way of speaking."

The goal of AISaidThat is simple:

Document how AI actually talks and make those familiar patterns visible to everyone.

## Core idea

As large language models become more common, they stop feeling like neutral tools and start developing recognizable habits:

- Phrase patterns
- Style bias
- Overused wording

AISaidThat turns those habits into a structured archive so users can see something important:

AI is not infinitely original. It has verbal tics too.

## Positioning

AISaidThat is not:

- A translation tool
- An AI tutorial site
- Technical documentation

AISaidThat is:

- An AI language culture archive

Comparable references:

- Urban Dictionary for slang
- Know Your Meme for internet culture

The difference is that the subject here is AI model language.

## Core features

### 1. Phrase browsing

The main experience is browsing phrases AI models keep using.

Examples:

- `this can be further optimized`
- `a nuanced perspective`
- `enhance robustness`

Browsing supports:

- Trending
- Latest
- Model filters

### 2. Model-based archives

Each model gets its own voice profile and phrase archive.

Example model views:

- ChatGPT
  - `just use the existing SDK`
  - `this can be further optimized`
  - `let's break this down step by step`
- Claude
  - `a nuanced perspective`
  - `there are trade-offs to consider`
  - `Is there a reason this is on your mind?`
- Gemini
  - `enhance robustness`
  - `scalable design`
  - `I found this YouTube video that could help.`

This makes model differences legible instead of abstract.

### 3. Phrase detail pages

Each phrase entry should stay lightweight, readable, and shareable.

An entry can include:

- Phrase
- Model
- Meaning
- Vibe
- Example
- Comments or community notes
- Related source links

The point is not to write essays. The point is to make the pattern instantly recognizable.

### 4. Community contribution via GitHub PR

AISaidThat is designed as an open contribution system.

Users can:

- Submit new phrases through GitHub
- Use a standard JSON or Markdown structure
- Let maintainers review the submission in public
- Publish new content automatically after merge

This makes the archive:

- Open
- Traceable
- Friendly to technical communities

### 5. Rankings and tags

The archive can support ranked views such as:

- Most Overused
- Funniest
- Most AI-like

And lightweight tags such as:

- `engineering`
- `product`
- `vague`
- `overused`

## Target users

### Core users

- Heavy AI users
- Developers
- Product managers
- Designers
- People who use ChatGPT, Claude, or Gemini regularly
- People who instantly recognize repetitive AI phrasing

### Secondary users

- AI beginners
- Content creators
- Meme and internet culture communities

## Use cases

### 1. Recognition and entertainment

A user sees a phrase like `this can be further optimized` and immediately thinks:

"Yes, this is exactly how AI always says it."

### 2. Social sharing

The format is built for screenshots and reposts across places like:

- X
- Reddit
- Xiaohongshu

### 3. Model comparison

Users can compare tendencies such as:

- ChatGPT leaning toward practical or engineering language
- Claude leaning toward nuance and reflection
- Gemini leaning toward product, workflow, or upbeat assistance language

## Why it works

- High-recognition content: almost every AI user has seen these phrases before.
- Strong meme value: entries are easy to screenshot and share.
- Community-driven source material: the archive reflects actual usage, not invented editorial filler.
- Sustainable growth: as models evolve, new phrases and new habits appear.

## Content update loop

- The GitHub repository is the source of truth.
- Pull requests are reviewed.
- CI validates content.
- Approved changes are deployed automatically.

## Frontend direction

- Minimal UI
- Card and list-based browsing
- Readability first
- Shareability first

## Slogans

- `AI really said that.`
- `A collection of phrases AI can't stop saying.`
- `The way AI actually talks.`

## Long-term vision

AISaidThat is not only a meme site. It can become a public archive of how AI language evolves.

Possible extensions:

- AI style analysis tools
- Model persona comparison
- Prompt output quality evaluation
- AI language trend tracking

## One-line summary

AISaidThat is a community archive of AI catchphrases and repeated model language, built to show the patterns, habits, and style bias behind the way AI actually talks.
