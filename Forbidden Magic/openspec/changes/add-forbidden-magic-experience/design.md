## Context
A tiny, one-off interactive page. The `index.html`, `style.css` and `script.js` files
already exist and are empty. The user asked us not to overcomplicate it or how the
code is structured, so the design stays minimal.

## Goals / Non-Goals
- Goals
  - Make the storyboard flow work end to end: chest → passcode → key → cat → letter → note, and back from the note to the letter
  - Give it a pixel-art 8-bit look with smooth animation that works with mouse, touch and keyboard
  - Need no build step: open `index.html` and it runs
- Non-Goals
  - No framework, bundler, package manager or dependencies
  - No back end, saved progress, sound or analytics
  - No real security: the passcode is just a puzzle

## Decisions
- **Three files only**: plain HTML, CSS and JS.
- **Scenes**: each scene is a `<section class="scene" id="scene-...">`, in the order
  `chest` → (passcode modal overlay) → `key` → `cat` → `letter` → `note` (the key and letter steps happen inside the chest and cat sections).
  `state` runs `chest → passcode → key → cat → letter → opening → note`; leaving the
  note (`closeNote()`) sets it back to `letter`, so the cycle is letter → opening → note → letter.
- **State**: one `state` string plus `show(scene)`, which moves the `.active` class and makes every other
  scene `inert` (so a scene still fading out leaves the Tab order; callers focus the new scene after `show()`).
  No router and no state library.
- **Passcode**: `const PASSCODE = "1234"` at the top of `script.js`. A wrong code shakes the input and clears it.
- **Chest sprite**: two 32×32 SVG frames, `chest-locked.svg` and `chest-open.svg`
  (same body), shown as the `.chest-sprite` background; `.open` swaps the image.
  The open frame is preloaded so the swap doesn't flash.
- **Key**: `key.svg` is inlined in `index.html` as flat `<rect>` pixels. It drops into
  the keyhole, turns in place (flip around its shaft), then disintegrates pixel by pixel (tip
  first) with a few gold sparks; `script.js` sets per-pixel CSS variables. The key sits above
  the chest (`z-index` 3 vs 2) while it crumbles.
- **Pop-out**: `.pop-cat` is placed at its landing spot in front of the chest's lower right
  corner; the `pop-out` keyframes start it inside the chest and arc it over the front. Its
  `z-index` steps from 3 (above the chest, 2, but under `.chest-front`, 4: the open chest's
  front panel redrawn on top) to 5 at the apex, so it climbs out of the treasure and lands in front.
- **Animation**: CSS keyframes with smooth easing (`ease-in-out`, `cubic-bezier`)
  and `image-rendering: pixelated`.
  JS only adds or removes classes and listens for `animationend`.
- **Letter**: worn-out `envelope-closed.svg` / `envelope-open.svg` (same 32×32 box and body, so
  the swap doesn't jump). The shadow is a blurred dark ellipse in CSS under the body that
  grows as the envelope lands.
- **Note**: worn-out paper (grain, creases, stains, browned edges) drawn with CSS gradients.
  `#scene-note` holds the shared layout variables: `--paper-top`, `--paper-side`,
  `--paper-bottom` (the `.note-wrap` insets: 8cqh / 17cqw / 8cqh; phones under 500px
  5cqh / 13cqw / 9.5cqh, plus smaller `.note` padding, so the scroll area grows from about
  180px to 208px at 390×844), `--px` (one sprite pixel: .5cqw, phones .4cqw) and
  `--flutter-cycle` (6s). The cats and butterflies use them, so they stay in place and in sync on every size.
  The paper's right padding (6.5%, phones 5.5%) keeps the scrollbar clear of the white cat's forearm.
- **Portrait phones**: under 500px wide in portrait, `.stage:has(#scene-note.active)` switches the stage from 4:3
  to 3:5 (capped at 96vh), with `transition: aspect-ratio .5s` so it eases with the scenes' cross-fade (the
  outgoing scene stretches a little as it fades; nothing jumps). The paper then shows about 25 lines instead of 6
  at 390×844; `--paper-bottom` drops to 6.5cqh and the "scroll" cue sits at `bottom: 3.5%`, above the torn edge.
  Other scenes keep 4:3. The cats, butterflies and paw sync are all in cqw/cqh and the shared variables, so they follow.
