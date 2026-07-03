# VPAT Draft 📋

A guided wizard for drafting a VPAT (Voluntary Product Accessibility
Template) / Accessibility Conformance Report against **WCAG 2.2 Level A and
AA** — all 55 real success criteria, each with a plain-English explanation,
a conformance-level picker, and a remarks field.

▶️ **Try it:** https://emin-dev.github.io/vpat-draft/

## What this is (and isn't)

**This is a drafting accelerator, not a compliance guarantee.** It
structures your self-reported answers into a standard VPAT-style document.
It does not test your product, verify your answers, or provide legal
certification. Say so plainly, because pretending otherwise would be
dishonest about what a form can actually do.

## How it works

1. Fill in product/vendor info (standard VPAT front matter).
2. Walk through all 55 WCAG 2.2 A/AA criteria, grouped by the four
   principles (Perceivable, Operable, Understandable, Robust) — one section
   per step, each criterion with a plain-English explanation so you don't
   need to already know WCAG jargon.
3. Preview the generated report for free (watermarked).
4. Pay once to export the clean, downloadable file.

## Monetization

**No ads.** One-time **BUY** — $49 to export the clean report (the free
preview stays watermarked but fully readable, so you can evaluate the whole
report before paying). Payment is **sandbox/test mode only** — no real
payment provider is connected. See the Studio hub's `RULES.md`.

## Tech

Vanilla JS ES modules, zero dependencies, no build step, static hosting.

```
index.html      — the wizard UI
style.css       — styling (note: every `hidden`-toggled class has an
                  explicit `[hidden]` CSS override — see the comment in
                  style.css for why that matters)
js/criteria.js  — the real WCAG 2.2 Level A/AA data (the actual product)
js/state.js     — wizard state + localStorage persistence
js/report.js    — pure function: state -> formatted HTML report
js/checkout.js  — sandboxed Luhn-validated payment logic
js/main.js      — wires it all to the UI
test/           — Node tests for report/checkout/state logic (run with
                  `node test/<name>.test.mjs`)
```

Made by Emin. Part of [Studio](https://emin-dev.github.io/Studio/).
