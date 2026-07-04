# Portfolio Video-Alignment Implementation Plan

Target repo: `/home/ubuntu/projects/portfolio-ghpages` (BootstrapMade "Personal" static template, deployed to GitHub Pages at sabit.dev).
Branch: **gh-pages ONLY** (never master). Stack stays: static HTML + vanilla JS + JSON data. No framework.

## Hard constraints (do not violate)
1. Work only on `gh-pages` worktree. No framework rebuild.
2. KEEP the existing Telegram-bot contact form (`assets/js/custom.js` + form in `index.html`) exactly as-is. It satisfies the "functional form" rule. Do NOT touch the obfuscated telegram code.
3. Static host only. Anything "dynamic" = JSON file + JS render. No server runtime.

## Architecture notes discovered (affect sequencing)
- **SPA reveal mechanism (core template behavior):** `#header` is `position:fixed`, `height:100vh` (the hero/background). In `assets/css/style.css` every `<section>` is `position:absolute; top:140px; opacity:0`; `.section-show` reveals ONE section at a time. `assets/js/main.js` (lines ~60-138) toggles `.section-show`/`.active` on nav-link click and on load hash. Nav order != DOM order. This is why the page is tab-switch, not single-scroll. **Restructuring to single-scroll rewrites this CSS+JS model** (see Phase 3 risk assessment).
- `assets/js/projects.js` (`ProjectsManager`) fetches `/data/projects.json`, builds search/filter/pagination UI, default `activeCategories=['creative']` (hides most projects on load), renders 9/page, card has ONE combined Demo|GitHub button + icon-only GitHub. No detail modal. `createProjectCard()` is the card template. No concept of a "featured" project.
- `data/projects.json`: 59 GitHub-derived projects. Fields: name,title,description,github_url,demo_url(mostly ""),image(opengraph auto),languages[],technologies(string),categories[],creativity_score,stars,forks,last_updated,is_private,readme_status,unique_aspects,main_features. No featured flag, no real screenshot path.
- `data/skills.json`: 40+ categorized skills with levels. **Never rendered** — no JS reads it. Hardcoded progress bars live inline in `index.html` (#about > `.skills`).
- Testimonials: hardcoded Swiper HTML inside `#about` section. One slide has empty `<h4>`.
- No Hero-CTA, no CV link, no hero photo, no Certificates section, no footer.

## Delegation model
Every task below is scoped to **1-2 files** and is independently assignable to a sonnet builder subagent. Each task lists: Files, Action, Dependencies, Acceptance criteria. Do tasks in the stated order where a dependency is noted.

---

# PHASE 1 — High-impact correctness + content (do first, all independent unless noted)

### T1.1 Fix stale About facts
- Files: `index.html`
- Action: In `#about`, replace hardcoded `Age: 21` with correct current age (recompute; owner CV baseline — set to current value, do not leave `21`). Fix Awards counter (`.counts` last box) `data-purecounter-end="0"` and literal `0` — set to a real achievements count (>=7, matches Achievements list in T1.8) with label "Awards / Achievements". Remove ambiguous experience phrasing ("over two decades", ".6 years") in the Resume `Summary` block; state clear "3+ years professional experience".
- Dependencies: none.
- Acceptance: No literal `21` age; awards counter shows non-zero real number; no "two decades"/ambiguous wording remains.

### T1.2 Add Vendy Ltd current experience + convert bullets to quantified metrics
- Files: `index.html`
- Action: In `#resume` Professional Experience column, ADD as the FIRST (most recent) item: **Vendy Ltd — Software Engineering Specialist, Jan 2026 - Present, Dhaka**. Bullets: built/updated business Android apps; maintained CodeIgniter (bug fixes + features); deployed to VPS/cPanel; managed Odoo custom features + troubleshooting. Then REWRITE existing Onutiative + Fiverr bullets into quantified metric bullets:
  - Onutiative (Jr Software Developer, Jan 2023 - Jan 2024): legacy+modern Android VoIP integration (Java/Kotlin); PHP/CodeIgniter fixes; optimized SQL query for -92% load time; IoT Arduino/NodeMCU; automation -80% email reception time.
  - Fiverr & Others (Freelancer, Oct 2021 - Present): automation -90% manual effort; Python scripting; web scraping; Telegram bots -88% admin time; WordPress SEO sites.
- Add a small one-line role objective under each company header.
- Dependencies: none.
- Acceptance: Vendy appears first; each role has 3-4 metric bullets with numbers; dates/company present.

### T1.3 Remove the "outdated resume" warning banner
- Files: `index.html`
- Action: Delete the yellow warning `<p>` banner in `#resume` `.section-title` (the "This resume may be outdated" block). Keep cv.sabit.dev / resume.sabit.dev links but move them into a neutral inline note, not a warning.
- Dependencies: T1.2 (do after content is corrected so the banner is truly obsolete).
- Acceptance: No warning-styled banner; resume reads as current.

### T1.4 Add `featured` flagship projects to projects.json (SCHEMA CHANGE — do BEFORE T1.5)
- Files: `data/projects.json`
- Action: Add a boolean field `"featured": true` and `"featured_order": <n>` to new flagship entries, and ensure each has: `title`, `description`, real `image` path (placeholder path under `assets/img/projects/<slug>.jpg` — actual screenshots land in Phase 2), BOTH `demo_url` (live) and `github_url`, `technologies` (string), a NEW `tech_stack` array (full stack list), `unique_aspects` (what/why/for-whom/USPs prose), `main_features` (array), `categories`. Add these flagships (from CV/agency brief):
  1. Growth Your Business — growthyourbusiness.com — hybrid WordPress+React agency site; React19/TS/Tailwind v4/Framer Motion/WP REST/Gemini/Calendly; USPs: headless hybrid WP, 8 service pages, AI blog gen.
  2. JoinTeamHunt — jointeamhunt.com — hunting community platform; WP(BuddyBoss/WooCommerce) + custom React+NestJS/Prisma/Stripe/Socket.io, Mapbox team-units map across 11 US states.
  3. Rayyan Group — 3 web apps + portal; Python3.12/Django4.2/MySQL/Docker/Coolify; farm+feed-store+FMCG suites, QR receipts, role dashboards.
  4. Valcor Group — private security firm site; WP->static, Cloudflare Pages+Turnstile, guard-pin satellite map.
  5. AI Email->Notion Triage Agent — Gmail Pub/Sub, Gemini, prompt-injection-safe.
  6. WhatsApp Message Summarizer — daily Gemini multimodal summary.
  7. Upwork Cover Letter Gen — FastAPI+FlareSolverr+Gemini.
- Set `featured_order` 1..7 in the order above. Existing 59 GitHub projects: leave as-is but they get `featured:false` implicitly (renderer treats missing as false).
- Dependencies: none, but MUST land before T1.5.
- Acceptance: JSON valid (parse check); 7 new entries with featured=true, both URLs, tech_stack array, unique_aspects, main_features.

### T1.5 Render featured projects first + add detail modal in projects.js (depends on T1.4)
- Files: `assets/js/projects.js`, `assets/css/projects-custom.css`
- Action: (a) Change default `activeCategories` from `['creative']` to `[]` so projects are visible on load. (b) Add a "Featured" band at top: render `featured===true` projects (sorted by `featured_order`) in a 3-per-row grid ABOVE the search/filter/paginated grid; featured cards excluded from the paginated list. (c) Add a `showProjectDetail(project)` method that opens a Bootstrap modal (bootstrap.bundle already loaded) showing: title, real image, what/why/for-whom (`unique_aspects`), USPs, full `tech_stack`, `main_features`, and direct **Live** + **GitHub** buttons. (d) Make each card (featured and normal) clickable to open the modal; keep the direct Live/GitHub buttons on the card too. (e) Split the single combined button into TWO explicit buttons (Live Demo when demo_url present; GitHub always) per the video rule.
- Dependencies: T1.4 (schema fields).
- Acceptance: On load, projects visible (not hidden by 'creative'); 7 featured cards appear first in multiples of 3; clicking a card opens a modal with full detail + both links; cards with demo_url show a distinct Live button.

### T1.6 Render skills.json as an icon grid (replaces hardcoded progress bars)
- Files: `index.html`, new `assets/js/skills.js` (add `<script>` include near projects.js in index.html)
- Action: Remove the hardcoded `.skills` progress-bar block in `#about`. Add an empty `#skills-grid` container. Create `assets/js/skills.js` that fetches `/data/skills.json`, renders each category as a heading + a grid of big clear tech ICONS with labels (use existing icon fonts: boxicons `bx bxl-*`, remixicon, bootstrap-icons; map skill name -> icon class, fallback to a generic chip). Optionally show proficiency level as a small bar/percentage under each icon. Prioritize modern tech (Python, TS/JS, React, FastAPI, Django, Node/NestJS, Tailwind, Docker, Cloudflare, n8n, Make.com, Selenium/Playwright, Telegram Bots, etc.).
- Note: `data/skills.json` may need a few added modern entries (n8n, Make.com, NestJS, Playwright, DrissionPage, PostgreSQL/MongoDB, GitHub Actions, Flutter/Android, Gemini/AI) — if so, that JSON edit is part of this task (2 files: index.html + skills.js; skills.json edit allowed as a same-scope data touch, or split to T1.6b if preferred).
- Dependencies: none.
- Acceptance: No hardcoded progress bars remain; icon grid renders from JSON; modern stack visible with icons; page still loads if fetch fails (graceful empty).

### T1.7 Add Certificates section (JSON-driven)
- Files: new `data/certificates.json`, `index.html` (new `#certificates` section + nav link + `<script>` include), new `assets/js/certificates.js`
- Action: Create `data/certificates.json` with entries (title, issuer, date, credential/verify URL):
  - Fundamentals of DevOps — KodeKloud — Sep 2024 — learn.kodekloud.com/certificate/0af0dc58-48b1-4dbd-98be-bc5e3b998292
  - GitHub Foundations — Apr 2024 — credly.com/badges/cf422c86-caa2-4751-abef-e139e3e2e6a2
  - Full Stack Web Dev (Python+JS) — Bohubrihi — Mar 2024
  - Google Cybersecurity — Coursera — Jun 2023 — credly.com/badges/6e53363d-2089-4834-bb44-a1f45322d581
  - Android App Dev — NACTAR — Dec 2020
  Add `#certificates` section (card grid, each card = title, issuer, date, "Verify" button linking credential URL). `certificates.js` fetches + renders. Add nav link.
- Dependencies: none (but coordinate nav/section-show wiring — see T1.8/Phase 2 nav note).
- Acceptance: `#certificates` renders cards from JSON; verify buttons link to real credential URLs; section reachable from nav.

### T1.8 Add Achievements block (part of Certificates section or its own sub-block)
- Files: `data/certificates.json` (add `achievements` array) OR `index.html`, `assets/js/certificates.js`
- Action: Add achievements list: ICPC Asia Dhaka Regional 2024; CyberRaid CTF 2025 (7th prelim / 22nd final, Bangladesh Army); BUET CTF 2024 (22nd); EWU NRF24 CTF (10th); Zelf Hackathon 2.0 2024 (3rd, Data Scraping); Phoenix Summit CTF 2024 (10th); MIST LeetCon 2023 (finalist). Render as a compact list under Certificates. This count feeds the Awards counter in T1.1.
- Dependencies: T1.7 (shares section + renderer). Coordinate count with T1.1.
- Acceptance: 7 achievements listed; count matches Awards counter.

### T1.9 Hero CTAs + hero photo
- Files: `index.html`, `assets/css/style.css`
- Action: In `#header` hero, add: a professional personal photo (`assets/img/me.jpg` already exists — reuse or add hero-specific), a **"Get in Touch"** button (links to `#contact`, using existing scrollto nav behavior), and a **CV download/view** button (links to cv.sabit.dev or a hosted PDF). Style buttons in style.css to fit the dark hero. Ensure buttons use the same nav-link `.scrollto`/hash mechanism so section-show still works.
- Dependencies: none.
- Acceptance: Hero shows photo + two working buttons; "Get in Touch" navigates to contact; CV button opens CV.

### T1.10 Contact: add WhatsApp + correct phone/socials
- Files: `index.html`
- Action: In `#contact`, add a WhatsApp link/box (+8801686261785). Update phone to +8801686261785 (and/or keep +880 9696-761785 if both valid — confirm; CV says +8801686261785). Keep email contact@sabit.dev, address Dhaka. Ensure "Contact Me" wording (experienced tone). Add missing socials if any (LinkedIn linkedin.com/in/mdsarwarjahan-sabit, GitHub github.com/ms-jahan, Fiverr, Upwork, agency vxlnce.com). Do NOT touch the form or custom.js.
- Dependencies: none.
- Acceptance: WhatsApp click-to-chat link present; phone consistent; form untouched and still functional.

### T1.11 Add Footer
- Files: `index.html`, `assets/css/style.css`
- Action: Add a `<footer>` after the last section with: name, copyright year, quick nav links, socials, "Built by" credit. Style minimally for dark theme. Because sections are absolute-positioned in SPA mode, footer must render at page bottom in a way that works with current layout (fixed/relative footer under the section container) — verify it does not overlap the fixed hero.
- Dependencies: none (layout caveat: revisit in Phase 3 if single-scroll adopted).
- Acceptance: Footer visible; socials + copyright present; no overlap with hero/sections.

### T1.12 Fix Services (unique icons + real offerings, remove empty hrefs)
- Files: `index.html`
- Action: In `#services`, give the last 4 boxes (currently all `bx-arch`) unique icons. Replace empty `href=""` with `#contact` or remove the anchor. Tighten copy to real, current offerings (web dev, automation/n8n/Make, web scraping, WordPress, Android, Telegram bots, DevOps/deployment, AI agents).
- Dependencies: none.
- Acceptance: No duplicate `bx-arch`; no empty hrefs; offerings match current skill set.

### T1.13 Reviews cleanup (fix empty h4, keep Swiper)
- Files: `index.html`
- Action: Fill the empty `<h4></h4>` in the design17 testimonial slide (e.g. role/company or remove the tag). Keep hardcoded Swiper for now (dynamic JSON version is Phase 2).
- Dependencies: none.
- Acceptance: No empty `<h4>` in testimonials.

**Phase 1 nav/section-show note:** Any NEW section (`#certificates`) and new nav links must be wired into the SPA `.section-show` mechanism in `assets/js/main.js` (it queries `select('section', true)` generically, so a new `<section id="certificates">` with a matching `#certificates` nav link should work automatically — verify the nav link has `.nav-link` and the hash matches). Reorder nav toward target order (Hero->About->Experience->Projects->Services->Reviews->Contact) as a small same-file edit in `index.html`.

---

# PHASE 2 — Media, polish, dynamic content

### T2.1 Real project screenshots
- Files: `assets/img/projects/*` (add image assets), `data/projects.json` (point `image` to real paths)
- Action: Add real screenshots for the 7 flagships + top recent GitHub projects; update `image` fields from opengraph auto-images to local screenshots. (Image acquisition is a content task; JSON path update is the code touch.)
- Dependencies: T1.4/T1.5.
- Acceptance: Featured cards show real screenshots, not GitHub auto-cards.

### T2.2 Curate "recent/top only" projects + "More Projects" button
- Files: `data/projects.json` (add `show_on_home` flag) OR `assets/js/projects.js` (filter to top-N by stars/recency)
- Action: Limit homepage grid to recent/top projects (e.g., featured + top 6 by stars/last_updated). Convert the inline "More projects at my-projects-so-far.sabit.dev" text into a styled **"More Projects" button**.
- Dependencies: T1.5.
- Acceptance: Homepage shows curated multiples (3/6) + a real button.

### T2.3 Dynamic testimonials from JSON
- Files: new `data/testimonials.json`, `assets/js/testimonials.js`, `index.html`
- Action: Move the hardcoded testimonials into `data/testimonials.json`; render Swiper slides from JSON. Preserve existing Swiper init in main.js (re-init after inject if needed).
- Dependencies: T1.13.
- Acceptance: Testimonials render from JSON; Swiper still auto-plays.

### T2.4 Minor design/contrast/responsive pass
- Files: `assets/css/style.css`, `assets/css/projects-custom.css`
- Action: Verify text contrast on dark bg for new sections (skills grid, certificates, footer, modal), check mobile responsiveness of icon grid + modal + featured cards.
- Dependencies: Phase 1 done.
- Acceptance: No low-contrast text; sections responsive at 375px/768px/1440px.

---

# PHASE 3 — Single-scroll restructure (RISK-ASSESSED — recommendation below)

### Risk assessment
The template's identity is the SPA reveal: `#header{position:fixed;height:100vh}` hero + every `section{position:absolute;top:140px;opacity:0}` revealed one-at-a-time via `.section-show` toggled in `assets/js/main.js`. Converting to true single-scroll (all sections stacked, natural document flow, scroll-spy nav) requires:
- Rewriting `section` / `section.section-show` rules (remove absolute/opacity, use normal flow) in `style.css`.
- Removing/replacing the show/hide click + on-load-hash logic in `main.js` with scroll-spy nav highlighting + smooth-scroll anchors.
- Un-fixing the hero so content scrolls past it (or making hero the first in-flow block).
- Re-testing AOS animations, Swiper, projects modal, mobile nav, and the footer overlap.
This touches the two most load-bearing files (style.css sections block + main.js nav engine) simultaneously and can break every section at once. High blast radius, hard to do as an isolated 1-2 file subagent task.

### Recommendation
**Do NOT do a full single-scroll rewrite in the first pass.** Instead:
- Ship Phases 1-2 on the existing SPA engine (all video content requirements are satisfiable within SPA: sections, hero CTAs, skills grid, certificates, footer, modal all work as tab-panes).
- **Reorder the nav + DOM to the target order** (Hero->About->Experience->Projects->Services->Reviews->Contact->Footer) as a low-risk `index.html`-only edit so information architecture matches the video.
- Treat single-scroll as an OPTIONAL Phase 3, done on a throwaway branch off gh-pages, one section-group at a time, with visual verification after each. If it destabilizes, revert — the SPA already meets the guidelines.

### T3.1 (optional) Single-scroll conversion — CSS
- Files: `assets/css/style.css` — rewrite `section` + `.section-show` to natural flow; un-fix hero.
- Acceptance: All sections stack and scroll; hero scrolls away.

### T3.2 (optional) Single-scroll conversion — JS
- Files: `assets/js/main.js` — replace show/hide with scroll-spy + smooth anchors.
- Dependencies: T3.1.
- Acceptance: Nav highlights active section on scroll; all anchors smooth-scroll; projects modal/Swiper/AOS still work.

---

# PHASE 4 (optional) — Security hardening
- The contact form uses an obfuscated client-side Telegram bot token (`assets/js/custom.js` + the `eval`-packed phone-home script in `index.html` <head>). Per constraint #2 the form stays. Optional later: note that the bot token is exposed client-side (inherent to static host); document risk, consider a serverless proxy (Cloudflare Worker) ONLY if the user later lifts the "keep as-is" constraint. Also review the `eval`-packed script block in `<head>` (it exfiltrates visitor IP/UA to Telegram) — flag for owner review; do not silently remove.
- Acceptance: Risk documented; no change unless user approves.

---

## Suggested execution order (dependencies only)
1. T1.4 (projects schema) -> then T1.5 (projects render/modal).
2. T1.2 (experience content) -> then T1.3 (remove banner).
3. T1.7 -> T1.8 (certificates + achievements) -> feeds T1.1 awards count.
4. All other Phase 1 tasks (T1.1, T1.6, T1.9, T1.10, T1.11, T1.12, T1.13, nav reorder) are independent — parallelizable across subagents.
5. Phase 2 after Phase 1. Phase 3 optional/last. Phase 4 documentation-only unless approved.

## Global acceptance (video guideline coverage)
Hero (photo+CTA+CV) ✓T1.9 | About (real wording/photo) ✓T1.1 | Experience pos-3 w/ metrics ✓T1.2 | Skills icon grid ✓T1.6 | Projects real+modal+Live/GitHub+More button ✓T1.5/T2.1/T2.2 | Services unique icons ✓T1.12 | Certificates+verify ✓T1.7 | Reviews (dynamic) ✓T1.13/T2.3 | Contact email/phone/WhatsApp/socials/form ✓T1.10 | Footer ✓T1.11 | Functional form KEPT ✓ | Static-only ✓.
