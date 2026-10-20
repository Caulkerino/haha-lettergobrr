# Project Context

## Purpose
Forbidden Magic is a tiny, single-page interactive story. The visitor unlocks a
rattling chest with a passcode, meets the cat inside, pets it, and opens the
letter it drops to read a scrolling handwritten note (watched by two peeking
cats, one swatting at butterflies), then can go back to the cat and re-read it. It has a pixel-art 8-bit look.

## Tech Stack
- Plain `index.html`, `style.css`, `script.js` (no framework, no build step, no dependencies)
- CSS keyframes with smooth eased timing (`ease-in-out`, `cubic-bezier`) for the animations
- Assets in `assets/images/` (our own pixel-art SVGs made of 1×1 `<rect>`s: chest (locked/open), key, envelopes (closed/open), cat, happy cat, hand, heart, the peeking tuxedo and white cats with blink frames (`cat-tuxedo-peek(-blink).svg`, `cat-white-peek(-blink).svg`), the white cat's four paw poses (`cat-white-paw-{rest,wind,up,bat}.svg`), and orange and blue butterflies with wing-flap frames (`butterfly(-flap).svg`, `butterfly-blue(-flap).svg`)) and `assets/fonts/`
- Run it by opening `index.html` directly or with any static server

## Project Conventions

### Code Style
- Keep it simple: one page, three files, no abstractions beyond what is needed
- One `state` string plus a `show(scene)` function in `script.js`
- Each scene is a `<section class="scene" id="scene-...">`, toggled with `.active`
- Plain `addEventListener` handlers; clickable things are `<button>`s
- Sprites use `image-rendering: pixelated`
- Asset names are lowercase and hyphenated (e.g. `envelope-open.svg`)

### Testing Strategy
- Manual check in a desktop and a mobile browser, including keyboard-only use
  and `prefers-reduced-motion`
- Optional headless-browser runs (Chrome DevTools Protocol) that click through the
  flow and take screenshots; nothing is installed in the project
