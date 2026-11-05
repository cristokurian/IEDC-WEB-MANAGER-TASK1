# IEDC IDEA SPRINT 2026

> A 24-hour student ideathon event microsite by **IEDC BOOTCAMP CEC**, College of Engineering Chengannur.

Built as part of the **IEDC BOOTCAMP CEC Web Manager Selection Task**.

![IEDC IDEA SPRINT 2026](https://img.shields.io/badge/IEDC-IDEA%20SPRINT%202026-171717?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Build Status](https://img.shields.io/badge/Build-Passing-16A34A?style=flat)

---

## 1. Project Overview

**IEDC Idea Sprint 2026** is a production-quality, responsive single-page event microsite for a 24-hour student ideathon hosted by **IEDC BOOTCAMP CEC** (Innovation and Entrepreneurship Development Cell at College of Engineering Chengannur).

The website embodies a **Swiss-inspired minimal premium editorial aesthetic**:
- Generous whitespace, asymmetric grid structure, and refined border dividers.
- Strong typography hierarchy using **Space Grotesk** for display headlines and **Inter** for crisp body text.
- High-contrast charcoal (`#171717`) and warm off-white (`#F7F7F2`) foundation accented by IEDC blue (`#2563EB`).
- Complete accessibility compliance (`prefers-reduced-motion` fallbacks, keyboard navigation, visible focus indicators, and WCAG AA contrast ratios).
- Zero-dependency client-side routing supporting both the main landing page (`/`) and a dedicated registration view (`/register`).

---

## 2. Main Features

- ⏱️ **Live Countdown Timer** — Auto-updating clock tracking the confirmed 24-hour event window (Nov 14, 2026 10:00 AM IST to Nov 15, 2026 10:00 AM IST) with real-time status transitions (`upcoming`, `live`, `ended`).
- 🧭 **Interactive Team Finder** — A 5-question builder identity discovery quiz recommending one of five distinct roles:
  - 🔨 **The Builder** (Development & Prototyping)
  - 🎨 **The Designer** (User Experience & Visual Problem Solving)
  - 🧭 **The Strategist** (Business Reasoning & Direction)
  - 🔎 **The Researcher** (Problem Discovery & Validation)
  - 🎤 **The Presenter** (Storytelling, Pitching & Communication)
  - Features transparent deterministic scoring, keyboard navigation, strengths summary, and complementary role pairings.
- 📋 **Frontend-Validated Registration (`/register`)** — Full form validation covering name, email (RFC-compliant regex), mobile number (10-digit Indian mobile format with `+91`/`0` prefixes), college, department, and year of study. Includes an interactive confirmation screen and explicit demo disclosures.
- 📅 **Two-Day Interactive Schedule** — Segmented timeline spanning the 24-hour duration with keyboard-operable tabs (`ArrowLeft`/`ArrowRight`), animated day transitions, and Lucide status icons.
- 🔄 **Animated Idea Ticker** — CSS-driven marquee displaying core IEDC builder mantras with full graceful degradation for users with reduced motion preferences.
- 🚀 **Event Journey & Ecosystem** — 5-stage progression from Problem to Pitch, accompanied by the official IEDC BOOTCAMP CEC identity and Volt mascot's builder philosophy (*"Always ship over hype. Tangible MVPs win arguments."*).
- 📱 **Mobile-First Responsive Design** — Pixel-perfect layouts tested across 360px, 390px, 768px, 1024px, and 1440px+ viewports with a focus-trapped mobile drawer navigation.

---

## 3. Technologies Used

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | Component-based UI library |
| **Vite** | `^6.0.5` | Fast ESM build tool and development server |
| **Tailwind CSS** | `^4.1.7` | Utility-first styling engine (`@tailwindcss/vite`) |
| **Framer Motion** | `^11.15.0` | Declarative animations and transition states |
| **Lucide React** | `^0.468.0` | Accessible, clean SVG iconography |
| **ESLint** | `^10.14.0` | Code quality and React Hooks linting (`eslint.config.js`) |
| **Node.js** | `>=18.0.0` | JavaScript runtime environment |

---

## 4. Local Development Instructions

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone <repository-url>

# Navigate into project directory
cd iedc-idea-sprint

# Install dependencies
npm install
```

### Running the Development Server

Start Vite's local development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 5. Build & Verification Instructions

### Production Build

Compile and bundle the project for production:

```bash
npm run build
```

The optimized static assets will be output to the `dist/` directory with vendor code splitting.

### Previewing the Production Build

Test the production build locally:

```bash
npm run preview
```

The preview server will be accessible at `http://localhost:4173`.

### Code Quality & Automated Tests

Run code linting and the automated validation test suite:

```bash
# Run ESLint checks
npm run lint

# Run unit tests (tests event math, 24h duration, validation regex, and quiz scoring)
node test-validation.mjs
```

---

## 6. Project Structure

```
iedc-idea-sprint/
├── public/
│   ├── favicon.svg                     # Custom SVG badge icon
│   └── robots.txt                      # Search crawler indexing rules
├── src/
│   ├── components/
│   │   ├── About.jsx                   # Problem-first ideathon philosophy
│   │   ├── AboutIEDC.jsx               # IEDC ecosystem & Volt builder quote
│   │   ├── BrandStrip.jsx              # High-contrast innovation banner
│   │   ├── EventJourney.jsx            # 5-stage progression (Problem to Pitch)
│   │   ├── Footer.jsx                  # Social links, contact, & copyright
│   │   ├── Hero.jsx                    # Constellation SVG & live countdown
│   │   ├── IdeaTicker.jsx              # CSS marquee builder ticker
│   │   ├── Navbar.jsx                  # Sticky nav & mobile drawer
│   │   ├── Pillars.jsx                 # 01 Ideate, 02 Build, 03 Launch
│   │   ├── Registration.jsx            # Validated registration form & success state
│   │   ├── Schedule.jsx                # Two-day interactive timeline
│   │   └── TeamFinder.jsx              # Multi-step role discovery quiz
│   ├── data/
│   │   ├── eventConfig.js              # Centralized event dates, IST math, & host info
│   │   ├── quizData.js                 # Questions, 5 roles, traits, & snapshot choices
│   │   └── scheduleData.js             # Two-day timeline events (24-hour total)
│   ├── hooks/
│   │   └── useCountdown.js             # IST countdown hook (upcoming, live, ended)
│   ├── utils/
│   │   ├── quizScoring.js              # Deterministic scoring & tie-break logic
│   │   ├── scroll.js                   # Reduced-motion-aware smooth scrolling
│   │   └── validation.js               # Form field validation & regex rules
│   ├── App.jsx                         # Path routing (/ and /register) & lazy Suspense
│   ├── index.css                       # Global styles, Tailwind v4 theme, & animations
│   └── main.jsx                        # React 18 mount entry
├── .gitignore                          # Excludes node_modules, dist, env, & logs
├── eslint.config.js                    # ESLint 10 configuration
├── index.html                          # HTML shell with Google Fonts & OG meta
├── package.json                        # Dependencies and NPM scripts
├── test-validation.mjs                 # 22 automated unit test assertions
├── vercel.json                         # Vercel SPA rewrite configuration
└── vite.config.js                      # Vite + Tailwind v4 + manual chunk configuration
```

---

## 7. Deployment Configuration

### Vercel Deployment

The project includes `vercel.json` preconfigured with single-page application (SPA) rewrites to guarantee both `/` and `/register` function on direct load and refresh:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Steps to Deploy:
1. Push the project to GitHub.
2. Import the repository on [Vercel](https://vercel.com).
3. Select framework preset: **Vite**.
4. Set Build Command: `npm run build`.
5. Set Output Directory: `dist`.
6. Click **Deploy**.

---

## 8. Configuration & Customization

- **Event Dates:** To update event dates or duration, edit `EVENT_START_DATE` and `EVENT_END_DATE` in `src/data/eventConfig.js`. The countdown timer, duration text, and date formatting dynamically update across the site.
- **Agenda / Schedule:** Modify individual milestones, times, and icons in `src/data/scheduleData.js`.
- **Contact & Socials:** Update the `host` object in `src/data/eventConfig.js` to change the official website, email, Instagram, or LinkedIn destinations.

---

## 9. Important Notes

- **Frontend-Only Demonstration:** The registration flow validates in-browser only. Form submissions are not transmitted to a backend or persisted in storage.
- **Illustrative Schedule:** The 24-hour event window is confirmed; individual agenda session timings are illustrative and for demonstration purposes.
- **Official References:** Verified branding, motto (*"Experiment. Validate. Ship. Repeat."*), mascot (*Volt*), and social links directly reference [iedcbootcampcec.org](https://www.iedcbootcampcec.org).

---

## License

Built for the **IEDC BOOTCAMP CEC Web Manager Selection Task**.  
© 2026 IEDC BOOTCAMP CEC. All rights reserved.
