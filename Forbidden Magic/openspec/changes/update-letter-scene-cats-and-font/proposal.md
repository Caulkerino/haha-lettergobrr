# Change: Move the peeking cats to the bottom, lift the white cat's paw from its chest, new letter font

## Why
On the letter scene the two cats peeking round the paper's sides looked awkward, the
white cat's swatting leg rose from behind its back, and leftover leg/haunch outlines
read as extra limbs. The user also changed the passcode to 2171 and added a new
handwriting font for the letter.

## What Changes
- The tuxedo and white cats sit in the side margins at the bottom corners of the
  letter scene, built from the orange tabby (head, chest), cut off by the scene's
  bottom edge, popping up from below when the letter opens. No tails, and no inner
  leg/haunch outlines (one clean body shape).
- The white cat's swatting leg is its own right front leg, drawn in front of its body:
  hidden below the edge at rest, then tucked against the chest (wind-up), raised beside
  the cheek, and swiped out (bat). It never covers the eyes.
- The white cat's pupils follow the main butterfly (left / centre / right, or up when
  it's overhead), a whole sprite pixel at a time; hidden while it blinks.
- The main butterfly's loop is re-centred on the paw's new spot in the right margin;
  the small orange butterfly moves to the left margin above the tuxedo.
- The letter uses "Please Write Me A Song" (`assets/fonts/Please write me a song.ttf`)
  instead of "Crayons".
- Docs record the user's passcode change to `"2171"`.

## Impact
- Affected specs: `interactive-story` (Passcode Prompt, Peeking Cats, Butterflies, Typography)
- Affected files: `index.html`, `style.css`, `script.js`,
  `assets/images/cat-tuxedo-peek(-blink).svg`, `cat-white-peek(-blink).svg`,
  `cat-white-paw-{rest,wind,up,bat}.svg`
