# Change: Add the Forbidden Magic interactive experience

## Why
The project has its storyboard and assets but no page yet. This change builds the
whole short story as one simple static web page.

## What Changes
- Landing scene: a locked chest that rattles (CSS shake loop) with the caption "What could this chest be hiding"
- Clicking the chest opens a modal with a 4-digit passcode keypad (`PASSCODE = "1234"`); a wrong code shakes and clears the input
- A correct code closes the modal, the key drops into the lock and turns, crumbles away pixel by pixel, and the chest swaps to its open frame
- The cat springs out of the chest, arcs over its front and lands in front of it; on the cat card it idles with a breathing bob, and the caption reads "This cat is holding something (Try petting it!)"
- Petting the cat (click/tap) plays the hand stroke, a happy squish, and floating 8-bit hearts; the cat shows a happy face and the pets rotate through a lean, a purr and a hop, with sparkles or "purr~" labels, and bigger hearts on the letter-dropping pet
- A pixel badge in the cat card's top-left corner counts the pets
- The chest and the cat have stepped pixel ground shadows that follow their animations
- After the cat has been petted several times (`PETS_TO_DROP = 3`), a closed envelope drops with a growing shadow; the caption reads "A letter dropped, what could it contain"
- Clicking the letter opens the (worn-out) envelope and shows a torn-edge, worn-out parchment note
- Clicking outside the note's paper or pressing Escape goes back to the cat card with the opened letter; the pet count is kept and the letter can be re-opened
- The note's text scrolls inside the fixed paper (wheel, touch, a pixel scrollbar, keyboard), with fades at edges that have more text beyond them and a "scroll" cue. Scrolling never closes the note, and the text starts at the top each time it opens; phones get a taller paper
- Two cats peek round the paper's edges (a tuxedo cat on the left, a white cat on the right) and blink at random
- Three pixel butterflies flutter by the white cat, which swats at the main one in sync; reduced motion rests them
- Fonts: "Pixel" for all text up to the letter caption, "Crayons" only for the note message
- Use our own pixel-art SVGs (`chest-locked.svg`, `chest-open.svg`, `key.svg`, `envelope-closed.svg`, `envelope-open.svg`, `cat.svg`, `cat-happy.svg`, `hand.svg`, `heart.svg`, `cat-tuxedo-peek.svg`, `cat-tuxedo-peek-blink.svg`, `cat-white-peek.svg`, `cat-white-peek-blink.svg`, `cat-white-paw-rest.svg`, `cat-white-paw-wind.svg`, `cat-white-paw-up.svg`, `cat-white-paw-bat.svg`, `butterfly.svg`, `butterfly-flap.svg`, `butterfly-blue.svg`, `butterfly-blue-flap.svg`) instead of the original screenshots

## Impact
- Affected specs: `interactive-story` (new)
- Affected files: `index.html`, `style.css`, `script.js`,
  `assets/images/` (new `chest-locked.svg`, `chest-open.svg`, `key.svg`,
  `envelope-closed.svg`, `envelope-open.svg`, `cat.svg`, `cat-happy.svg`, `hand.svg`, `heart.svg`,
  `cat-tuxedo-peek.svg`, `cat-tuxedo-peek-blink.svg`, `cat-white-peek.svg`, `cat-white-peek-blink.svg`,
  `cat-white-paw-rest.svg`, `cat-white-paw-wind.svg`, `cat-white-paw-up.svg`, `cat-white-paw-bat.svg`, `butterfly.svg`, `butterfly-flap.svg`, `butterfly-blue.svg`, `butterfly-blue-flap.svg`;
  the old screenshots and PNGs are removed),
  `assets/fonts/pixel.ttf`, `assets/fonts/i eat crayons.ttf`
