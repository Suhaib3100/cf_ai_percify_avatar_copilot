# 🎭 Percify Avatar Co-Pilot

> Your AI assistant that remembers who you are.

![Percify Chat Interface](./public/screenshot01.png)

**Percify Avatar Co-Pilot** is an AI-powered assistant built on Cloudflare's edge network that maintains a persistent persona for each user. It remembers your preferences, stores your notes, and adapts to your communication style.

🚀 **Live Demo**: [cf-ai-percify-avatar-copilot.suhaibking310-47d.workers.dev](https://cf-ai-percify-avatar-copilot.suhaibking310-47d.workers.dev/)

🌐 **Documentation**: [docs.percify.io](https://docs.percify.io)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎭 **Persistent Avatar** | Create your AI persona with custom name, bio, tone & expertise |
| 🧠 **Memory Storage** | Save preferences, tasks, and notes that persist across sessions |
| 📚 **Documentation Search** | Query docs.percify.io for help and guides |
| 🎨 **4 Tone Styles** | Casual, Professional, Playful, or Technical |
| ⚡ **Edge-Powered** | Runs on Cloudflare Workers for global low-latency |
| 📅 **Task Scheduling** | Schedule reminders and recurring tasks |

---

## 📸 Screenshots

### Chat Interface
![Percify Chat](./public/screenshot01.png)

### Avatar & Memory in Action
![Docs Ai copliot](./public/screenshot02.png)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm start
```
Opens at `http://localhost:5173`

### 3. Deploy to Cloudflare
```bash
npm run deploy
```

---

## 🎮 Usage Examples

### Create Your Avatar
```
"Set my avatar as Alex, a senior developer who loves TypeScript"
"Change my tone to professional"
"My expertise is React, Node.js, and DevOps"
```

### Store Memories
```
"Remember that I prefer dark mode"
"Note: project deadline is Friday"
"Don't forget I'm working on the Percify project"
```

### Search Documentation
```
"What is Percify?"
"How do memories work?"
"What tones are available?"
"How do I schedule tasks?"
```

### Schedule Tasks
```
"Remind me in 1 hour to check deployment"
"Schedule daily standup at 9am"
```

---

## 🛠️ Available Tools

| Tool | Description |
|------|-------------|
| `saveAvatarProfile` | Create/update your avatar (name, bio, tone, expertise) |
| `saveMemory` | Store preferences, tasks, or notes (max 50 items) |
| `researchWeb` | Search docs.percify.io documentation |
| `getAvatarState` | View current avatar and recent memories |
| `scheduleTask` | Schedule tasks for later |
| `getScheduledTasks` | List all scheduled tasks |
| `cancelScheduledTask` | Cancel a scheduled task |

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                     Cloudflare Edge Network                     │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────┐         ┌─────────────────────────────────┐ │
│   │   React UI   │◄─WSS──►│     PercifyAvatarAgent          │ │
│   │   (Vite)     │         │     (Durable Object)            │ │
│   └──────────────┘         │                                 │ │
│                            │  ┌─────────────────────────────┐│ │
│                            │  │ Avatar Profile              ││ │
│                            │  │ • displayName, bio          ││ │
│                            │  │ • tone, expertiseTags       ││ │
│                            │  └─────────────────────────────┘│ │
│                            │  ┌─────────────────────────────┐│ │
│                            │  │ Memory Storage (50 max)     ││ │
│                            │  │ • tasks, preferences, notes ││ │
│                            │  └─────────────────────────────┘│ │
│                            │  ┌─────────────────────────────┐│ │
│                            │  │ docs.percify.io Search      ││ │
│                            │  │ • 10 documentation topics   ││ │
│                            │  └─────────────────────────────┘│ │
│                            └─────────────┬───────────────────┘ │
│                                          │                     │
│                            ┌─────────────▼───────────────────┐ │
│                            │        Workers AI               │ │
│                            │  @cf/meta/llama-3.3-70b-        │ │
│                            │  instruct-fp8-fast              │ │
│                            └─────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
├── public/
│   ├── screenshot01.png    # Chat interface screenshot
│   └── screenshot02.png    # Avatar demo screenshot
├── src/
│   ├── app.tsx             # React chat UI with avatar header
│   ├── server.ts           # PercifyAvatarAgent (Durable Object)
│   ├── tools.ts            # Tool definitions
│   ├── client.tsx          # React entry point
│   └── styles.css          # UI styling
├── wrangler.jsonc          # Cloudflare Workers config
├── PROMPTS.md              # AI prompts documentation
└── README.md               # This file
```

---

## 📚 Documentation Topics

The built-in docs.percify.io search covers:

| Topic | Description |
|-------|-------------|
| Getting Started | First-time setup guide |
| Avatar Guide | Creating and customizing your avatar |
| Memory System | How memories work and limits |
| Tone Customization | Available tone styles |
| Expertise Tags | Adding your areas of expertise |
| Tools Reference | All available commands |
| Scheduling | Reminders and recurring tasks |
| Architecture | Technical implementation details |
| API Reference | REST and WebSocket endpoints |
| Troubleshooting | Common issues and fixes |

---

## ⚙️ Tech Stack

- **Runtime**: Cloudflare Workers
- **State**: Durable Objects + SQLite
- **AI Model**: Workers AI (Llama 3.3 70B)
- **Frontend**: React + Vite
- **Realtime**: WebSockets
- **SDK**: Cloudflare Agents SDK

---

## 📋 Requirements

- Node.js v18+ (v20 recommended)
- Cloudflare account with Workers AI
- npm or pnpm

---

## 🧪 Test Plan

1. **Avatar Setup**: "Create my avatar as Alex with professional tone"
   - ✓ Header shows name and tone badge

2. **Memory Storage**: "Remember I prefer TypeScript"
   - ✓ Memory saved, context updated

3. **Documentation Search**: "What is Percify?"
   - ✓ Returns docs.percify.io content

4. **Tone Change**: "Change tone to playful"
   - ✓ Responses adapt to new tone

5. **Persistence**: Refresh page
   - ✓ Avatar and memories restored

---

## 📄 License

MIT License - see [LICENSE](./LICENSE)

---

<p align="center">
  Built with ❤️ on Cloudflare Workers
</p>
