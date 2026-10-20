# interactive-story Specification (delta)

## MODIFIED Requirements

### Requirement: Passcode Prompt
Clicking the chest SHALL open a modal with a 4-digit passcode keypad. The correct code SHALL be the `PASSCODE` constant in `script.js`, set to `"2171"`. A wrong code SHALL shake the code boxes and clear them.

#### Scenario: Correct code
- **WHEN** the visitor enters 2171
- **THEN** the modal closes and the key starts its drop into the lock

#### Scenario: Wrong code
- **WHEN** the visitor enters any other 4 digits
- **THEN** the code boxes shake and clear, and the modal stays open

### Requirement: Peeking Cats
While the note is shown, two decorative pixel cats built from the orange tabby SHALL sit in the side margins at the bottom corners of the scene, cut off by its bottom edge: a tuxedo cat (`cat-tuxedo-peek.svg`) bottom-left and a white cat (`cat-white-peek.svg`) bottom-right. Each SHALL have one clean body shape (no tail, no extra leg or haunch outlines). Shortly after the paper unfolds, each cat SHALL pop up from below the edge with a small overshoot. Each cat SHALL blink on its own random clock (with an occasional double blink) while the note is open, and stop when it closes. The white cat's pupils SHALL follow the main butterfly (left, centre, right, or up when it's overhead), moving a whole sprite pixel at a time, and SHALL be hidden while it blinks. The cats SHALL be hidden from screen readers, SHALL never cover the readable text, SHALL never be selected with the text, and SHALL never catch clicks, scrolls or taps.

#### Scenario: Cats pop up
- **WHEN** the note opens
- **THEN** the tuxedo cat pops up in the bottom-left corner and the white cat in the bottom-right corner, after the paper has unfolded
- **AND** neither cat shows above the edge before its pop starts

#### Scenario: Eyes follow the butterfly
- **WHEN** the main butterfly flies to the left of, to the right of, or straight above the white cat's eyes
- **THEN** its pupils look left, right, or up accordingly

#### Scenario: Cats blink
- **WHEN** the note is open for a few seconds
- **THEN** each cat closes its eyes for a moment now and then, independently of the other

#### Scenario: Cats are decorative
- **WHEN** the reader clicks, taps or scrolls where a cat is drawn
- **THEN** the event reaches the paper or the backdrop as if the cat were not there
- **AND** no cat overlaps the readable lines of the letter

### Requirement: Butterflies
While the note is shown, three decorative pixel butterflies SHALL flutter with beating wings, outside the readable text and drawn above the paper and the cats. The white cat SHALL swat at the main butterfly with its own right front leg, drawn in front of its body: hidden below the edge at rest, then lifted from the chest (wind-up), raised beside the cheek, and swiped out (bat), as crisp pixel poses (`cat-white-paw-rest.svg`, `-wind.svg`, `-up.svg`, `-bat.svg`) swapped in steps, never rotated, never covering the eyes. The main butterfly's loop and the paw's loop SHALL start together when the note opens; at each swat's peak the main butterfly SHALL hover just above the raised paw, inside the stage, then dart away. The main butterfly SHALL loop in the right margin above the white cat, the blue one along the paper's top edge, and the small orange one in the left margin above the tuxedo. The butterflies SHALL be hidden from screen readers and SHALL never catch clicks, scrolls or taps. With `prefers-reduced-motion: reduce`, they SHALL rest with wings open and the paw SHALL stay at rest.

#### Scenario: Swat in sync
- **WHEN** the note has been open for 1.5s, 4.5s, or any later swat peak
- **THEN** the white cat's paw is raised from its chest and the main butterfly hovers just above it, fully inside the stage, on desktop and on a phone

#### Scenario: Butterflies keep off the text
- **WHEN** the butterflies fly their loops
- **THEN** none of them passes over the readable lines of the letter

### Requirement: Typography
All text from the chest scene through the letter-drop caption SHALL use the "Pixel" font (`assets/fonts/pixel.ttf`). The "Please Write Me A Song" handwriting font (`assets/fonts/Please write me a song.ttf`) SHALL be used ONLY for the letter's text.

#### Scenario: Letter font
- **WHEN** the note is shown
- **THEN** the letter renders in "Please Write Me A Song" and nothing else on the page does
