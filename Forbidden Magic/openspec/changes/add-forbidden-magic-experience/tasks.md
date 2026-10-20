# Tasks

## 1. Setup & Assets
- [x] 1.1 Create pixel-art SVGs `chest-locked.svg`, `chest-open.svg`, `key.svg`, `envelope-closed.svg`, `envelope-open.svg` (worn-out), and delete the old screenshots and PNGs
- [x] 1.2 Create our own pixel-art `assets/images/cat.svg`, `hand.svg` and `heart.svg` from `<rect>`s
- [x] 1.3 In `style.css`, add `@font-face` for "Pixel" (`assets/fonts/pixel.ttf`) and "Crayons" (`assets/fonts/i eat crayons.ttf`), plus palette vars `--rose #B98587`, `--khaki #D6CF96`, `--card #D6A491`, `--parchment #EAE6C2`, `--ink #3A2A2A`
- [x] 1.4 In `index.html`, add the skeleton: one `<section class="scene" id="scene-...">` per scene (chest, cat, note; the letter drops inside the cat scene), the passcode modal, and links to `style.css` and `script.js`
- [x] 1.5 In `script.js`, add `PASSCODE = "1234"`, `PETS_TO_DROP = 3` and `petCount = 0` at the top, one `state` variable, and a `show(scene)` function that toggles `.active`

## 2. Chest & Rattle
- [x] 2.1 In `index.html`, add the chest `<button>` and the caption "What could this chest be hiding"
- [x] 2.2 In `style.css`, show `chest-locked.svg` as the chest background and swap to `chest-open.svg` with `.open` (preloaded in `index.html`), with `image-rendering: pixelated`
- [x] 2.3 In `style.css`, add a looping eased rattle/shake keyframe to the locked chest
- [x] 2.4 In `script.js`, open the passcode modal when the chest is clicked

## 3. Passcode & Key
- [x] 3.1 In `index.html`, build the modal: a 4-digit display and keypad `<button>`s (0–9, clear)
- [x] 3.2 In `script.js`, collect digits and check them against `PASSCODE` once 4 are entered
- [x] 3.3 In `script.js` + `style.css`, on a wrong code shake the modal and clear the input
- [x] 3.4 On a correct code, close the modal, show the inlined `key.svg` and drop it into the keyhole, turning it in place with a flip around its shaft (`style.css`)
- [x] 3.6 After the turn, disintegrate the key pixel by pixel from tip to bow with gold sparks (`script.js` + `style.css`)
- [x] 3.5 In `script.js`, when the key lands swap the chest to its open frame

## 4. Cat Reveal & Idle
- [x] 4.1 In `index.html`, add the cat `<button>` (`cat.svg`) and the caption "This cat is holding something (Try petting it!)" beside it
- [x] 4.2 In `style.css`, add an eased pop-out keyframe that springs the cat out of the chest, over its front, and lands it in front of the chest
- [x] 4.3 In `style.css`, follow it with a looping idle bob
- [x] 4.4 In `script.js`, `show()` the cat scene after the chest opens

## 5. Petting
- [x] 5.1 In `index.html`, add the `hand.svg` sprite over the cat's head (hidden by default)
- [x] 5.2 In `style.css`, add the back-and-forth stroke keyframe for the hand and a squish keyframe for the cat
- [x] 5.3 In `script.js`, on cat click play the stroke + squish, spawn `heart.svg` elements and increment `petCount`
- [x] 5.4 In `style.css`, make the hearts float up and fade, and remove them in `script.js` on `animationend`

## 6. Letter Drop & Note
- [x] 6.1 In `script.js`, when the pet that brings `petCount` to `PETS_TO_DROP` finishes, `show()` the letter scene (only once) while the cat keeps idling to the side
- [x] 6.2 In `style.css`, drop `envelope-closed.svg` to the ground and grow a blurred dark ellipse shadow under it as it lands
- [x] 6.3 In `index.html`, change the caption to "A letter dropped, what could it contain"; make the envelope a `<button>`
- [x] 6.4 In `script.js`, on click swap to `envelope-open.svg`, then `show()` the note
- [x] 6.5 In `style.css`, style the note as worn-out `--parchment` paper with a torn edge (`clip-path: polygon(...)`) and the "Crayons" font; put the storyboard's lorem ipsum placeholder in `index.html` as the message

## 7. Polish & Verify
- [x] 7.1 In `style.css`, add a `prefers-reduced-motion` block that disables the rattle, bob, stroke, and fall animations
- [x] 7.2 Check that every `<button>` (chest, keypad, cat, envelope) works by keyboard with a visible focus style
- [x] 7.3 Check the layout on a narrow mobile viewport and fix the scaling in `style.css`
- [x] 7.4 Open `index.html` in a browser and click through the whole flow: chest → passcode → key → cat → pet → letter → note
- [x] 7.5 Test the wrong-passcode path: it shakes, clears, and lets you try again
- [x] 7.6 Test that pets 1–2 drop no letter, pet 3 drops it, and later pets don't drop another

