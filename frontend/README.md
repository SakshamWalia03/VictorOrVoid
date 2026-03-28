# ⚔ VictorOrVoid — Frontend

A high-stakes AI negotiation game. Face **Victor**, a cold calculating AI broker. Make your best deal across 8 rounds — or walk away with nothing.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 |
| State | React Context + useReducer |
| HTTP | Axios |
| Icons | Lucide React |
| Animations | CSS keyframes + Tailwind |
| Theme | Dark / Light (CSS variables + Tailwind `darkMode: 'class'`) |

---

## Project Structure

```
src/
├── game/
│   ├── ui/               # All game screen components
│   │   ├── LandingPage.jsx
│   │   ├── GameScreen.jsx
│   │   ├── ResultScreen.jsx
│   │   ├── LeaderboardPage.jsx
│   │   ├── ChatBubble.jsx
│   │   ├── TypingIndicator.jsx
│   │   ├── NegotiationInput.jsx
│   │   ├── ProductCard.jsx
│   │   ├── RoundProgress.jsx
│   │   ├── VictorAvatar.jsx
│   │   └── LeaderboardTable.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useGameSession.js
│   │   └── useLeaderboard.js
│   └── services/         # API layer
│       ├── api.js         # Axios instance + interceptors
│       ├── gameService.js
│       └── leaderboardService.js
├── context/
│   ├── ThemeContext.jsx   # Dark/light mode
│   └── GameContext.jsx    # Global game state
├── components/
│   ├── Navbar.jsx
│   └── ThemeToggle.jsx
├── App.jsx
├── main.jsx
└── index.css             # Tailwind + custom design tokens
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Backend running (see backend repo)

### Install & Run

```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Edit .env — set your backend URL
VITE_API_URL=http://localhost:5000

# Start dev server
npm run dev
```

App runs at `http://localhost:3000`

### Build

```bash
npm run build
npm run preview
```

---

## Backend API

The frontend connects to these endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/game/start` | Start a new session |
| `POST` | `/api/game/negotiate` | Send an offer / message |
| `GET` | `/api/leaderboard` | Get top 20 |
| `GET` | `/api/leaderboard/top/:n` | Get top N |
| `GET` | `/api/leaderboard/rank/:name` | Get player rank |

---

## Design System

### Colors
- **Victor** (orange) — `#ff7520` — Victor's theme
- **Void** (purple) — `#6363ed` — Player/UI theme  
- **Neon Green** — `#00ff88` — Price highlights
- **Neon Blue** — `#00d4ff` — Info badges

### Dark Mode
Theme is persisted to `localStorage`. Toggle via the switch in the navbar. Uses Tailwind's `darkMode: 'class'` strategy with CSS custom properties.

### Typography
- Display: **Bebas Neue** (headings, titles)
- Body: **DM Sans** (UI text)
- Mono: **JetBrains Mono** (prices, codes, timestamps)

---

## Game Flow

```
Landing → Enter name → Start Game
  ↓
Game Screen → Chat with Victor (8 rounds)
  ↓
[deal] → Result Screen → Leaderboard
[walkaway] → Result Screen → Play Again
```

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:5000/api` | Backend base URL |
