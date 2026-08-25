<p align="center">
  <img src="https://img.shields.io/badge/NEXUS.gg-Game_Tracker-00d4aa?style=for-the-badge&labelColor=0a0f1c&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMGQ0YWEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWdvbiBwb2ludHM9IjEyIDIgMjIgOC41IDIyIDE1LjUgMTIgMjIgMiAxNS41IDIgOC41IDEyIDIiPjwvcG9seWdvbj48L3N2Zz4=" alt="NEXUS.gg" />
</p>

<h1 align="center">🎮 NEXUS.gg — Game Tracker</h1>

<p align="center">
  <b>A full-stack gaming statistics & leaderboard platform</b><br/>
  Track your Dota 2 stats, match history, competitive rankings, and more — all in one place.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/NestJS-11-e0234e?style=flat-square&logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/Prisma-7.8-2d3748?style=flat-square&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169e1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/AWS_S3-Avatars-ff9900?style=flat-square&logo=amazons3&logoColor=white" alt="AWS S3" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Server Setup](#1-server-setup)
  - [Client Setup](#2-client-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [License](#-license)

---

## 🌐 Overview

**NEXUS.gg** is a full-stack monorepo application that lets gamers link their external gaming accounts (Steam / Dota 2), view real-time statistics synced from OpenDota, browse global competitive leaderboards pulled from the official Valve Web API, and manage their profile with avatar uploads to AWS S3.

The project is split into two packages:

| Package | Description | Port |
|---------|-------------|------|
| `game-tracker-client` | Next.js 16 frontend (App Router, React 19) | `3000` |
| `game-tracker-server` | NestJS 11 REST API backend with Prisma ORM | `3001` |

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication & Security
- JWT access & refresh token rotation
- HTTP-only secure cookies
- Password hashing with bcrypt
- Global validation pipes & exception filters
- Rate limiting with `@nestjs/throttler`

</td>
<td width="50%">

### 👤 User Profiles
- Custom avatar uploads to AWS S3
- Editable username & email
- Activity stats (wins, losses, hours played)
- Search users by username

</td>
</tr>
<tr>
<td width="50%">

### 📊 Game Statistics
- Link Steam / Dota 2 accounts
- Real-time stats sync from OpenDota API
- Rank tracking (Herald → Immortal)
- Win/Loss ratio & Dota Plus status
- Rating history timeline

</td>
<td width="50%">

### 🏆 Leaderboards
- Global Dota 2 competitive rankings
- Data from Valve's official Leaderboard API
- Paginated browsing with summary cards
- Player rank, team name & team tag display

</td>
</tr>
<tr>
<td width="50%">

### ⚔️ Match History
- Recent Dota 2 matches with detailed stats
- K/D/A, GPM, lane role, hero/tower damage
- Radiant/Dire win tracking
- Manual sync from OpenDota

</td>
<td width="50%">

### 🔗 Platform Connections
- Multi-platform account linking
- Steam, Riot (Valorant), Supercell (Brawl Stars)
- External ID management
- Easy connect/disconnect flow

</td>
</tr>
</table>

---

## 🛠 Tech Stack

### Frontend — `game-tracker-client`

| Technology | Purpose |
|---|---|
| **Next.js 16** | App Router, React Server Components, React Compiler |
| **React 19** | UI library with latest features |
| **TypeScript 5** | Type-safe development |
| **Tailwind CSS v4** | Utility-first styling with custom cyber/gaming dark theme |
| **TanStack Query v5** | Server state management & caching |
| **Axios** | HTTP client for API mutations |
| **Shadcn UI** | Accessible component primitives |
| **Lucide React** | Icon library |

### Backend — `game-tracker-server`

| Technology | Purpose |
|---|---|
| **NestJS 11** | Progressive Node.js framework (ES Modules) |
| **Prisma ORM 7.8** | Type-safe database access & migrations |
| **PostgreSQL** | Relational database (AWS RDS) |
| **JWT** | Authentication with token rotation |
| **AWS S3** | Cloud storage for user avatars |
| **OpenDota API** | Player stats, match history, ratings |
| **Valve Web API** | Official Dota 2 division leaderboards |
| **class-validator** | DTO validation with decorators |
| **SWC** | Fast TypeScript compilation for tests |

---

## 📁 Project Structure

```
game-tracker/
├── game-tracker-client/          # Next.js frontend
│   ├── src/
│   │   ├── app/                  # App Router pages
│   │   │   ├── page.tsx          #   / — Landing page
│   │   │   ├── login/            #   /login — Auth (Login & Register tabs)
│   │   │   ├── leaders/          #   /leaders — Global leaderboards
│   │   │   └── profile/          #   /profile — User dashboard (protected)
│   │   ├── components/           # Reusable UI components
│   │   │   ├── ui/               #   Shadcn primitives (Button, Input, Spinner…)
│   │   │   ├── Header.tsx        #   Brand nav, search, profile link
│   │   │   ├── Footer.tsx        #   Site footer with navigation columns
│   │   │   ├── Hero.tsx          #   Landing hero section
│   │   │   ├── ProfileCard.tsx   #   User info, avatar, activity overview
│   │   │   ├── GameStatsBlock.tsx #   Rank, winrate, match stats display
│   │   │   ├── LeaderCard.tsx    #   Individual leaderboard entry
│   │   │   └── ...
│   │   ├── hooks/                # Custom React hooks (useAuth, etc.)
│   │   ├── types/                # TypeScript interfaces & types
│   │   ├── lib/                  # Utilities (cn, axios instance)
│   │   └── proxy.ts              # Auth middleware for protected routes
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── game-tracker-server/          # NestJS backend
│   ├── src/
│   │   ├── main.ts               # App bootstrap (CORS, validation, cookies)
│   │   ├── app.module.ts         # Root module
│   │   ├── auth/                 # Authentication (register, login, refresh, logout)
│   │   ├── users/                # User CRUD & avatar upload
│   │   ├── connections/          # Platform account linking (Steam, Riot, Supercell)
│   │   ├── statistics/           # Dota 2 stats & rating sync
│   │   ├── matches/              # Match history sync & retrieval
│   │   ├── leaderboard/          # Global leaderboard sync & pagination
│   │   ├── guards/               # AuthGuard (JWT verification)
│   │   ├── exceptionFilters/     # Global exception handler
│   │   ├── providers/            # Shared service providers
│   │   └── lib/                  # Prisma module & service
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   └── migrations/           # Migration history (18 migrations)
│   ├── utils/
│   │   ├── dto/                  # Validation DTOs
│   │   └── types/                # Shared TypeScript types
│   ├── package.json
│   ├── prisma.config.ts
│   └── tsconfig.json
│
└── README.md                     # ← You are here
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x
- **npm** ≥ 10.x
- **PostgreSQL** ≥ 15 (local or cloud — e.g. AWS RDS, Supabase)
- **AWS S3 Bucket** (for avatar storage)

### 1. Server Setup

```bash
# Navigate to the server directory
cd game-tracker-server

# Install dependencies
npm install

# Configure environment variables (see section below)
cp .env.example .env
# Edit .env with your values

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Start the development server
npm run start:dev
```

The API will be available at **`http://localhost:3001/api`**

### 2. Client Setup

```bash
# Navigate to the client directory
cd game-tracker-client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **`http://localhost:3000`**

---

## 🔑 Environment Variables

Create a `.env` file in the `game-tracker-server/` directory:

```env
# Server
PORT=3001

# Database
DATABASE_URL="postgresql://user:password@host:5432/game_tracker?sslmode=require"

# Authentication
SECRET_KEY="your-jwt-secret-key"

# AWS S3 (Avatar Storage)
AWS_S3_REGION="eu-north-1"
AWS_ACCESS_KEY="your-aws-access-key-id"
AWS_SECRET_KEY="your-aws-secret-access-key"
```

| Variable | Required | Description |
|---|:---:|---|
| `PORT` | ✅ | Port for the NestJS server (default: `3001`) |
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `SECRET_KEY` | ✅ | Secret key for JWT token signing |
| `AWS_S3_REGION` | ✅ | AWS region for S3 bucket |
| `AWS_ACCESS_KEY` | ✅ | IAM access key ID for S3 |
| `AWS_SECRET_KEY` | ✅ | IAM secret access key for S3 |

---

## 📡 API Reference

All endpoints are prefixed with `/api`. Protected routes require an `accessToken` HTTP-only cookie.

### 🔐 Authentication

| Method | Endpoint | Auth | Description |
|:---:|---|:---:|---|
| `POST` | `/auth/register` | ❌ | Register a new user |
| `POST` | `/auth/login` | ❌ | Login with email & password |
| `GET` | `/auth/refresh` | 🍪 | Refresh access token |
| `POST` | `/auth/logout` | ✅ | Logout & clear session |

### 👤 Users

| Method | Endpoint | Auth | Description |
|:---:|---|:---:|---|
| `GET` | `/users/me` | ✅ | Get current user profile |
| `GET` | `/users?search=` | ❌ | Search users by username |
| `GET` | `/users/:id` | ❌ | Get user by ID |
| `PATCH` | `/users` | ✅ | Update username / email |
| `POST` | `/users/avatar` | ✅ | Upload avatar (max 5MB, JPEG/PNG/WebP) |

### 🔗 Connections

| Method | Endpoint | Auth | Description |
|:---:|---|:---:|---|
| `GET` | `/connection` | ✅ | Get all linked accounts |
| `POST` | `/connection` | ✅ | Link a new game account |
| `DELETE` | `/connection/:id` | ✅ | Remove a linked account |

### 📊 Statistics

| Method | Endpoint | Auth | Description |
|:---:|---|:---:|---|
| `GET` | `/stats/dota` | ✅ | Get Dota 2 player stats |
| `POST` | `/stats/dota/sync` | ✅ | Sync stats from OpenDota |
| `GET` | `/stats/dota/rating` | ✅ | Get rating history |
| `POST` | `/stats/dota/rating/sync` | ✅ | Sync rating history |

### ⚔️ Matches

| Method | Endpoint | Auth | Description |
|:---:|---|:---:|---|
| `GET` | `/matches/dota` | ✅ | Get recent Dota 2 matches |
| `GET` | `/matches/dota/sync` | ✅ | Sync matches from OpenDota |

### 🏆 Leaderboard

| Method | Endpoint | Auth | Description |
|:---:|---|:---:|---|
| `GET` | `/leaderboard/dota?limit=&page=` | ❌ | Get paginated leaderboard |
| `POST` | `/leaderboard/dota/sync` | ❌ | Sync from Valve Leaderboard API |

---

## 🗄 Database Schema

```mermaid
erDiagram
    Users ||--o| Sessions : "has one"
    Users ||--o{ Connections : "has many"
    Connections ||--o| GameStats : "has one"
    GameStats ||--o{ RatingHistory : "has many"
    GameStats ||--o{ Matches : "has many"
    Games ||--o{ Matches : "has many"

    Users {
        int userId PK
        string email UK
        string username UK
        string password
        string avatar
        datetime createdAt
        datetime updatedAt
    }

    Sessions {
        int sessionId PK
        int sessionUserId FK
        string token UK
        datetime createdAt
        datetime updatedAt
    }

    Connections {
        int connectionId PK
        int connectinUserId FK
        enum platformName "STEAM | RIOT | SUPERCELL"
        string externalId
        string accessToken
        datetime createdAt
        datetime updatedAt
    }

    GameStats {
        int statId PK
        int statsConnectionId FK
        json metadata
        datetime createdAt
        datetime updatedAt
    }

    RatingHistory {
        int ratingId PK
        int ratingStatId FK
        int ratingTier
        datetime achievedAt
    }

    Games {
        int gameId PK
        string name UK
    }

    Matches {
        int matchId PK
        int statsMatchId FK
        int gameMatchId FK
        json metadata
    }

    Leaderboard {
        int leaderboardId PK
        int playerRank
        string username
        string teamName
        int teamId
    }

    News {
        int newsId PK
        string title
        string content
        string game
        datetime createdAt
    }
```

---

## 📜 License

This project is **UNLICENSED** — private and proprietary.

---

<p align="center">
  Built with ❤️ using <b>Next.js</b>, <b>NestJS</b>, <b>Prisma</b> & <b>PostgreSQL</b>
</p>
