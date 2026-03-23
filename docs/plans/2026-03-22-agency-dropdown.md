# Agency Social Icons Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the agency dropdown with two always-visible separate agency-related icons in the homepage header and contact section.

**Architecture:** Update the duplicated social-link markup in `index.html` so both locations render direct links for `Agency Website` and `Upwork Agency`. Simplify `assets/css/style.css` by removing dropdown-specific rules while keeping icon rows responsive, and delete the dropdown interaction code from `assets/js/main.js` because the UI no longer needs stateful behavior.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript

---
