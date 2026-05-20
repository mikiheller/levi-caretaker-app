# Levi's App

A mobile-first Progressive Web App that helps the people who care for Levi:

- **Pick an activity** when they're not sure what to do, with a step-by-step lesson plan
- **Quickly log** what happened — mood, potty trips, accidents, new behaviors
- **Track developmental progress** over time, sampling skills at Levi's edge of competence
- **All bottom-tab navigation**, designed to feel like a native app on the home screen

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4**
- **TypeScript**
- **Vercel** for hosting (planned)
- **Postgres + Vercel Blob** for data and media (planned, later phase)
- **OpenAI Whisper** for voice transcription (planned, later phase)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project status

This is **Phase 1**: the app shell — bottom tab bar, caretaker picker, PWA-ready, placeholder pages.

Coming next:

- Phase 2: Activities (cards, lesson plans, timer, post-activity survey)
- Phase 3: Mood tracker
- Phase 4: Potty tracker
- Phase 5: New behavior tracker (with photo/video and Whisper)
- Phase 6: Developmental tracker (ABAS-3 based, adaptive)
- Phase 7: Homepage polish (to-dos, recent activity)

## Add to home screen

Once deployed, open the site on your phone, tap the share icon, and choose "Add to Home Screen." It will install like a native app with no browser chrome.
