# Feedback Fixes Plan
_From user review session — 2026-07-04_

All work on `gh-pages` worktree only. Files: `index.html`, `assets/js/projects.js`, `assets/css/projects-custom.css`, `data/projects.json`, `data/certificates.json`.

---

## F1 — Hero content leaks into compact header
**Problem:** When any section tab opens, `#header` gets class `header-top`. `style.css` already hides `.social-links` and `h2` in that state (lines 188–189), but does NOT hide `.hero-cta-row` (photo + buttons). These appear crammed into the compact sidebar/navbar.
**Fix:** 1 CSS rule in `projects-custom.css`:
```css
#header.header-top .hero-cta-row { display: none !important; }
```
**File:** `assets/css/projects-custom.css`
**Risk:** None — purely additive CSS hiding.

---

## F2 — Counts: update 3 stat values
**Problem:** Happy Clients shows 75, Hours shows 3000 (no plus sign).
**Fix:** In `index.html`, update 3 purecounter values:
- Happy Clients: `data-purecounter-end="75+"` → `"100+"`, inner text `75+` → `100+`
- Projects: already `40+` — no change
- Hours of Support: `data-purecounter-end="3000"`, inner `3000` → `"3000+"` / `3000+`
- Awards: 7 — no change
**Note:** `purecounter_vanilla.js` treats non-numeric values as static text when it can't parse them — safe to use `100+` and `3000+` as literal strings (or set `data-purecounter-duration="0"` so they display instantly).
**File:** `index.html`

---

## F3 — Project Details button broken for regular cards
**Root cause (two bugs):**
1. `window._projectsManager` is referenced in the `onclick` attribute of the Details button, but it must be verified that the `ProjectsManager` instance is assigned to `window._projectsManager` at init time. If missing, onclick silently fails.
2. The Details button is only rendered when `project.unique_aspects || project.main_features.length || project.tech_stack` — most GitHub-derived projects have these empty, so the button never renders even though the card says "click for details".
**Fix in `projects.js`:**
- Confirm `window._projectsManager = this` is set in the constructor or `init()`.
- Always show the Details button on every card (even without unique_aspects/features — the modal can show description + tech + stars/forks as fallback).
- For cards with no meaningful detail (no unique_aspects, no features, no tech_stack), the Details button opens the modal with description + tech + links.
- Fix `project-card-clickable` class: add click listener that calls `showProjectDetail` (mirroring what `featured-card-clickable` does).
**File:** `assets/js/projects.js`

---

## F4 — Hide GitHub button for private repos
**Problem:** Featured private projects (AI Email Triage, WhatsApp Summarizer, Upwork Cover Letter Gen, Thotos, etc.) show a GitHub button even though the repo is private.
**Fix:** In `createProjectCard()` and `createFeaturedCard()`, add `&& !project.is_private` guard:
```js
const ghBtn = project.github_url && !project.is_private
    ? `<a href="...">GitHub</a>` : '';
```
Also in the modal render block (line ~330) apply same guard.
**File:** `assets/js/projects.js`

---

## F5 — Featured project: add Rayyan Group demo URL
**Problem:** Rayyan Group entry in `projects.json` has no `demo_url`. User confirmed the group homepage exists.
**Fix:** Add `"demo_url": "https://rayanagro.group"` to the Rayyan Group entry in `data/projects.json`. Verify the URL resolves; if it does not, set to the farm or feed sub-app URL instead (`farm.rayanagro.group` / `feed.rayanagro.group`).
**File:** `data/projects.json`

---

