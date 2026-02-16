# Brainstorm: Fix Excessive Scrolling on ms-jahan.github.io

## Goal
Fix the excessive scrolling bug on ms-jahan.github.io where scrolling past the bottom of any section (notably homepage and contact) reveals empty space below the content, making the bottom content appear unreachable.

## Constraints
- Static GitHub Pages site (HTML/CSS/JS only)
- Uses a BootstrapMade "Personal" template with a single-page architecture
- Sections toggle via `position: absolute` + `section-show` class
- Must not break the section-switching animation or navigation

## Known context
After analyzing the code, the **root cause** is in `assets/css/projects-custom.css` (lines 4–9):

```css
.projects {
  padding: 60px 0;
  background: #040404;
  min-height: 100vh;
  position: relative;  /* ← overrides section's position: absolute */
}
```

The template's `style.css` hides inactive sections using `position: absolute; bottom: 100%; opacity: 0;`. But the `.projects` class selector (specificity `0,1,0`) **overrides** the `section` element selector (specificity `0,0,1`) and sets `position: relative`. This puts the Projects `<section>` **back into normal document flow** at all times. Combined with `min-height: 100vh`, it creates a phantom block of at least **100vh of invisible space** in the document, regardless of which section is active.

The result:
- **Homepage**: body height = header (100vh) + projects phantom (100vh) = ~200vh of scrollable area, but only 100vh of actual content.
- **Any section view**: header is fixed (out of flow), but the projects section still occupies 100vh in flow, creating empty scrollable space below the visible section's content.

## Risks
1. **Low**: Removing `position: relative` from `.projects` might affect z-stacking within the projects section, but since the parent `section` is already `position: absolute`, project cards should still render correctly.
2. **Low**: Removing `min-height: 100vh` could affect the look of the Projects section when it's the active section, but its content should define sufficient height naturally.

## Options (3)

### Option A: Remove conflicting properties from `.projects`
Remove `position: relative` and `min-height: 100vh` from `.projects` in `projects-custom.css`. This lets the template's `section` rules manage positioning as intended.

### Option B: Increase specificity of `.projects` to sync with template
Use `section.projects` selector and only apply project-specific visual styles, not positioning overrides.

### Option C: Use `!important` on `section` positioning
Force `section { position: absolute !important; }` in `style.css` to prevent any class from overriding it. Heavier-handed and not recommended.

## Recommendation
**Option A** — Simply remove the `position: relative` and `min-height: 100vh` declarations from `.projects` in `projects-custom.css`. These two properties are the direct cause of the phantom scrollable space. The projects section will still display correctly when shown because `section.section-show` sets `top: 100px; bottom: auto;` and the content height will size the section naturally.

## Acceptance criteria
1. On the homepage (no section active), scrolling does **not** extend beyond the header area (~100vh).
2. On the Contact section, scrolling ends at the bottom of the contact form — no empty space below.
3. The Projects section still looks correct when navigated to (cards display properly, no clipping).
4. Section switching animations continue to work normally.
5. All other sections (About, Resume, Services) remain unaffected.