- **Scrollable letter**: `article.note` is the fixed torn-edge frame (flex column);
  the message lives in `div.note-scroll#note-scroll` (`tabindex="0"`, `overflow-y: auto`,
  `overscroll-behavior: contain`). `updateNoteHints()` runs on scroll, on resize
  (`ResizeObserver`) and when the fonts have loaded. It toggles `.more-above` / `.more-below`,
  which animate the `--fade-top` / `--fade-bottom` mask (registered with `@property`; a second mask
  layer keeps the scrollbar strip unfaded), and `.show-cue` on the note for the "scroll" cue
  (shown until the first scroll). `resetNote()` returns to the top and re-arms the cue.
  The scrollbar is a hard-edged ink thumb on a faint groove (`::-webkit-scrollbar`, with
  `scrollbar-color` as the fallback). A `pressedOnPaper` flag set on `pointerdown` stops a
  press that started on the paper (scrollbar drag, text selection) from counting as a click outside.
- **Opening and closing the note**: `openNote()` is the only way in, for the first read and
  every re-read. It shows the scene, calls `resetNote()` and `startBlinking()`, and focuses
  `#note-scroll` (not the letter, so Enter/Space can't trigger anything behind the note and
  the keys scroll the text). `closeNote()` calls `stopBlinking()` before going back to the cat.
- **Peeking cats**: two sprites built from the orange tabby's own head, recoloured (tuxedo 26×24 with the paper edge at cols 21|22; white 27×24 with the edge at cols 4|5) (`.peek-cat.peek-tuxedo` on the left edge, `.peek-white` on the
  right), children of `.note-wrap` so they unfold with the paper. Each stacks an open and a
  shut-eye `<img>`; `.blink` swaps them with opacity (no reflow). `blinkLater()` gives each cat
  its own random `setTimeout` chain (2.5–5s, with a 20% chance of a quick second blink).
  `startBlinking()` / `stopBlinking()` start and clear the chains. The cats slide out from under the paper
  (`z-index` -1 for the first half of `peek-from-left/right`, then 1 so their paws sit on its edge).
  They start fully behind the paper (`translateX(100%)` / `translateX(-140%)`), so no ear or paw shows during
  their delays. They are `aria-hidden`, `pointer-events: none` and `user-select: none` (so are the butterflies, hint and cue).
- **Butterflies and the swat**: three `.butterfly` sprites (`.bf-1` orange, `.bf-2` blue, `.bf-3` small
  orange) are children of `#scene-note`, placed with `translate()` to absolute stage points
  (cqw/cqh). Their wings beat by swapping two stacked frames. `.bf-1` loops every
  `--flutter-cycle` and is closest to the paw at 25% and 75% (1.5s, 4.5s).
- **Paw poses**: the white cat's leg is never rotated (that blurred the pixels). `.peek-paw` stacks four 18×24
  pixel poses drawn on the cat's grid (cols 19-36): `cat-white-paw-rest.svg`, `-wind.svg` (wound up, lower),
  `-up.svg` (raised) and `-bat.svg` (flicked right). It sits before the cat's frames, so the cat covers the
  shoulder and the leg rises beside the head, never over the face. `paw-swat` animates a registered integer
  `--pose` with `step-end` (like the blinks and wing flaps), and each img shows only when `--pose` equals its
  `--n`. It loops over two flutter cycles; each swat is wind-up, raised (holding over the peaks at
  12.5/37.5/62.5/87.5%), bat, back to rest, and the third is a double swat. A second animation, `paw-out`,
  keeps the leg hidden until 1.2s, when the cat has slid out. Both loops start when `#scene-note` gets
  `.active`, so they stay in phase on every re-open.
- **The near point**: `.bf-1`'s closest point is computed from the shared variables. In the raised pose the
  paw tip is cat pixel (31.6, 3.7), and the butterfly's centre sits at cat pixel (33, -1.8), just above the toes:
  `--near-x: calc(100cqw - var(--paper-side) + 26 * var(--px))`,
  `--near-y: calc(var(--paper-top) + .16 * (100cqh - var(--paper-top) - var(--paper-bottom)) - 1.8 * var(--px))`.
  That gives tip (93.6%, 24.4%) / butterfly (94.4%, 20.0%) on desktop and tip (95.8%, 20.3%) /
  butterfly (96.5%, 18.6%) on a 390×844 phone (3:5 stage). `.bf-2` drifts along the paper's top edge round its
  top-right corner (4-5cqh) and `.bf-3` stays low on the right (55-70cqh), so they rarely meet `.bf-1`, the blue
  one never lands on the paw, and none of them crosses the text.
