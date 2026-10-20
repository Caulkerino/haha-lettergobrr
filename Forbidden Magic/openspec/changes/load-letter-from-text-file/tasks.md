# Tasks
- [x] 1.1 Add `letter.txt` with the current placeholder text
- [x] 1.2 `script.js`: `loadLetter()` fetches it (no cache), splits on blank lines, builds `<p>`s with text nodes and `<br>`s, then `updateNoteHints()`
- [x] 1.3 Skip the fetch on `file://` and keep the HTML paragraph as the fallback (no console error)
- [x] 1.4 Verify: multi-paragraph text with line breaks and `<b>`/`&` renders as typed over http; fallback over file://; drive, flow and letter suites pass
