# interactive-story Specification

## ADDED Requirements

### Requirement: Locked Chest Landing
The page SHALL open on a landing scene showing the locked chest (`chest-locked.svg`). The chest SHALL rattle with a looping CSS shake, as if something is inside, and the caption "What could this chest be hiding" SHALL appear with it.

#### Scenario: Page loads
- **WHEN** the visitor opens `index.html`
- **THEN** the landing scene is the only visible `<section class="scene">`
- **AND** the locked chest rattles on a loop with the caption "What could this chest be hiding"

### Requirement: Passcode Prompt
Clicking the chest SHALL open a modal with a 4-digit passcode keypad. The correct code SHALL be the `PASSCODE` constant in `script.js`, set to `"1234"`.

#### Scenario: Wrong code entered
- **WHEN** the visitor enters 4 digits that do not match `PASSCODE`
- **THEN** the input shakes and is cleared
- **AND** the modal stays open

#### Scenario: Correct code entered
- **WHEN** the visitor enters 4 digits that match `PASSCODE`
- **THEN** the modal closes and the unlock sequence starts

### Requirement: Key Unlock
After a correct passcode, the key (`key.svg`, inlined) SHALL drop into the keyhole with its tip in the hole and turn in place in the lock (a flip around its shaft, staying upright). The chest SHALL then swap to its open frame (`chest-open.svg`, open with treasure).

#### Scenario: Chest unlocks
- **WHEN** the passcode modal closes after a correct code
- **THEN** the key drops into the keyhole and turns
- **AND** after the key is gone, the chest sprite changes from `chest-locked.svg` to `chest-open.svg`

### Requirement: Key Disintegration
After the key turns, it SHALL disintegrate pixel by pixel in place, starting at the tip and ending at the bow, with each pixel drifting off and fading, plus a few gold sparks. The chest SHALL open only after the last pixel is gone.

#### Scenario: Key crumbles
- **WHEN** the key finishes turning in the lock
- **THEN** its pixels crumble away from tip to bow at the keyhole
- **AND** the key is hidden and the chest opens once the crumble ends

### Requirement: Cat Reveal And Idle
Once the chest is open, the cat SHALL spring out of it, arc over the chest's front, and land on the ground in front of the chest. The cat card SHALL then show the cat playing a looping idle animation (a breathing bob), with the caption "This cat is holding something (Try petting it!)" beside it.

