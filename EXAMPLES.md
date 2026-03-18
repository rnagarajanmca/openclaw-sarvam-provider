# Usage Examples for OpenClaw Sarvam Provider

## Table of Contents

- [Basic Usage](#basic-usage)
- [Wiki Grounding](#wiki-grounding)
- [Advanced Configuration](#advanced-configuration)
- [CLI Examples](#cli-examples)
- [Programmatic Usage](#programmatic-usage)

## Basic Usage

### Simple Chat

```bash
openclaw agent --model "sarvam/sarvam-m" --message "Tell me about Indian culture"
```

### Interactive Chat

```bash
# Start interactive session with Sarvam
openclaw agent --model "sarvam/sarvam-m"

# In the interactive session, just type your messages:
# > What are the major festivals of India?
# > How do I say "hello" in Hindi?
```

## Wiki Grounding

Sarvam's unique feature - RAG-based Wikipedia retrieval for enhanced factual accuracy.

### Enable Wiki Grounding via CLI

```bash
openclaw agent --model "sarvam/sarvam-m" --message "What is the history of the Taj Mahal?" --wiki-grounding true
```

### Enable Wiki Grounding via Config

Create/edit `~/.config/openclaw/config.json`:

```json
{
  "agent": {
    "model": "sarvam/sarvam-m",
    "wiki_grounding": true
  }
}
```

Then run:

```bash
openclaw agent --message "Who was the first Prime Minister of India?"
```

### Wikipedia-Specific Questions

```bash
# Questions that benefit from wiki grounding
openclaw agent --model "sarvam/sarvam-m" --wiki-grounding true --message "What is the population of Mumbai?"

openclaw agent --model "sarvam/sarvam-m" --wiki-grounding true --message "When was the Indian Constitution adopted?"

openclaw agent --model "sarvam/sarvam-m" --wiki-grounding true --message "What are the main geographical features of Kerala?"
```

## Advanced Configuration

### Custom Temperature Settings

```bash
# More creative (higher temperature)
openclaw agent --model "sarvam/sarvam-m" --temperature 0.8 --message "Write a creative story about India"

# More focused (lower temperature)
openclaw agent --model "sarvam/sarvam-m" --temperature 0.2 --message "Summarize the key events of Indian independence"
```

### Top-p Sampling

```bash
openclaw agent --model "sarvam/sarvam-m" --top-p 0.9 --message "Generate a poem about Indian monsoon"
```

### Max Tokens

```bash
# Short response
openclaw agent --model "sarvam/sarvam-m" --max-tokens 100 --message "What is Bollywood?"

# Long response
openclaw agent --model "sarvam/sarvam-m" --max-tokens 2000 --message "Provide a detailed history of Indian cinema"
```

### Combined Parameters

```bash
openclaw agent \
  --model "sarvam/sarvam-m" \
  --temperature 0.7 \
  --top-p 0.9 \
  --max-tokens 500 \
  --wiki-grounding true \
  --message "Explain the significance of the River Ganges in Indian culture"
```

## CLI Examples

### Send Messages to Channels

```bash
# Send to Telegram (if configured)
openclaw message send --to @your-telegram-chat --message "Hello from Sarvam!"

# Send to WhatsApp (if configured)
openclaw message send --to +1234567890 --message "Hi there!"
```

### Multi-Agent Scenarios

```bash
# Agent 1: General assistant
openclaw agent --model "sarvam/sarvam-m" --message "Help me plan my trip to India"

# Agent 2: Wiki researcher (with grounding)
openclaw agent --model "sarvam/sarvam-m" --wiki-grounding true --message "What are the UNESCO World Heritage sites in India?"
```

### Voice Mode (if configured)

```bash
# Enable voice with Sarvam
openclaw agent --model "sarvam/sarvam-m" --voice --message "Tell me about Indian classical music"
```

## Programmatic Usage

### Using OpenClaw Plugin SDK

```typescript
import { buildSarvamProvider, type SarvamRequest } from "openclaw-sarvam-provider";

// Create provider instance
const provider = buildSarvamProvider();

// Configure with API key
const config = {
  apiKey: process.env.SARVAM_API_KEY,
  baseURL: "https://api.sarvam.ai",
};

// Create request
const request: SarvamRequest = {
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Tell me about Indian history" },
  ],
  model: "sarvam-m",
  temperature: 0.7,
  wiki_grounding: true, // Enable wiki grounding
};

// Make request
const response = await provider.chatCompletion(config, request);
console.log(response.choices[0].message.content);
```

### Streaming Example

```typescript
import { buildSarvamProvider } from "openclaw-sarvam-provider";

const provider = buildSarvamProvider();
const config = {
  apiKey: process.env.SARVAM_API_KEY,
  baseURL: "https://api.sarvam.ai",
};

const request = {
  messages: [{ role: "user", content: "Write about Indian cuisine" }],
  model: "sarvam-m",
  stream: true,
  wiki_grounding: true,
};

// Stream response
for await (const chunk of provider.chatCompletionStream(config, request)) {
  for (const choice of chunk.choices) {
    if (choice.delta.content) {
      process.stdout.write(choice.delta.content);
    }
  }
}
```

### Multiple Messages

```typescript
const request: SarvamRequest = {
  messages: [
    { role: "system", content: "You are an expert on Indian culture." },
    { role: "user", content: "What are traditional Indian clothing styles?" },
    { role: "assistant", content: "Traditional Indian clothing includes saree, salwar kameez, kurta, etc." },
    { role: "user", content: "Tell me more about sarees." },
  ],
  model: "sarvam-m",
  wiki_grounding: true,
};

const response = await provider.chatCompletion(config, request);
```

## Configuration File Examples

### Basic Config

`~/.config/openclaw/config.json`:

```json
{
  "agent": {
    "model": "sarvam/sarvam-m"
  }
}
```

### Advanced Config

`~/.config/openclaw/config.json`:

```json
{
  "agent": {
    "model": "sarvam/sarvam-m",
    "temperature": 0.7,
    "top_p": 0.9,
    "max_tokens": 1000,
    "wiki_grounding": true,
    "frequency_penalty": 0.5,
    "presence_penalty": 0.5
  },
  "providers": {
    "sarvam": {
      "apiKey": "${SARVAM_API_KEY}",
      "baseURL": "https://api.sarvam.ai"
    }
  }
}
```

### Multi-Agent Config

`~/.config/openclaw/config.json`:

```json
{
  "agents": {
    "general": {
      "model": "sarvam/sarvam-m",
      "description": "General assistant"
    },
    "researcher": {
      "model": "sarvam/sarvam-m",
      "wiki_grounding": true,
      "description": "Research assistant with wiki grounding"
    },
    "creative": {
      "model": "sarvam/sarvam-m",
      "temperature": 0.9,
      "description": "Creative writing assistant"
    }
  }
}
```

## Indian Language Support

Sarvam excels at Indian languages. Here are examples:

### Hindi

```bash
openclaw agent --model "sarvam/sarvam-m" --message "मुझे भारत के बारे में बताओ"
```

### Tamil

```bash
openclaw agent --model "sarvam/sarvam-m" --message "இந்தியாவின் வரலாறு பற்றி சொல்லுங்கள்"
```

### Telugu

```bash
openclaw agent --model "sarvam/sarvam-m" --message "భారతదేశం గురించి చెప్పండి"
```

### Cross-Language Support

```bash
# Ask questions in English about Indian topics
openclaw agent --model "sarvam/sarvam-m" --wiki-grounding true --message "What are the major festivals celebrated in India?"

# Get responses with cultural context
openclaw agent --model "sarvam/sarvam-m" --message "Explain the significance of Diwali in Indian culture"
```

## Error Handling Examples

### API Key Validation

```typescript
import { validateSarvamApiKey } from "openclaw-sarvam-provider";

const apiKey = process.env.SARVAM_API_KEY;

if (!validateSarvamApiKey(apiKey)) {
  console.error("Invalid API key format");
  process.exit(1);
}
```

### Error Handling in Requests

```typescript
try {
  const response = await provider.chatCompletion(config, request);
  console.log(response.choices[0].message.content);
} catch (error) {
  if (error.message.includes("401")) {
    console.error("Invalid API key");
  } else if (error.message.includes("429")) {
    console.error("Rate limit exceeded");
  } else {
    console.error("Unexpected error:", error.message);
  }
}
```

## Performance Tips

### Enable Streaming for Long Responses

```bash
# Streaming provides faster perceived response time
openclaw agent --model "sarvam/sarvam-m" --message "Write a detailed article about Indian geography" --stream true
```

### Use Wiki Grounding for Factual Queries

```bash
# More accurate for factual information
openclaw agent --model "sarvam/sarvam-m" --wiki-grounding true --message "What is the capital of each Indian state?"
```

### Adjust Temperature Based on Task

```bash
# Lower temperature for factual answers
openclaw agent --model "sarvam/sarvam-m" --temperature 0.2 --wiki-grounding true --message "List the Prime Ministers of India"

# Higher temperature for creative content
openclaw agent --model "sarvam/sarvam-m" --temperature 0.9 --message "Write a story about a magical journey through India"
```

---

**Need more examples?** Check the full [README.md](README.md) or [Sarvam Documentation](https://docs.sarvam.ai).