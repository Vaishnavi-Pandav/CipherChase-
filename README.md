# 🔍 CipherChase — Upsurge 2K26 Crime Hunt

> A crime-themed QR evidence trail game built for **Upsurge 2K26** — hunt the clues, crack the case, and race to the top of the Most Wanted leaderboard.

🌐 **Live:** [upsurge-cipherchase.vercel.app](https://upsurge-cipherchase.vercel.app/)

---

## 📖 About

CipherChase is a real-time QR-based treasure hunt game designed for Upsurge 2K26. Teams scan QR codes placed across the venue, answer questions to unlock clues, and race to complete all 7 evidence checkpoints before any other team. The game features a penalty system, live leaderboard, and tab-switch detection to ensure fair play.

---

## ✨ Features

- 📷 **QR Code Scanner** — scan evidence QR codes directly from the browser camera
- 🧩 **MCQ Questions** — each QR unlocks a question; correct answer reveals the next clue
- 🏴 **Live Leaderboard** — auto-refreshes every 30 seconds, sorted by score then time
- 🔍 **Team Progress Tracker** — visual evidence trail timeline per team
- ⚖️ **Penalty System** — wrong scan, wrong answer, wrong order, tab switch
- 🚨 **Tab Switch Detection** — switching tabs or minimizing triggers a 10-minute penalty
- 📱 **Mobile Responsive** — fully optimized for phones
- 🎨 **Crime / Dark Thriller Theme** — Upsurge 2K26 branded UI

---

## ⚖️ Penalty Rules

| Violation | Penalty |
|---|---|
| Wrong QR scan | 2 min |
| Wrong answer | 1 min |
| Wrong sequence | 2 min |
| Tab switch / minimize | 10 min |
| QR scanned by external app | Disqualified |
| Screen captured by other camera | Disqualified |

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Frontend | React 19, Tailwind CSS v4 |
| Database | MongoDB Atlas |
| ODM | Mongoose v8 |
| QR Scanner | @yudiel/react-qr-scanner |
| Icons | Lucide React |
| Deployment | Vercel |

---

## ⚙️ Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Installation

```bash
# Clone
git clone https://github.com/Vaishnavi-Pandav/CipherChase-.git
cd CipherChase-

# Install dependencies
npm install

# Create environment file
echo "MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/Treasure-Hunt?retryWrites=true&w=majority" > .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Database Setup

1. Create a MongoDB Atlas cluster
2. Create database: `Treasure-Hunt`, collection: `Team-Codes`
3. Add your connection string to `.env.local`
4. Seed team data using `seedTeams.js` or the `/api/seed` temporary route

---

## 🗂️ Project Structure

```
CipherChase/
├── app/
│   ├── api/
│   │   ├── leaderboard/     # GET leaderboard sorted by score
│   │   ├── validate/        # POST validate scanned QR
│   │   ├── submit-answer/   # POST check answer + mark scanned
│   │   ├── team-progress/   # GET team's code trail
│   │   └── tab-penalty/     # POST apply tab-switch penalty
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── QrCodeScanner.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── TeamProgress.jsx
│   │   ├── Tips.jsx
│   │   └── Footer.jsx
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── models/
│   └── SecondaryTeam.js     # Team-Codes mongoose schema
├── utils/
│   └── db.js                # MongoDB connection helper
├── public/
│   └── img/                 # Logos (upsurge, cosmos)
└── seedTeams.js             # Team data (10 teams, 7 QRs each)
```
---

## 🎮 How to Play

1. Open the website on your phone
2. Enter your **Team ID** when prompted after scanning
3. Scan the first QR code at your starting location
4. Answer the question correctly to get the next location hint
5. Follow the clues in order — scanning out of sequence triggers a penalty
6. Complete all 7 checkpoints first to win!

---



## 🔒 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👥 Developed by

**Vaishnavi Pandav** — COSMOS, Upsurge 2K26
