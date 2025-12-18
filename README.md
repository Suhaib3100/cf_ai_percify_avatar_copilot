# 🤖 cf_ai_percify_avatar_copilot

![Cloudflare Agents](./npm-agents-banner.svg)

**Cloudflare Agents-based AI avatar co-pilot that remembers a persona and multi-step tasks for each user.**

Built with the [Cloudflare Agents SDK](https://developers.cloudflare.com/agents/) and powered by **Workers AI** using the `@cf/meta/llama-3.3-70b-instruct-fp8-fast` model.

## ✨ Features

- 💬 **Real-time Chat** - WebSocket-based chat using Cloudflare Agents Starter
- 👤 **Persistent Avatar Profile** - Customize your AI persona with name, bio, tone, and expertise tags
- 🧠 **Long-term Memory** - Store preferences, tasks, and notes that persist across sessions
- 🔧 **Tool Integration** - Built-in tools for avatar management, memory storage, and web research
- 🤖 **LLM Orchestration** - Multi-step task execution with Workers AI Llama 3.3 70B
- 🌓 **Dark/Light Theme** - Toggle between themes with preference persistence
- 📅 **Task Scheduling** - Schedule tasks for later execution (one-time, delayed, or cron)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare Workers                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │   React UI      │◄──►│  PercifyAvatarAgent             │ │
│  │   (WebSocket)   │    │  (Durable Object)               │ │
│  └─────────────────┘    │                                 │ │
│                         │  • Avatar Profile State         │ │
│                         │  • Memory Storage (50 items)    │ │
│                         │  • Tool Execution               │ │
│                         │  • LLM Orchestration            │ │
│                         └─────────────┬───────────────────┘ │
│                                       │                     │
│                         ┌─────────────▼───────────────────┐ │
│                         │   Workers AI                    │ │
│                         │   @cf/meta/llama-3.3-70b-       │ │
│                         │   instruct-fp8-fast             │ │
│                         └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Requirements

- **Node.js** v18+ (v20+ recommended)
- **Cloudflare Account** with Workers AI enabled
- **Wrangler CLI** (included as dev dependency)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally

```bash
npm start
```

This starts a local development server with hot reloading.

### 3. Deploy to Cloudflare

```bash
npm run deploy
```

## 🎮 How to Use

1. **Open the deployed URL** in your browser
2. **Set up your avatar** by telling the agent:
   - "Set my avatar as a sarcastic devops engineer"
   - "Call me Alex and set my tone to professional"
   - "My expertise is TypeScript, React, and Cloudflare Workers"

3. **Store memories** for long-term preferences:
   - "Remember that I prefer TypeScript over JavaScript"
   - "Don't forget I'm working on a Cloudflare project"
   - "Note: deadline for project is Friday"

4. **Run research tasks**:
   - "Research Cloudflare Agents SDK for me"
   - "Look up information about Durable Objects"

5. **Schedule tasks**:
   - "Remind me to check the deployment in 1 hour"
   - "Schedule a code review for tomorrow at 3pm"

## 🛠️ Available Tools

| Tool | Description |
|------|-------------|
| `saveAvatarProfile` | Update avatar name, bio, tone, expertise tags |
| `saveMemory` | Store preferences, tasks, or notes (max 50 items) |
| `researchWeb` | Perform web research on Cloudflare docs |
| `getAvatarState` | Retrieve current avatar and recent memories |
| `scheduleTask` | Schedule tasks for later execution |
| `getScheduledTasks` | List all scheduled tasks |
| `cancelScheduledTask` | Cancel a scheduled task |

## 📁 Project Structure

```
├── src/
│   ├── app.tsx        # React chat UI with avatar header
│   ├── server.ts      # PercifyAvatarAgent implementation
│   ├── tools.ts       # Tool definitions (avatar, memory, research)
│   ├── utils.ts       # Helper functions
│   └── styles.css     # UI styling
├── wrangler.jsonc     # Cloudflare configuration
├── PROMPTS.md         # AI prompts documentation
└── README.md          # This file
```

## ⚙️ Configuration

### wrangler.jsonc

The project is configured with:
- **Workers AI** binding for LLM inference
- **Durable Objects** for persistent state
- **SQLite** storage for chat history and agent state

### Environment Variables

No environment variables required! The project uses Workers AI which is automatically available in Cloudflare Workers.

## 📝 Assignment Notes

This project satisfies the Cloudflare assignment requirements:

### ✅ LLM Usage
- Uses **Workers AI** with `@cf/meta/llama-3.3-70b-instruct-fp8-fast`
- System prompts configured for avatar persona behavior
- Multi-step reasoning with tool calling

### ✅ Workflow/Coordination
- Tools for avatar profile management (`saveAvatarProfile`)
- Memory storage with automatic cleanup (`saveMemory`)
- Web research capability (`researchWeb`)
- State management via Agents SDK `setState`

### ✅ User Input
- Real-time WebSocket chat interface
- Tool confirmation for certain operations
- Streaming responses

### ✅ Memory/State Storage
- Avatar profile persisted in Durable Object state
- Memory items stored with automatic 50-item cap
- Chat history preserved across sessions
- Task scheduling with Durable Object schedules

## 🧪 Manual Test Plan

1. **First run**: Set avatar with "Set my avatar as a friendly developer named Alex"
   - Verify avatar header updates with name and tone

2. **Memory test**: Add 3-4 memories
   - "Remember I prefer dark mode"
   - "Note that I'm working on an AI project"
   - Refresh page, verify memories are used in context

3. **Research test**: "Research Cloudflare Agents SDK"
   - Verify research snippet appears in response

4. **Tone test**: "Change my tone to professional"
   - Verify subsequent responses use professional tone

## 📚 Documentation

- [PROMPTS.md](./PROMPTS.md) - AI prompts and system instructions
- [Cloudflare Agents SDK](https://developers.cloudflare.com/agents/)
- [Workers AI Models](https://developers.cloudflare.com/workers-ai/models/)

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

Built with ❤️ using Cloudflare Agents SDK
