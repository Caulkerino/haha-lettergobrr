# Tasks

## 1. Art
- [x] 1.1 Rebuild both peek cats from cat.svg rows 0-26 (no tail, no inner leg/haunch outlines): tuxedo 27×27, white 32×27
- [x] 1.2 White cat: pupil-less round irises (pupils become overlays)
- [x] 1.3 Redraw the four paw poses as the right front leg in front of the chest (rest = below the edge, wind-up, raised, bat)

## 2. Layout and motion
- [x] 2.1 `style.css`: cats anchored to the bottom of the scene, centred in the side margins; `peek-up` entrance replaces the side slides
- [x] 2.2 `index.html`/`style.css`: paw layer in front of the body; remove the delayed `paw-out`
- [x] 2.3 `.bf-1` near point = just above-left of the raised paw; its whole loop relative to that point; `.bf-3` to the left margin

## 3. Eyes follow the butterfly
- [x] 3.1 `index.html`/`style.css`: two 2×2 px pupil overlays with a glint, offset by `--ex`/`--ey`, hidden during a blink
- [x] 3.2 `script.js`: `startWatching()`/`stopWatching()` (requestAnimationFrame) with the note's open/close

## 4. Font and passcode
- [x] 4.1 `style.css`: `@font-face` "Please Write Me A Song" for the letter, replacing "Crayons"
- [x] 4.2 Docs: passcode is `"2171"` (changed by the user in `script.js`)

## 5. Verify
- [x] 5.1 No cat or butterfly over the letter text across a 12s loop (desktop + phone); butterfly inside the stage at each swat
- [x] 5.2 All suites pass (drive, checks, seams, new, flow, measure, letter); outdated assertions updated (passcode, font name, cat placement, `peek-up`)
