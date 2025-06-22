# AnswerAI Assessment 🚀

This repo contains a React + TypeScript application built as part of the AnswerAI frontend assessment. It features interactive charts, variable selection panels, KPI dashboards, and Firebase authentication.

---

## Table of Contents

1. [⚙️ Tech Stack](#️-tech-stack)
2. [🛠 Features](#-features)
3. [🚀 Setup & Local Development](#-setup--local-development)
4. [🧠 Technical Decisions & Trade-offs](#-technical-decisions--trade-offs)
5. [⚠️ Known Limitations](#-known-limitations)
6. [⏱ Time Spent](#-time-spent)

---

## ⚙️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS  
- **Routing**: React Router v6  
- **Authentication**: Firebase Authentication (Google OAuth)  
- **Charts**: Custom SVG-based line chart  
- **Tooling**: Vite, ESLint, Prettier, TypeScript  

---

## 🛠 Features

- ✅ Responsive layout with desktop-first design
- ✅ Interactive line chart with:
  - Data points
  - Smooth paths and hover interactions
  - Vertical dashed indicator lines
  - Interpolated vertical bars between points
- ✅ Firebase Google Auth integration
- ✅ Slide-over variable selector with toggle tags
- ✅ KPI section for quick metrics
- ✅ Clean component architecture with separation of concerns
- ✅ Accessibility: ARIA support, keyboard focus, outline, alt labels

---

## 🚀 Setup & Local Development

### 1. Clone the repository

```bash
git clone https://github.com/saifullah114-hub/answerAi-assessment.git
cd answerAi-assessment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Replace Keys in `.env` file

Copy keys provided in email:


### 4. Run the app locally

```bash
npm run dev
```

Then open `http://localhost:3000`

### 5. Build for production

```bash
npm run build
```

---

## 🧠 Technical Decisions & Trade-offs

- **Tailwind CSS**: Speeds up development with consistent styling.
- **Custom chart logic**: Allows more control over visuals compared to using Chart.js or Recharts.
- **Firebase Auth**: Quick and scalable for sign-in; no backend logic required.
- **Component separation**: Reusable UI (Button, Tag, Tooltip) vs page-specific components (Chart, VariablePanel).

---

## ⚠️ Known Limitations

- ❌ No testing suite (Jest, RTL) due to limited time.
- ❌ Auth is not protected via routes.
- ❌ Mobile styles work but need polish (e.g., slide-over tightness).
- ❌ Global error and loading state handling is minimal.
- ❌ No persistence of state across refresh.

---

## ⏱ Time Spent

| Task                           | Time |
| ----------------------------- | ---- |
| Initial setup + Tailwind      | ~1h  |
| Chart + hover logic           | ~1.5h  |
| Firebase auth + routing       | ~1h  |
| Variable panel UI             | ~1.5h  |
| Final polish + README         | ~1h  |
| **Total**                     | **~6h** |

---

## ✨ Future Improvements

- [ ] Route protection for auth-only pages
- [ ] Unit + integration tests
- [ ] Data API integration for real metrics
- [ ] Firebase Firestore or Supabase for persistence
- [ ] Animate chart transitions

---

Thanks for reviewing this project!
Feel free to reach out if you have questions or feedback 🙌
