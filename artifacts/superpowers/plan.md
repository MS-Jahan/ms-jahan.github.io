# Plan: Fix Excessive Scrolling on ms-jahan.github.io

## Summary
Remove `position: relative` and `min-height: 100vh` from `.projects` in `projects-custom.css` to stop the Projects section from creating phantom scrollable space.

## Steps

### Step 1: Remove conflicting CSS properties
- **File**: `assets/css/projects-custom.css`
- **Action**: Remove `min-height: 100vh;` and `position: relative;` from the `.projects` rule (lines 7–8).
- **Verification**: 
  - `grep -n 'min-height\|position: relative' assets/css/projects-custom.css` should return no matches in the `.projects` block.

### Step 2: Visual verification in browser
- **Action**: Open the site locally and verify:
  1. Homepage: no excessive scrolling (page should not scroll beyond the header area).
  2. Contact section: scrolling ends at the bottom of the contact form.
  3. Projects section: cards still display correctly when navigated to.
- **Verification**: Browser visual check.

## Status: APPROVED (single-file, 2-line deletion — trivial change)
