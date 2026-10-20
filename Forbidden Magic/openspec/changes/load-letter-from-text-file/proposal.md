# Change: Load the letter's message from a text file

## Why
The user wants to write the (long) letter in a plain text file instead of
hand-editing the paragraph inside index.html.

## What Changes
- New `letter.txt` next to `index.html` holds the message. Blank lines separate
  paragraphs; single line breaks are kept.
- `script.js` `loadLetter()` fetches it on page load and fills `#note-scroll` with one
  `<p>` per paragraph, as plain text (no HTML is interpreted).
- If the file can't be read, the paragraph in index.html stays as the fallback. Pages
  opened straight from disk (`file://`) can't read local files in browsers, so there the
  fetch is skipped and the fallback is shown; served over http(s) the file is used.

## Impact
- Affected specs: `interactive-story` (Scrollable Letter: source of the text)
- Affected files: `letter.txt` (new), `index.html` (comment), `script.js`
