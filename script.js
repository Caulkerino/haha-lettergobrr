const PASSCODE = "2171";
const PETS_TO_DROP = 3;

// chest -> passcode -> key -> cat -> letter -> opening -> note (-> back to letter)
let state = "chest";
let petCount = 0;
let petting = false;
let entered = "";

const $ = (id) => document.getElementById(id);

const chest = $("chest");
const chestSprite = $("chest-sprite");
const key = $("key");
const popCat = $("pop-cat");
const popCatShadow = $("pop-cat-shadow");
const modal = $("modal");
const code = $("code");
const cat = $("cat");
const catImg = $("cat-img");
const hand = $("hand");
const hearts = $("hearts");
const caption = $("cat-caption");
const petCounter = $("pet-counter");
const petCountEl = $("pet-count");
const letterWrap = $("letter-wrap");
const letter = $("letter");
const letterImg = $("letter-img");
const note = document.querySelector(".note");
const noteScroll = $("note-scroll");
const peekCats = document.querySelectorAll(".peek-cat");

// Show one <section> and hide the rest; the others are inert, so a scene
// still fading out can't be tabbed into (focus the new one after this).
function show(scene) {
  document.querySelectorAll(".scene").forEach((s) => {
    const on = s.id === "scene-" + scene;
    s.classList.toggle("active", on);
    s.inert = !on;
  });
}

// Add an animation class and resolve when that element's animation ends.
function play(el, cls) {
  return new Promise((resolve) => {
    el.classList.remove(cls);
    void el.offsetWidth; // restart the animation if it already ran
    el.addEventListener("animationend", function done(e) {
      if (e.target !== el) return;
      el.removeEventListener("animationend", done);
      resolve();
    });
    el.classList.add(cls);
  });
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- 1. Chest + passcode ---------- */

function openModal() {
  state = "passcode";
  entered = "";
  renderCode();
  modal.hidden = false;
  modal.querySelector("button").focus();
}

function closeModal() {
  modal.hidden = true;
  code.classList.remove("shake"); // a shake cut short by closing never ends, don't replay it on reopen
  if (state === "passcode") {
    state = "chest";
    chest.focus();
  }
}

function renderCode() {
  code.querySelectorAll("span").forEach((box, i) => {
    box.textContent = entered[i] ? "*" : "";
  });
}

async function press(k) {
  if (state !== "passcode") return;
  if (k === "clear") entered = "";
  else if (k === "back") entered = entered.slice(0, -1);
  else if (entered.length < 4) entered += k;
  renderCode();

  if (entered.length < 4) return;
  if (entered === PASSCODE) {
    state = "key";
    closeModal();
    unlock();
  } else {
    await play(code, "shake");
    code.classList.remove("shake");
    entered = "";
    renderCode();
  }
}

/* ---------- Key crumbling into dust ---------- */

const CRUMBLE_MS = 900; // one pixel's drift, matches #key.crumble rect in style.css
const SWEEP_MS = 1200; // how long the crumble takes to spread from tip to bow
const rand = (min, max) => min + Math.random() * (max - min);

// A few tiny gold squares that float off with the dust.
function addSparks(svg, pixels) {
  for (let i = 0; i < 6; i++) {
    const from = pixels[Math.floor(Math.random() * pixels.length)];
    const spark = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    spark.setAttribute("class", "spark");
    spark.setAttribute("x", +from.getAttribute("x") + 0.25);
    spark.setAttribute("y", +from.getAttribute("y") + 0.25);
    spark.setAttribute("width", 0.5);
    spark.setAttribute("height", 0.5);
    svg.append(spark);
  }
}

// Crumble the key pixel by pixel; resolves when the last pixel is gone.
function disintegrate(svg) {
  const pixels = [...svg.querySelectorAll("rect")];
  addSparks(svg, pixels);
  const ys = pixels.map((p) => +p.getAttribute("y"));
  const top = Math.min(...ys);
  const span = Math.max(...ys) - top || 1;

  let last = null;
  let lastDelay = -1;
  svg.querySelectorAll("rect").forEach((p) => {
    // tip (bottom of the drawing) goes first, the bow last, with some jitter
    const sweep = 1 - (+p.getAttribute("y") - top) / span;
    const delay = Math.round(sweep * SWEEP_MS + rand(0, 250));
    // the key stays upright, so pixels drift up and a little sideways
    const far = p.classList.contains("spark") ? 2 : 1;
    p.style.setProperty("--dx", rand(-3, 3) * far + "px");
    p.style.setProperty("--dy", rand(-6, -2) * far + "px");
    p.style.setProperty("--rot", rand(-120, 120) + "deg");
    p.style.setProperty("--delay", delay + "ms");
    if (delay > lastDelay) [last, lastDelay] = [p, delay];
  });

  return new Promise((resolve) => {
    last.addEventListener("animationend", resolve, { once: true });
    setTimeout(resolve, lastDelay + CRUMBLE_MS + 200); // fallback
    svg.classList.add("crumble");
  });
}

async function unlock() {
  chest.disabled = true;
  chestSprite.classList.remove("rattle");
  key.removeAttribute("hidden"); // #key is an inline <svg>, which has no .hidden
  await play(key, "key-in");
  await disintegrate(key);
  key.setAttribute("hidden", "");
  chestSprite.classList.add("open");

  // springs out, arcs over the chest's front and lands in front of it; the
  // shadow's own 1.3s animation keeps it invisible until the paws touch down
  popCatShadow.hidden = false;
  popCat.hidden = false;
  await play(popCat, "pop-out");
  await wait(600);
  state = "cat";
  show("cat");
  cat.focus();
}

chest.addEventListener("click", () => {
  if (state === "chest") openModal();
});

$("keypad").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (btn) press(btn.dataset.key);
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (state !== "passcode") return;
  if (e.key === "Escape") closeModal();
  else if (/^[0-9]$/.test(e.key)) press(e.key);
  else if (e.key === "Backspace") press("back");
});