- **Layering on the note**: paper < cats (`z-index` 1 inside `.note-wrap`, whose drop-shadow
  filter makes it a stacking context) < butterflies (6, in the scene).
- **Original art**: `cat.svg`, `hand.svg` and `heart.svg` are our own pixel art, drawn as
  SVGs made of `<rect>` pixels. The cat is a sitting orange tabby (pink ears and nose,
  cream chest, striped tail). The hand is palm-down with a blue sleeve cuff, made to
  replace the watermarked stock images.
- **Petting**: one cat only. A `petCount` counter goes up on each pet, and the letter
  drops once it reaches `PETS_TO_DROP` (3). It drops only once. A `petting` flag ignores
  clicks until the pet ends. `renderPetCount()` writes the count into the `#pet-counter`
  badge (top-left, above everything on the card) and bumps it.
- **Petting reactions**: each pet swaps `#cat-img` to `cat-happy.svg` (only once it has
  loaded) and back afterwards, and plays one of `PET_MOVES` (`pet-lean`, `pet-purr`,
  `pet-hop`, 1.3s) in turn, with sparkles or "purr~" labels in the hearts layer. The hand
  plays `stroke` (1.2s), or `stroke-hop` for the hop: the same two strokes, quicker, then it
  lifts away before the crouch so it never covers the face mid-hop. JS awaits one animation
  per element, so every pet takes 1.3s.
- **Layering on the card**: ground shadow < cat < hand (2) < hearts/sparkles (3) < pet
  counter (4); the letter (1) sits over its own shadow.
- **Ground shadows**: stepped pixel ellipses as inline SVG data-URI backgrounds on
  `.ground-shadow` spans, sized at the sprite's pixel scale. They are siblings of the
  sprites and follow them with `:has()` (e.g. `.card:has(#cat-img.pet-hop) .cat-shadow`), so
  JS never touches them; the only exception is `unlock()` unhiding `#pop-cat-shadow`
  together with the pop-out cat.
- **Return from the note**: a document click outside `.note-wrap`, or Escape, calls
  `closeNote()`, which shows the cat scene again with the opened envelope focused. The caption
  becomes "Click the letter to read it again". Focus rings show only after keyboard input
  (`.pointer` on `<body>`). The backdrop gets a pointer cursor and a small "click outside the letter to go back" caption.
- **Fonts**: `@font-face` "Pixel" (`pixel.ttf`) for all text up to the letter caption;
  "Crayons" (`i eat crayons.ttf`) only for the note message.
- **Palette** (approximate, from the storyboard): chest bg #B98587, frame #D6CF96,
  card #D6A491, parchment #EAE6C2, text #3A2A2A.
- **Accessibility**: clickable things are `<button>`s. `prefers-reduced-motion` turns
  off the looping animations and makes one-shots finish at once (so every `animationend`
  still fires and the flow completes). In the note the cats sit still (blinks stay, as
  instant swaps) and the butterflies rest with open wings. The pet counter is an `aria-live` region. The
  letter text is a focusable, labelled scroll region; the cats and butterflies are `aria-hidden`. The
  layout is centered and scales with the viewport.
- **Assets**: all art is our own pixel-art SVG. The original screenshots and PNGs
  (including the watermarked cat/hand stock images) are removed.

## Risks / Trade-offs
- The passcode can be read in the page source. That is fine for a toy.
- Using CSS-only animation and `animationend` events means less control than an
  animation library, but it keeps the code small.
- Some fonts may lack a few glyphs, so a fallback font is needed.
- The paw/butterfly sync depends on the white cat's placement (`top: 16%`, `left: 100% - 7px`)
  and the raised pose's tip pixel (31.6, 3.7 on the white cat's grid; 12.6, 3.7 in `cat-white-paw-up.svg`), which `.bf-1`'s near-point formula
  repeats. Moving the cat or redrawing that pose means updating the formula. The poses come from
  `/tmp/fm-art3/paw_poses.py` (not in the repo).

## Open Questions
- The note keeps the storyboard's lorem ipsum placeholder for now. The user will write the final text.
