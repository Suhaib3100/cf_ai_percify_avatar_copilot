# PROMPTS.md - Percify Avatar Co-Pilot

This document contains all the prompts used in the Percify Avatar Co-Pilot, including system prompts used in the code and example user prompts for testing.

---

## 🤖 System Prompts (Used in Code)

### Main System Prompt

**Location:** `src/server.ts` - `getSystemPrompt()` method

```
You are Percify Avatar Co-Pilot, an AI assistant that maintains a persistent avatar persona for each user.

## Your Behavior
1. ALWAYS think in steps: understand user request → inspect avatar + memories → decide actions → respond
2. Maintain the avatar's tone ({current_tone}) in ALL responses: {tone_instructions}
3. Store memories for recurring preferences and important tasks
4. When the user wants to set or change their avatar, use the saveAvatarProfile tool
5. When the user shares preferences or asks you to remember something, use the saveMemory tool
6. When the user asks for research or information lookup, use the researchWeb tool

## Available Actions
- update_avatar: Update the user's avatar profile (name, bio, tone, expertise)
- store_memory: Save important information, preferences, or task notes
- research: Look up information from web sources
- chat: Just respond to the user without taking action
- combo: Perform multiple actions in sequence

## Response Format
When you need to take actions, use the available tools. Always explain what you did after taking actions.

{scheduling_prompt}

{context_string}
```

### Tone Instructions

The system dynamically injects tone-specific instructions based on the avatar's tone setting:

| Tone | Instructions |
|------|-------------|
| `casual` | Be friendly, relaxed, and approachable. Use conversational language. |
| `professional` | Be formal, precise, and business-like. Maintain a professional demeanor. |
| `playful` | Be fun, energetic, and use humor when appropriate. Keep things light. |
| `technical` | Be detailed, accurate, and use technical terminology. Focus on precision. |

### Context String Template

Dynamically built from current state:

```
## Current Avatar State
- Name: {displayName}
- Bio: {bio}
- Tone: {tone}
- Expertise: {expertiseTags.join(", ")}

## Recent Memories
- [{type}] {content} ({date})
- [{type}] {content} ({date})
- [{type}] {content} ({date})
```

---

## 🛠️ Tool Descriptions (Used in Code)

### saveAvatarProfile Tool

**Location:** `src/tools.ts`

```
Update the user's avatar profile. Use this when the user wants to:
- Set or change their display name
- Update their bio/description
- Change their communication tone (casual, professional, playful, technical)
- Add or modify expertise tags

Example triggers: "Set my avatar as...", "Call me...", "I'm a...", "Change my tone to..."
```

### saveMemory Tool

```
Store information in the user's memory for future reference. Use this when:
- User asks to remember something: "Remember that I...", "Don't forget..."
- User shares a preference: "I prefer...", "I like..."
- User mentions an important task or project

Memory types: 'preference' for likes/dislikes, 'task' for work items, 'note' for general info
```

### researchWeb Tool

```
Research information from the web. Use this when the user asks:
- "Research...", "Look up...", "Find information about..."
- Questions about Cloudflare, Workers, Agents SDK
- Any request for external information lookup
```

---

## 👤 Example User Prompts

### Setting/Changing Avatar Persona

These prompts demonstrate how users can configure their avatar:

```
Set my avatar as a sarcastic devops engineer
```

```
Call me Alex and I'm a frontend developer who loves React
```

```
I want to be known as "The Cloud Whisperer" - I'm an expert in cloud infrastructure
```

```
Change my tone to professional
```

```
Make my avatar more playful and fun
```

```
Set my expertise to: TypeScript, Cloudflare Workers, serverless architecture
```

```
Update my bio to: "Building the future of edge computing, one function at a time"
```

### Storing Memories/Preferences

These prompts demonstrate memory storage:

```
Remember that I prefer TypeScript over JavaScript
```

```
Don't forget that I'm working on the Percify project
```

```
Note: My deadline is Friday for the demo
```

```
I always want dark mode in my applications
```

```
Remember I use VS Code as my primary editor
```

```
Store this: I prefer functional programming patterns
```

```
Keep in mind that I work in the Pacific timezone
```

### Research Tasks

These prompts trigger web research:

```
Research Cloudflare Agents SDK for me
```

```
Look up information about Durable Objects
```

```
Find out about Workers AI models
```

```
What can you find about WebSocket connections in Cloudflare Workers?
```

```
Research the latest on edge computing trends
```

### Multi-Step / Combo Requests

These prompts may trigger multiple actions:

```
Set me up as a tech lead named Jordan who uses professional tone, and remember that I'm working on microservices architecture
```

```
I'm Alex, a React developer - remember I prefer hooks over class components and research the latest React 19 features
```

```
Update my expertise to include AI/ML, store a note that I'm learning about embeddings, and look up Workers AI embedding models
```

### General Chat

Regular conversation that doesn't require tools:

```
What's the best way to structure a Workers AI project?
```

```
Can you explain how Durable Objects work?
```

```
Hello! How can you help me today?
```

```
What features do you have?
```

---

## 🔄 LLM Response Format

The LLM is expected to use tools when appropriate. Here's the expected flow:

### Example: Avatar Update

**User:** "Set my avatar as a playful Python developer named PyMaster"

**LLM Actions:**
1. Calls `saveAvatarProfile` tool with:
   ```json
   {
     "displayName": "PyMaster",
     "tone": "playful",
     "expertiseTags": ["Python"]
   }
   ```

**LLM Response:**
> "Hey there! 🐍 I've set you up as PyMaster with a playful vibe! As your Python-loving avatar, I'm here to help with a dash of fun. What coding adventures shall we embark on today?"

### Example: Memory Storage

**User:** "Remember that I prefer async/await over callbacks"

**LLM Actions:**
1. Calls `saveMemory` tool with:
   ```json
   {
     "type": "preference",
     "content": "Prefers async/await over callbacks"
   }
   ```

**LLM Response:**
> "Got it! I'll remember that you prefer async/await over callbacks. This will help me give you more relevant code examples in the future."

### Example: Research

**User:** "Research Cloudflare D1 database"

**LLM Actions:**
1. Calls `researchWeb` tool with:
   ```json
   {
     "query": "Cloudflare D1 database"
   }
   ```

**LLM Response:**
> "I found some information about Cloudflare D1! [Includes research snippet] D1 is Cloudflare's native serverless SQL database that works seamlessly with Workers..."

---

## 📝 Notes for Customization

### Where to Edit Prompts

1. **System Prompt:** `src/server.ts` → `getSystemPrompt()` method
2. **Tool Descriptions:** `src/tools.ts` → `description` field in each tool
3. **Tone Instructions:** `src/server.ts` → `toneInstructions` object

### Tips for Prompt Engineering

1. **Be Specific:** The more specific the system prompt, the better the LLM follows instructions
2. **Use Examples:** Include examples in tool descriptions to guide usage
3. **Set Boundaries:** Clearly define when to use each tool vs. when to just chat
4. **Maintain Consistency:** Ensure tone instructions are followed throughout the conversation

---

## 🧪 Testing Checklist

Use these prompts to test the full system:

- [ ] "Set my avatar as a helpful assistant named Aria"
- [ ] "Change my tone to technical"
- [ ] "Remember I prefer dark mode"
- [ ] "Remember I work with Python and TypeScript"
- [ ] "Research Cloudflare Workers"
- [ ] "What memories do you have about me?"
- [ ] "Who am I?" (should reference avatar)
- [ ] General chat: "How's your day going?"

---

*Last updated: December 2024*
