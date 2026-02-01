Personal Portfolio
===================

Overview
--------
This repository contains Bharadwaj Karthikeya's personal portfolio website. It highlights UX/UI case studies, development projects, and game design work, while providing background details and contact options.

Structure
---------
- index.html — Landing page with hero, highlights, and featured projects.
- about.html — Extended biography and skills context.
- projects.html — Scrollable galleries for UX/UI, development, and game projects.
- contact.html — Direct contact information and a themed form.
- style.css — Global styles, including light/dark theme tokens, layout primitives, and component definitions.
- script.js — Theme toggle persistence, contact form validation, and carousel scrolling helpers.
- media/ — Supporting imagery and logos.

Local Preview
-------------
 Open `https://bharadwaj-karthikeya.github.io/Portfolio` in the browser.

Notes
-----
- The design tokens in `:root` keep spacing and colors consistent—prefer editing those before scattering new literals.
- All pixel measurements were converted to `rem` units for better scalability.
- Scroll strips rely on the helper in `script.js`; be sure to add the `scroll-shell` structure when introducing new carousels.