## 8. Extras
- [x] 8.1 Add the `#pet-counter` badge in the cat card's top-left corner; `renderPetCount()` updates it and plays `.bump`
- [x] 8.2 Add `cat-happy.svg` and swap to it during each pet; rotate the `pet-lean` / `pet-purr` / `pet-hop` reactions with sparkles, "purr~" labels, and bigger hearts on pet 3
- [x] 8.3 Shade `cat.svg`, `cat-happy.svg`, `chest-locked.svg` and `chest-open.svg`
- [x] 8.4 Add stepped pixel ground shadows for the chest, the card cat and the landed pop-out cat that follow their sprites via `:has()`
- [x] 8.5 Make the pop-out cat arc over the chest and land in front of it (`z-index` switch in `pop-out`), unhiding its shadow in `unlock()`
- [x] 8.6 Add `closeNote()`: clicking outside the paper or pressing Escape returns to the cat card with the opened letter, plus the `.note-hint` caption
- [x] 8.7 Integrate: add `stroke-hop` so the hand lifts off before the hop, merge the duplicated `.pop-cat-shadow` rules, remove dead rules (`.squish` shadow rule, `.key[hidden]`) and redundant JS in `closeNote()`
- [x] 8.8 Re-test the full flow (mouse, keyboard, reduced motion) including note → letter → note, layering, and that the count is kept with no second letter

## 9. Reading Scene
- [x] 9.1 Wrap the message in `div.note-scroll#note-scroll` (`tabindex="0"`, labelled) inside the fixed `article.note`; scroll only the text, with a pixel scrollbar and `overscroll-behavior: contain`
- [x] 9.2 Add `updateNoteHints()` (`.more-above` / `.more-below` mask fades, `.show-cue` "scroll" cue until the first scroll) and `resetNote()` (back to the top on every open)
- [x] 9.3 Keep scrolls and drags from closing the note: the `pressedOnPaper` guard on `pointerdown`; focus `#note-scroll` on open so arrows/Page Down/Space scroll and Enter/Space never close
- [x] 9.4 Draw `cat-tuxedo-peek.svg`, `cat-tuxedo-peek-blink.svg`, `cat-white-peek.svg`, `cat-white-peek-blink.svg` and `cat-white-paw.svg`; add `.peek-cat.peek-tuxedo` (left edge) and `.peek-cat.peek-white` (right edge) with the peek-in slide and the `paw-swat` loop
- [x] 9.5 Add `startBlinking()` / `stopBlinking()` with an independent random blink clock per cat
- [x] 9.6 Draw `butterfly.svg`, `butterfly-flap.svg`, `butterfly-blue.svg` and `butterfly-blue-flap.svg`; add `.butterfly.bf-1/.bf-2/.bf-3` with wing beats and flight loops, resting with open wings under reduced motion
- [x] 9.7 Integrate: move the paper insets, sprite pixel and flutter cycle into shared variables on `#scene-note`; compute `.bf-1`'s near point from them so it hovers just past the paw tip at the 1.5s/4.5s swat peaks on desktop and phones; route every open through `openNote()` (blinking starts) and stop blinking in `closeNote()`
- [x] 9.8 Give phones a taller paper (thinner top/bottom margins and padding, hint still clear) and re-route `.bf-2` (path and rest point) so no butterfly or cat covers the readable text
- [x] 9.9 Clean up: merge the duplicated phone and reduced-motion blocks, drop the redundant `image-rendering` on the wing frames, put the butterflies on the cats' `--px` grid, make the scroll cue bob eased instead of `steps()`
- [x] 9.10 Re-test the full flow (mouse, keyboard, reduced motion, `file://`) and take screenshots of the note at 0s, 1.5s, 3s and 4.5s on desktop and at 390×844
- [x] 9.11 Polish: replace the rotating `cat-white-paw.svg` with four pixel poses (`cat-white-paw-rest.svg`, `cat-white-paw-wind.svg`, `cat-white-paw-up.svg`, `cat-white-paw-bat.svg`) stepped by `paw-swat` via `--pose`, the leg rising beside the head (never over the face); re-derive `.bf-1`'s near point from the raised pose's tip
- [x] 9.12 Start the cats further behind the paper (tuxedo `translateX(100%)`, white `-140%`) and fade the paw in only once the white cat is out
- [x] 9.13 Portrait phones: grow the stage to 3:5 while the note is open (eased with the cross-fade); raise the "scroll" cue; move the scrollbar left of the white cat's forearm (more right padding on `.note`)
- [x] 9.14 Spread the butterflies (blue along the top edge, small orange low on the right); tuxedo art: house outline `#3b1f24`, lighter closed eyes, "w" mouth
- [x] 9.15 `user-select: none` on the cats, butterflies, hint and cue; `show()` makes the other scenes `inert` so a fading scene leaves the Tab order