## F6 — Pagination scrolls to page top instead of section top
**Problem:** Pagination click handler calls:
```js
document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
```
In the SPA layout `#projects` is `position: absolute`, so `scrollIntoView` triggers a full-page scroll rather than scrolling within the visible section.
**Fix:** Replace with scroll to top of the projects section's container, or simply scroll the section's `.container` element into view, or better — scroll `window` to `0` within the already-visible section (the section is not scrollable, the page is). Since only one section is visible at a time in the SPA, just scroll window to top of content area:
```js
window.scrollTo({ top: 0, behavior: 'smooth' });
```
Or do nothing (user is already in the section). The least-disruptive fix: **remove the scrollIntoView call entirely** — the projects section is already showing; no scroll needed on page change.
**File:** `assets/js/projects.js` line ~553

---

## F7 — Contact: remove WhatsApp button, link phone to WhatsApp
**Problem:** There is a separate "Message on WhatsApp" `<a>` link inside the Call/WhatsApp info box. It's misaligned and redundant.
**Fix in `index.html`:**
- Remove the `<a class="whatsapp-link">Message on WhatsApp</a>` element entirely.
- Wrap the phone number text in a `wa.me` link: `<a href="https://wa.me/8801686261785" target="_blank">+880 168 626 1785</a>` with a small WhatsApp icon before it.
- Keep the "Call / WhatsApp" box title and the `<i class="bx bxl-whatsapp">` icon already there.
**File:** `index.html`

---

## F8 — Footer: fix icons and remove "Built by" credit
**Problems:**
1. Fiverr uses `<i class="bi bi-bag">` — not a Fiverr icon (Bootstrap Icons has no Fiverr icon; should use SVG or text label).
2. Upwork uses `<i class="bi bi-briefcase">` — same issue.
3. Footer credit reads `© 2026 Md. Sarwar Jahan Sabit · Built by Sarwar Jahan` — the "Built by" part is redundant.
**Fix in `index.html`:**
- For Fiverr footer link: replace `<i class="bi bi-bag">` with the same inline SVG used in the header social-links (copy from `index.html` line ~114).
- For Upwork footer link: replace `<i class="bi bi-briefcase">` with the inline SVG from header.
- Footer credit: remove `&middot; Built by Sarwar Jahan`, keep `© <year> Md. Sarwar Jahan Sabit`.
**File:** `index.html`

---

## F9 — Certificates: add LinkedIn links for two entries
**Problem:** Android App Dev (NACTAR) and Full Stack Web Dev (Bohubrihi) have no direct credential URL — they're hosted on LinkedIn. User wants these linked.
**Fix in `data/certificates.json`:**
- Android App Dev (NACTAR): add `"credential_url": "https://www.linkedin.com/in/mdsarwarjahan-sabit/details/certifications/"` (LinkedIn certifications tab, since the exact deep link from the CV is very long; use the shortened profile certifications tab URL).
- Full Stack Web Dev (Bohubrihi): the CV has a direct Cloudinary PDF URL — add `"credential_url": "https://res.cloudinary.com/bohubrihi/image/upload/v1709648524/production/65e72a8870ba638bb613fead.pdf"`.
**File:** `data/certificates.json`

---

## Execution order

Independent (can parallel):
- F1 (CSS, 1 line)
- F2 (index.html counts)
- F7 (index.html contact)
- F8 (index.html footer)
- F9 (certificates.json)
- F5 (projects.json Rayyan URL) — verify URL first

Sequential:
- F4 before F3 (private guard logic needed before modal wiring review)
- F6 (projects.js pagination) — same file as F3/F4, do in one pass

## Acceptance criteria
- [ ] On any section tab, header shows only H1 name + navbar — no photo, no CTA buttons
- [ ] Counts: 100+ clients, 40+ projects, 3000+ hours
- [ ] Clicking Details on any project card opens modal (featured and regular)
- [ ] Private-repo cards have no GitHub button
- [ ] Pagination page change does not scroll to page top
- [ ] Contact box: phone number is a wa.me link, no separate WhatsApp button
- [ ] Footer: correct Fiverr/Upwork SVG icons, no "Built by" text
- [ ] Cert cards for NACTAR Android and Bohubrihi Full Stack have working Verify links