#### Scenario: Cat appears
- **WHEN** the chest finishes opening
- **THEN** the cat climbs out of the treasure (in front of the lid, behind the box's front panel), arcs over the chest, and lands in front of it, drawn above the chest
- **AND** the cat card is shown with the cat starting its looping idle bob
- **AND** the caption "This cat is holding something (Try petting it!)" appears beside the cat

### Requirement: Petting Interaction
There SHALL be exactly one cat. Clicking or tapping the cat SHALL pet it. The hand sprite (`hand.svg`) SHALL stroke back and forth over the cat's head, the cat SHALL squish happily, and 8-bit hearts (`heart.svg`, made from pixel rects) SHALL float up and fade out. Clicks during a pet SHALL be ignored.

#### Scenario: Visitor pets the cat
- **WHEN** the visitor clicks or taps the cat
- **THEN** the hand strokes back and forth over the cat's head
- **AND** the cat squishes and pixel hearts float up and fade

#### Scenario: Clicks during a pet
- **WHEN** the visitor clicks the cat again before the current pet has finished
- **THEN** the extra clicks do not start another pet or raise the count

### Requirement: Petting Reactions
During each pet the cat SHALL show a happy face (`cat-happy.svg`, preloaded) and SHALL return to its calm face (`cat.svg`) when the pet ends. The pets SHALL rotate through three reactions: a lean into the hand with a tail flick (with sparkles), a purr vibration (with "purr~" labels), and a crouch and hop (with sparkles). The pet that drops the letter SHALL send up more, bigger hearts. The hand SHALL never cover the cat's face: during the hop it SHALL lift away before the cat jumps.

#### Scenario: Pets differ
- **WHEN** the visitor pets the cat three times
- **THEN** the first pet leans, the second purrs with "purr~" labels, and the third hops
- **AND** the cat shows its happy face during each pet and its calm face after

#### Scenario: Hop keeps the face clear
- **WHEN** the hop reaction reaches its peak
- **THEN** the hand has already faded out above the head

#### Scenario: Letter-dropping pet
- **WHEN** the pet that brings the count to `PETS_TO_DROP` plays
- **THEN** six bigger hearts float up instead of three

### Requirement: Pet Counter
The cat card SHALL show a small pixel badge in its top-left corner with a heart and the number of pets so far ("x 0" at first). The count SHALL go up by one at the start of each pet with a short bump animation, SHALL be drawn above the cat, hand and hearts, and SHALL be announced politely to screen readers.

#### Scenario: Count goes up
- **WHEN** the visitor pets the cat
- **THEN** the badge number goes up by one and the badge bumps

#### Scenario: Count is kept
- **WHEN** the visitor returns from the note to the cat card
- **THEN** the badge still shows the earlier count and keeps counting from it

### Requirement: Letter Drop With Shadow
When the cat has been petted `PETS_TO_DROP` times (3) and that pet animation finishes, the cat SHALL drop a letter. Earlier pets SHALL NOT drop it. The closed envelope SHALL fall to the ground with a hard-edged pixel shadow under it that grows as it lands. The cat SHALL keep idling to the side, and the caption SHALL change to "A letter dropped, what could it contain".

#### Scenario: Not enough pets yet
- **WHEN** the visitor has petted the cat fewer than 3 times
- **THEN** the pet animation plays and no letter drops

#### Scenario: Enough pets
- **WHEN** the third pet animation finishes
- **THEN** the closed envelope falls and lands as its shadow grows
- **AND** the cat keeps idling to the side
- **AND** the caption reads "A letter dropped, what could it contain"

#### Scenario: Later pets
- **WHEN** the visitor pets the cat again after the letter has dropped
- **THEN** the pet animation plays and no second letter drops

### Requirement: Letter Opening And Note
Clicking the letter SHALL swap the closed envelope (`envelope-closed.svg`) to the open envelope (`envelope-open.svg`), both worn-out, without the envelope body moving, and the page SHALL then show the note: a torn-edge, worn-out parchment card with the message. The message SHALL be the storyboard's lorem ipsum placeholder until the user replaces it.

#### Scenario: Visitor opens the letter
- **WHEN** the visitor clicks the dropped letter
- **THEN** the envelope swaps to its open sprite
- **AND** the torn-edge parchment note with the message is shown

### Requirement: Return From The Note
While the note is shown, clicking anywhere outside the paper or pressing Escape SHALL go back to the cat card, where the opened envelope waits beside the cat and has keyboard focus, and the caption SHALL read "Click the letter to read it again". Clicks on the paper itself SHALL NOT close the note. A caption under the paper SHALL say "click outside the letter to go back". The pet count SHALL be kept, the visitor SHALL be able to keep petting, the letter SHALL re-open the note, and no second letter SHALL drop.

#### Scenario: Click outside the paper
- **WHEN** the visitor clicks the backdrop around the note
- **THEN** the cat card is shown with the opened envelope beside the cat, focused
- **AND** the pet count is unchanged

#### Scenario: Escape key
- **WHEN** the visitor presses Escape while the note is shown
- **THEN** the page goes back to the cat card in the same way

#### Scenario: Click on the paper
- **WHEN** the visitor clicks on the note's paper
- **THEN** the note stays open

#### Scenario: Back again
- **WHEN** the visitor pets the cat after returning, then clicks the letter
- **THEN** the count keeps going up, no second letter drops, and the note opens again

### Requirement: Scrollable Letter
The note's paper SHALL be a fixed frame that never moves or resizes while reading; only the message inside it SHALL scroll (`.note-scroll`). When there is more text above or below the visible part, that edge of the text SHALL fade out. A small "scroll" cue with a pixel arrow SHALL show at the paper's bottom edge while there is more text below, until the reader first scrolls. The text SHALL scroll by mouse wheel, touch drag, a pixel-styled scrollbar, and the keyboard (arrows, Page Up/Down, Space), and it SHALL receive focus whenever the note opens. Scrolling, dragging the scrollbar or selecting text SHALL never close the note, even when the press ends outside the paper. Every time the note opens, the text SHALL start at the top with the cue showing again. On phones the paper SHALL use thinner top and bottom margins so more lines fit, while the "click outside the letter to go back" caption stays clear of it.

#### Scenario: Text longer than the paper
- **WHEN** the note opens and the message does not fit in the paper
- **THEN** the paper stays still, the bottom edge of the text fades out and the "scroll" cue shows

#### Scenario: Reader scrolls
- **WHEN** the reader scrolls the text by wheel, touch, scrollbar, or arrows / Page Down / Space
- **THEN** only the text moves inside the paper, the top edge fades while text is hidden above, and the cue goes away
- **AND** the note stays open

#### Scenario: Drag ends outside the paper
- **WHEN** the reader presses on the paper (for example on the scrollbar) and releases the button over the backdrop
- **THEN** the note stays open

#### Scenario: Keyboard reader
- **WHEN** the note opens
- **THEN** the scrolling text has focus, so arrows, Page Up/Down and Space scroll it, Enter and Space never close the note, and Escape closes it

#### Scenario: Re-opening the letter
- **WHEN** the reader goes back to the cat and opens the letter again
- **THEN** the text is back at the top and the "scroll" cue shows again

#### Scenario: Tall letter on a portrait phone
- **WHEN** the note opens on a portrait phone (500px wide or less)
- **THEN** the stage eases from 4:3 to 3:5 with the cross-fade, so the paper fills most of the screen, and returns to 4:3 when the note closes
- **AND** the "scroll" cue sits above the paper's torn bottom edge

### Requirement: Peeking Cats
While the note is shown, two decorative pixel cats SHALL peek round the paper's edges: a tuxedo cat (`cat-tuxedo-peek.svg`) on the left edge and a white cat (`cat-white-peek.svg`) on the right edge, with their front paws curled over the paper's edge. Shortly after the paper unfolds, each cat SHALL slide out from behind the paper with a small overshoot. Each cat SHALL blink (swapping to `cat-tuxedo-peek-blink.svg` / `cat-white-peek-blink.svg` for a moment) on its own random clock, with an occasional double blink; blinking SHALL start every time the note opens and SHALL stop when it closes. The cats SHALL be hidden from screen readers, SHALL never cover the readable text or the scrollbar thumb on desktop or mobile, SHALL never be selected with the text, and SHALL never catch clicks, scrolls or taps.

#### Scenario: Cats peek in
- **WHEN** the note opens
- **THEN** the tuxedo cat slides out on the left edge and the white cat on the right edge, after the paper has unfolded
- **AND** no part of either cat (ear or paw) shows past the paper before its slide starts, and the white cat's paw appears only once the cat is out

#### Scenario: Cats blink
- **WHEN** the note is open for a few seconds
- **THEN** each cat closes its eyes for a moment now and then, independently of the other

#### Scenario: Blinking follows the note
- **WHEN** the reader closes the note and later opens it again
- **THEN** no blinking runs while the note is closed, and both cats blink again after it re-opens

#### Scenario: Cats are decorative
- **WHEN** the reader clicks, taps or scrolls where a cat is drawn
- **THEN** the event reaches the paper or the backdrop as if the cat were not there
- **AND** no cat overlaps the readable lines of the letter

### Requirement: Butterflies
While the note is shown, three decorative pixel butterflies (`butterfly.svg` / `butterfly-flap.svg` in orange, `butterfly-blue.svg` / `butterfly-blue-flap.svg` in blue) SHALL flutter with beating wings around the white cat, outside the readable text and drawn above the paper and the cats. The white cat SHALL swat at them with its paw in sync, as crisp pixel poses (rest, wind-up, raised, bat: `cat-white-paw-rest.svg`, `cat-white-paw-wind.svg`, `cat-white-paw-up.svg`, `cat-white-paw-bat.svg`) swapped in steps, never rotated, with the leg rising beside the head so it never covers the cat's face: the main butterfly's loop and the paw's loop SHALL start together when the note opens, and each swat's peak SHALL land at the moment the main butterfly hovers just past the paw tip, after which the butterfly darts away. This sync SHALL hold on desktop and on phones. The butterflies SHALL be hidden from screen readers and SHALL never catch clicks, scrolls or taps. With `prefers-reduced-motion: reduce`, the butterflies SHALL rest in place with their wings open and the paw SHALL stay in its rest pose. The butterflies SHALL keep apart: the blue one drifts along the paper's top edge, the small orange one stays low on the right.

#### Scenario: Swat in sync
- **WHEN** the note has been open for 1.5s, 4.5s, or any later swat peak
- **THEN** the white cat's paw is fully raised and the main butterfly hovers just beyond its tip, on desktop and on a phone

#### Scenario: Butterflies keep off the text
- **WHEN** the butterflies fly their loops
- **THEN** none of them passes over the readable lines of the letter

#### Scenario: Reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is set and the note opens
- **THEN** the butterflies rest with open wings, the cats sit still, and the cats still blink

### Requirement: Ground Shadows
The chest, the cat on the card, and the cat landed in front of the chest SHALL each have a soft stepped pixel-ellipse shadow on the ground, drawn at the sprite's pixel size and matching the letter shadow's darkness. The shadows SHALL follow their sprite: narrowing as the chest rattles, spreading on squashes, shrinking as the cat rises or hops. The landed cat's shadow SHALL stay hidden until the cat comes down in front of the chest. Shadows SHALL be drawn under their sprite: chest shadow below the chest, the landed cat's shadow above the chest but below the cat.

#### Scenario: Chest shadow
- **WHEN** the locked chest rattles
- **THEN** its shadow narrows and slides with each tilt

#### Scenario: Cat lands with its shadow
- **WHEN** the cat comes down in front of the open chest
- **THEN** a shadow grows in under its paws and spreads on the landing squash

#### Scenario: Cat hops on the card
- **WHEN** the hop reaction lifts the cat
- **THEN** the cat's shadow shrinks and fades, and spreads again when it lands

### Requirement: Typography
All text from the chest scene through the letter-drop caption SHALL use the "Pixel" font (`assets/fonts/pixel.ttf`). The "Crayons" handwriting font (`assets/fonts/i eat crayons.ttf`) SHALL be used ONLY for the note message.

#### Scenario: Fonts per scene
- **WHEN** any caption, keypad, or other text before the note is shown
- **THEN** it renders in the "Pixel" font

#### Scenario: Note message font
- **WHEN** the note is shown
- **THEN** the message renders in the "Crayons" font and nothing else on the page does

### Requirement: Pixel-Art Rendering And Accessibility
Sprites SHALL use `image-rendering: pixelated`; animations SHALL use smooth eased timing (not `steps()`), except sprite frame swaps (wing beats, blinks), which cut between frames. Every clickable element (chest, keypad keys, cat, letter) MUST be a `<button>` so the page works by keyboard. When `prefers-reduced-motion` is set, looping animations SHALL be turned off, but the whole flow SHALL still work.

#### Scenario: Keyboard-only visitor
- **WHEN** the visitor uses only Tab, Enter/Space and Escape
- **THEN** they can open the chest, enter the passcode, pet the cat, open the letter, scroll the note, and go back from the note

#### Scenario: Reduced motion
- **WHEN** the visitor's system has `prefers-reduced-motion: reduce` set
- **THEN** the chest rattle, cat idle bob, the paw swats, the butterflies' flight, and other looping animations do not play
- **AND** every step from the locked chest to the note, and back to the letter, can still be completed