// Focus rings only for keyboard users.
document.addEventListener("pointerdown", () => document.body.classList.add("pointer"));
document.addEventListener("keydown", () => document.body.classList.remove("pointer"));

/* ---------- 2. Petting + letter drop ---------- */

const CALM_SRC = "assets/images/cat.svg";
const HAPPY_SRC = "assets/images/cat-happy.svg";
const PET_MOVES = ["pet-lean", "pet-purr", "pet-hop"]; // rotated so pets differ

// Load the happy face up front; only swap to it once it really loaded.
const happyFace = new Image();
happyFace.src = HAPPY_SRC;

function setHappy(on) {
  if (on && !(happyFace.complete && happyFace.naturalWidth)) return;
  catImg.src = on ? HAPPY_SRC : CALM_SRC;
}

// Drop a short-lived effect into the hearts layer; it removes itself.
function addEffect(el, left, bottom, delay) {
  el.style.left = left + "%";
  el.style.bottom = bottom + "%";
  el.style.animationDelay = delay + "s";
  el.addEventListener("animationend", () => el.remove());
  hearts.append(el);
}

function spawnHearts(count = 3, big = false) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("img");
    heart.src = "assets/images/heart.svg";
    heart.alt = "";
    heart.className = big ? "heart big" : "heart";
    const left = 4 + i * (68 / count) + Math.random() * 6; // spread out, no clumps
    addEffect(heart, left, 0, i * (big ? 0.15 : 0.2));
  }
}

// Pixel sparkles twinkling around the ears.
function spawnSparkles() {
  for (let i = 0; i < 4; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    addEffect(sparkle, 5 + i * 24 + Math.random() * 10, Math.random() * 40, 0.1 + i * 0.15);
  }
}

// "purr" squiggles drifting off the side of the head.
function spawnPurrs() {
  for (let i = 0; i < 2; i++) {
    const purr = document.createElement("span");
    purr.className = "purr";
    purr.textContent = "purr~";
    addEffect(purr, 92 + i * 10, i * 40, 0.15 + i * 0.4);
  }
}

// Show the pet total and give the badge a little bump.
function renderPetCount() {
  petCountEl.textContent = petCount;
  play(petCounter, "bump");
}

cat.addEventListener("click", async () => {
  if (petting || (state !== "cat" && state !== "letter")) return;
  petting = true;
  petCount++;
  renderPetCount();
  const move = PET_MOVES[(petCount - 1) % PET_MOVES.length];
  const stroke = move === "pet-hop" ? "stroke-hop" : "stroke"; // the hand lifts off before the hop
  const last = petCount === PETS_TO_DROP;
  setHappy(true);
  spawnHearts(last ? 6 : 3, last);
  if (move === "pet-purr") spawnPurrs();
  else spawnSparkles();
  await Promise.all([play(hand, stroke), play(catImg, move)]);
  hand.classList.remove(stroke);
  catImg.classList.remove(move);
  setHappy(false);
  petting = false;

  if (last) dropLetter();
});

async function dropLetter() {
  state = "letter";
  caption.textContent = "A letter dropped, what could it contain";
  letterWrap.hidden = false;
  await play(letter, "drop");
  letter.classList.remove("drop");
}

/* ---------- 3. Opening the letter ---------- */

letter.addEventListener("click", async () => {
  if (state !== "letter") return;
  state = "opening";
  const popping = play(letter, "open-pop");
  await wait(175); // swap at the squash peak so the flap seems to spring open
  letterImg.src = "assets/images/envelope-open.svg";
  await popping;
  letter.classList.remove("open-pop");
  await wait(400);
  openNote();
});

// The one way into the note, first read and every re-read alike.
function openNote() {
  state = "note";
  show("note");
  resetNote();
  startBlinking();
  startWatching();
  // focus the text (not the letter): arrows/PageDown/Space scroll it, and
  // Enter/Space on the letter during the fade can't "click outside the paper"
  noteScroll.focus({ preventScroll: true });
}

