# OpenClaw Sarvam Provider

[![npm version](https://badge.fury.io/js/openclaw-sarvam-provider.svg)](https://www.npmjs.com/package/openclaw-sarvam-provider)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/node/v/openclaw-sarvam-provider)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**Official Sarvam provider for OpenClaw** - Enterprise-grade integration with wiki_grounding, strong Indian language support, and dynamic model switching.

## ✨ Features

- 🌏 **Strong Indian Language Support** - Optimized for Hindi, Tamil, Telugu, Kannada, and more
- 📚 **Wiki Grounding** - Built-in RAG-based Wikipedia retrieval for enhanced factual accuracy
- 🔄 **Dynamic Model Switching** - Seamlessly switch between Lite, M, and Pro models
- ⚡ **Streaming Support** - Real-time streaming responses for faster user experience
- 🔒 **Enterprise Security** - Environment variable support, input validation, secure communication
- 🎯 **Multiple Models** - Choose the right model for your use case
- 🛠️ **Developer-Friendly** - TypeScript with full type definitions
- 📦 **Easy Installation** - Single command setup with OpenClaw

## 📋 Requirements

- **Node.js**: ≥22.16.0
- **OpenClaw**: ≥2026.3.14
- **Sarvam API Key**: Get one at [docs.sarvam.ai](https://docs.sarvam.ai)

## 🚀 Installation

### Quick Start

```bash
npm install -g openclaw-sarvam-provider
```

### Alternative Package Managers

```bash
# Using pnpm
pnpm add -g openclaw-sarvam-provider

# Using bun
bun add -g openclaw-sarvam-provider

# Using yarn
yarn global add openclaw-sarvam-provider
```

## ⚙️ Configuration

### Step 1: Get Your API Key

1. Visit [docs.sarvam.ai](https://docs.sarvam.ai)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Generate a new API key
5. Copy your API key

### Step 2: Configure OpenClaw

#### Option A: Environment Variable (Recommended)

```bash
export SARVAM_API_KEY="your-sarvam-api-key-here"
```

Add to your shell profile for persistence:

```bash
# For Bash
echo 'export SARVAM_API_KEY="your-sarvam-api-key-here"' >> ~/.bashrc
source ~/.bashrc

# For Zsh
echo 'export SARVAM_API_KEY="your-sarvam-api-key-here"' >> ~/.zshrc
source ~/.zshrc
```

#### Option B: Interactive Setup

```bash
openclaw setup sarvam
```

#### Option C: Configuration File

Create/edit `~/.config/openclaw/config.json`:

```json
{
  "agent": {
    "model": "sarvam/sarvam-m",
    "providers": {
      "sarvam": {
        "apiKey": "${SARVAM_API_KEY}"
      }
    }
  }
}
```

## 🎯 Usage

### Basic Usage

```bash
openclaw agent --model "sarvam/sarvam-m" --message "Tell me about Indian culture"
```

### Model Switching

The provider supports **dynamic model switching**. You can switch between models at any time:

```bash
# Quick responses (Lite)
openclaw agent --model "sarvam/sarvam-lite" --message "Quick question"

# General use (M - Default)
openclaw agent --model "sarvam/sarvam-m" --message "Standard query"

# Complex analysis (Pro)
openclaw agent --model "sarvam/sarvam-pro" --wiki-grounding true --message "Complex analysis needed"
```

### Wiki Grounding (Sarvam's Unique Feature)

Enable wiki_grounding for enhanced factual accuracy:

```bash
openclaw agent --model "sarvam/sarvam-m" --wiki-grounding true --message "What is the history of the Taj Mahal?"
```

### Configuration File Usage

```json
{
  "agent": {
    "model": "sarvam/sarvam-m",
    "temperature": 0.7,
    "top_p": 0.9,
    "max_tokens": 1000,
    "wiki_grounding": true
  }
}
```

### Multi-Agent Setup

```json
{
  "agents": {
    "quick": {
      "model": "sarvam/sarvam-lite",
      "description": "Fast responses for simple queries"
    },
    "general": {
      "model": "sarvam/sarvam-m",
      "description": "Balanced performance for general tasks"
    },
    "researcher": {
      "model": "sarvam/sarvam-pro",
      "wiki_grounding": true,
      "description": "Deep research with wiki grounding"
    }
  }
}
```

Usage:
```bash
openclaw agent --agent quick --message "What's the time?"
openclaw agent --agent researcher --message "Analyze the economic impact of Indian independence"
```

## 📊 Available Models

| Model ID | Name | Context | Features | Best For | Pricing |
|----------|------|---------|----------|-----------|---------|
| `sarvam/sarvam-lite` | Sarvam Lite | 16K | wiki_grounding, streaming | Quick responses, simple tasks | 💰 Cheapest |
| `sarvam/sarvam-m` | Sarvam M | 32K | wiki_grounding, streaming, Indian languages | General use, balanced performance | 💳 Medium |
| `sarvam/sarvam-pro` | Sarvam Pro | 64K | wiki_grounding, streaming, advanced reasoning, Indian languages | Complex tasks, deep analysis | 💎 Premium |

### Model Selection Guide

- **Sarvam Lite** → Real-time chat, simple Q&A, high-volume queries
- **Sarvam M** → Daily use, general conversation, standard tasks
- **Sarvam Pro** → Research, analysis, complex reasoning, important content

## 🔧 Advanced Configuration

### Custom Parameters

```bash
openclaw agent \
  --model "sarvam/sarvam-m" \
  --temperature 0.7 \
  --top-p 0.9 \
  --max-tokens 500 \
  --wiki-grounding true \
  --message "Explain the significance of Indian classical music"
```

### API Parameters

| Parameter | Type | Default | Range | Description |
|-----------|-------|---------|--------|-------------|
| `model` | string | `sarvam-m` | `sarvam-lite`, `sarvam-m`, `sarvam-pro` | Model selection |
| `temperature` | number | `0.2` | 0.0 - 2.0 | Controls randomness |
| `top_p` | number | `1.0` | 0.0 - 1.0 | Nucleus sampling |
| `max_tokens` | number | Model-dependent | 1 - Context limit | Maximum response length |
| `wiki_grounding` | boolean | `false` | true/false | Enable Wikipedia RAG |
| `frequency_penalty` | number | `0.0` | -2.0 - 2.0 | Reduce repetition |
| `presence_penalty` | number | `0.0` | -2.0 - 2.0 | Encourage new topics |
| `stream` | boolean | `true` | true/false | Enable streaming |

### Programmatic Usage

```typescript
import { buildSarvamProvider, type SarvamRequest } from "openclaw-sarvam-provider";

const provider = buildSarvamProvider();
const config = {
  apiKey: process.env.SARVAM_API_KEY,
  baseURL: "https://api.sarvam.ai",
};

const request: SarvamRequest = {
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Tell me about Indian history" },
  ],
  model: "sarvam-m",
  temperature: 0.7,
  wiki_grounding: true,
};

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

for await (const chunk of provider.chatCompletionStream(config, request)) {
  for (const choice of chunk.choices) {
    if (choice.delta.content) {
      process.stdout.write(choice.delta.content);
    }
  }
}
```

## 🌟 Indian Language Support

Sarvam excels at Indian languages:

```bash
# Hindi
openclaw agent --model "sarvam/sarvam-m" --message "मुझे भारत के बारे में बताओ"

# Tamil
openclaw agent --model "sarvam/sarvam-m" --message "இந்தியாவின் வரலாறு பற்றி சொல்லுங்கள்"

# Telugu
openclaw agent --model "sarvam/sarvam-m" --message "భారతదేశం గురించి చెప్పండి"

# Kannada
openclaw agent --model "sarvam/sarvam-m" --message "ಭಾರತದ ಬಗ್ಗೆ ಹೇಳಿ"
```

## 🔒 Security

### Security Best Practices

- ✅ **Never commit API keys** to version control
- ✅ **Use environment variables** for sensitive data
- ✅ **Rotate API keys** regularly
- ✅ **Monitor API usage** for unusual activity
- ✅ **Use HTTPS only** for communications
- ✅ **Keep dependencies updated**

### Security Features

- 🔐 Environment variable support for API keys
- 🔒 HTTPS-only communications by default
- 🛡️ Input validation and sanitization
- ⏱️ Request timeouts to prevent hanging
- ✅ Type safety with TypeScript

### Security Documentation

For detailed security information, see [SECURITY_ANALYSIS.md](SECURITY_ANALYSIS.md).

## 📚 API Reference

### Types

```typescript
interface SarvamConfig {
  apiKey: string;
  baseURL?: string;
  model?: string;
}

interface SarvamRequest {
  messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>;
  model: string;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  stream?: boolean;
  wiki_grounding?: boolean;
  frequency_penalty?: number;
  presence_penalty?: number;
}

interface SarvamResponse {
  id: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  created: number;
  model: string;
  object: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
```

## 🛠️ Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/your-username/openclaw-sarvam-provider.git
cd openclaw-sarvam-provider

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Watch mode for development
npm run dev
```

### Project Structure

```
openclaw-sarvam-provider/
├── src/
│   ├── index.ts              # Main plugin entry point
│   └── sarvam-provider.ts   # Sarvam implementation
├── dist/                    # Compiled output
├── test/                    # Test files
├── package.json
├── tsconfig.json
├── README.md
├── EXAMPLES.md              # Usage examples
├── MODEL_SWITCHING.md        # Model switching guide
├── SECURITY_ANALYSIS.md      # Security documentation
└── LICENSE
```

### Contributing

Contributions are welcome! Please follow our contribution guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code:
- Follows existing code style
- Includes tests for new features
- Updates documentation as needed
- Passes all existing tests

## 📖 Documentation

- 📚 [Usage Examples](EXAMPLES.md) - Comprehensive usage examples
- 🔄 [Model Switching Guide](MODEL_SWITCHING.md) - Advanced model management
- 🔒 [Security Analysis](SECURITY_ANALYSIS.md) - Security best practices
- 🔧 [Installation Guide](INSTALL.md) - Step-by-step installation
- 📦 [Publishing Guide](PUBLISH.md) - How to publish updates

## ❓ FAQ

### Q: How do I switch models?
**A:** Use the `--model` flag with the model ID: `openclaw agent --model "sarvam/sarvam-lite" --message "Your question"`

### Q: What is wiki_grounding?
**A:** Wiki_grounding is Sarvam's unique RAG-based Wikipedia retrieval feature that enhances factual accuracy by referencing Wikipedia articles.

### Q: Which model should I use?
**A:** Start with `sarvam-m` (default). Use `sarvam-lite` for quick responses and `sarvam-pro` for complex tasks.

### Q: How do I enable wiki_grounding?
**A:** Add `--wiki-grounding true` to your command or set `"wiki_grounding": true` in your config file.

### Q: Is my API key secure?
**A:** Yes, the provider supports environment variables and follows OpenClaw's security model. Never commit API keys to version control.

### Q: Can I use this with multiple OpenClaw agents?
**A:** Yes, you can configure different agents with different models and settings.

## 🔗 Links

- **OpenClaw**: [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)
- **Sarvam**: [sarvam.ai](https://www.sarvam.ai)
- **Sarvam Docs**: [docs.sarvam.ai](https://docs.sarvam.ai)
- **OpenClaw Docs**: [docs.openclaw.ai](https://docs.openclaw.ai)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Sarvam** - For providing the API and documentation
- **OpenClaw Team** - For the excellent personal assistant platform
- **Contributors** - Everyone who has helped improve this provider

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/openclaw-sarvam-provider/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/openclaw-sarvam-provider/discussions)
- **OpenClaw Discord**: [discord.gg/clawd](https://discord.gg/clawd)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/openclaw-sarvam-provider&type=date)](https://star-history.com/#your-username/openclaw-sarvam-provider&Date)

---

**Made with ❤️ for the OpenClaw and Sarvam communities**

If you find this project useful, please consider giving it a ⭐ on GitHub!