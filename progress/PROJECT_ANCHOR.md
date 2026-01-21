# PROJECT ANCHOR: Winterfall

**Project:** Winterfall
**Theme:** Industrial Sci-fi / Arknights: Endfield Aesthetic
**Stack:** Next.js, Tailwind CSS, GSAP, React

---

## 📅 Project History & Milestones

### [Progress 1]: Industrial Sci-fi Loader Implementation
**Date:** 2026-01-21
**Status:** Completed

#### Features Implemented
- **Loading Screen (`EndfieldLoader.tsx`)**
    - **Visuals:** Dark theme, grainy texture, foggy glass background (`loadbackground.jpeg`), blue accents (`#77BEF0`).
    - **Decorations:** Tilted snowflake (`snowflake.png`) centered behind "WINTERFALL" logo.
    - **Animations:** Synchronized fade-in for text/logo; "Wipe" exit transition (Blue overlay Left-to-Right).
- **Architecture:**
    - `ClientLayout.tsx` handling loading state.
    - Integrated into Root Layout.
- **Assets:** Values stored in `public/decoration/`.

#### Tech Stack Updates
- **Tailwind:** Added `brandBlue: "#77BEF0"`.
- **GSAP:** Installed and configured for animations.

---

## 📂 Current Project Structure Notes
- **Loader:** Fixed overlay `z-[9999]`.
- **Assets:** `public/decoration/` contains Key Visuals.
- **Git:** `.gitignore` configured for Next.js.

## 📝 Next Steps / Backlog
- [ ] (Future implementation steps...)