// Back to the cat (petCount kept), the opened letter waiting beside it to re-read.
function closeNote() {
  if (state !== "note") return;
  stopBlinking();
  stopWatching();
  state = "letter";
  caption.textContent = "Click the letter to read it again";
  show("cat");
  letter.focus();
}

// A press that starts on the paper (dragging the scrollbar, selecting text)
// and is released off it fires its click on the backdrop: that's not "outside".
let pressedOnPaper = false;
document.addEventListener("pointerdown", (e) => {
  pressedOnPaper = !!e.target.closest(".note-wrap");
});

// Clicking anywhere but the paper goes back; clicks on the paper do nothing.
document.addEventListener("click", (e) => {
  if (state === "note" && !pressedOnPaper && !e.target.closest(".note-wrap")) closeNote();
});

document.addEventListener("keydown", (e) => {
  if (state === "note" && e.key === "Escape") closeNote();
});

/* ---------- Scrolling the letter ---------- */

let noteScrolled = false; // the "scroll" cue hides once the reader scrolls

// Fade the text at an edge with more beyond it; show the cue until scrolled.
function updateNoteHints() {
  const { scrollTop, scrollHeight, clientHeight } = noteScroll;
  const more = scrollHeight - clientHeight - scrollTop > 2;
  if (scrollTop > 4) noteScrolled = true;
  noteScroll.classList.toggle("more-above", scrollTop > 2);
  noteScroll.classList.toggle("more-below", more);
  note.classList.toggle("show-cue", more && !noteScrolled);
}

// Back to the top of the letter, cue showing again.
function resetNote() {
  noteScroll.scrollTop = 0;
  noteScrolled = false;
  updateNoteHints();
}

noteScroll.addEventListener("scroll", updateNoteHints, { passive: true });

// The letter's text lives in letter.txt: blank lines separate paragraphs, single
// line breaks are kept. It's added as plain text (no HTML). If the file can't be
// read (opened from disk: browsers block file:// fetches), the HTML's own
// paragraph stays as the fallback.
async function loadLetter() {
  if (location.protocol === "file:") return; // can't read it; don't log a fetch error
  try {
    const res = await fetch("letter.txt", { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    const paragraphs = (await res.text()).trim().split(/\r?\n\s*\r?\n/);
    noteScroll.replaceChildren(...paragraphs.map((para) => {
      const p = document.createElement("p");
      para.split(/\r?\n/).forEach((line, i) => {
        if (i) p.append(document.createElement("br"));
        p.append(line);
      });
      return p;
    }));
    updateNoteHints();
  } catch {
    // keep the fallback paragraph already in index.html
  }
}

loadLetter();
new ResizeObserver(updateNoteHints).observe(noteScroll);
document.fonts.ready.then(updateNoteHints); // the letter font loading late changes the text height

/* ---------- Peeking cats blinking ---------- */

// Each cat blinks on its own random clock (with the odd quick double blink),
// only while the note is open.
const blinkTimers = [];

function blinkLater(peekCat, i, ms) {
  blinkTimers[i] = setTimeout(() => {
    peekCat.classList.add("blink");
    blinkTimers[i] = setTimeout(() => {
      peekCat.classList.remove("blink");
      blinkLater(peekCat, i, Math.random() < .2 ? 160 : rand(2500, 5000));
    }, 140);
  }, ms);
}

function startBlinking() {
  stopBlinking();
  peekCats.forEach((peekCat, i) => blinkLater(peekCat, i, rand(1800, 3800))); // after they've peeked out
}

function stopBlinking() {
  blinkTimers.forEach(clearTimeout);
  peekCats.forEach((peekCat) => peekCat.classList.remove("blink"));
}

/* ---------- The white cat watches the butterfly ---------- */

const whiteCat = document.querySelector(".peek-white");
const mainButterfly = document.querySelector(".bf-1");
let watchFrame = 0;

// Each frame, glance toward the main butterfly: left or right when it's off to
// a side, straight up when it's overhead (the iris is round, so no diagonals).
function watch() {
  const cat = whiteCat.getBoundingClientRect();
  const fly = mainButterfly.getBoundingClientRect();
  const px = cat.width / 32;                         // one sprite pixel on screen
  const dx = fly.left + fly.width / 2 - (cat.left + 11 * px);
  const dy = fly.top + fly.height / 2 - (cat.top + 11 * px);
  const ex = Math.abs(dx) < 3 * px ? 0 : Math.sign(dx);
  const up = ex === 0 && dy < -4 * px;
  whiteCat.style.setProperty("--ex", ex);
  whiteCat.style.setProperty("--ey", up ? -1 : 0);
  watchFrame = requestAnimationFrame(watch);
}

function startWatching() {
  stopWatching();
  watchFrame = requestAnimationFrame(watch);
}

function stopWatching() {
  cancelAnimationFrame(watchFrame);
}
