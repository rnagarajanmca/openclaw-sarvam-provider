# OpenClaw Sarvam Provider

[![npm](https://img.shields.io/npm/v/openclaw-sarvam-provider)](https://www.npmjs.com/package/openclaw-sarvam-provider)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/node/v/openclaw-sarvam-provider)](https://nodejs.org/)

**Official Sarvam provider for OpenClaw** - Enterprise-grade integration with wiki_grounding, strong Indian language support, and dynamic model switching.

## Features

- 🌏 **Strong Indian Language Support** - Optimized for Hindi, Tamil, Telugu, Kannada, and more
- 📚 **Wiki Grounding** - Built-in RAG-based Wikipedia retrieval for enhanced factual accuracy
- 🔄 **Dynamic Model Switching** - Seamlessly switch between Lite, M, and Pro models
- ⚡ **Streaming Support** - Real-time streaming responses for faster user experience
- 🔒 **Enterprise Security** - Environment variable support, input validation, secure communication
- 🎯 **Multiple Models** - Choose the right model for your use case
- 🛠️ **Developer-Friendly** - TypeScript with full type definitions
- 📦 **Easy Installation** - Single command setup with OpenClaw

## Requirements

- **Node.js**: ≥22.16.0
- **OpenClaw**: ≥2026.3.14 (optional - for OpenClaw integration)
- **Sarvam API Key**: Get one at [docs.sarvam.ai](https://docs.sarvam.ai)

## Installation

Install the provider globally:

```bash
npm install -g openclaw-sarvam-provider
```

Alternative package managers: `pnpm add -g`, `bun add -g`, or `yarn global add`

## Configuration

### Get Your API Key

Visit [docs.sarvam.ai](https://docs.sarvam.ai) to sign up and generate an API key.

### Configure OpenClaw

Set your API key as an environment variable (recommended):

```bash
export SARVAM_API_KEY="your-sarvam-api-key-here"
```

Or use interactive setup:

```bash
openclaw setup sarvam
```

## Usage

### Basic Usage

Use the provider with OpenClaw:

```bash
openclaw agent --model "sarvam/sarvam-m" --message "Your question here"
```

### Model Selection

Choose the right model for your needs:

- **sarvam/sarvam-lite** (16K context) - Quick responses, simple tasks
- **sarvam/sarvam-m** (32K context) - General use, balanced performance
- **sarvam/sarvam-pro** (64K context) - Complex tasks, deep analysis

### Wiki Grounding

Enable wiki_grounding for enhanced factual accuracy:

```bash
openclaw agent --model "sarvam/sarvam-m" --wiki-grounding true --message "Your question"
```

## Available Models

| Model ID | Context | Features | Best For |
|----------|---------|----------|-----------|
| `sarvam/sarvam-lite` | 16K | wiki_grounding, streaming | Quick responses, simple tasks |
| `sarvam/sarvam-m` | 32K | wiki_grounding, streaming, Indian languages | General use, balanced performance |
| `sarvam/sarvam-pro` | 64K | wiki_grounding, streaming, advanced reasoning, Indian languages | Complex tasks, deep analysis |

## Configuration Options

### API Parameters

- `model` - Model selection (default: sarvam/sarvam-m)
- `temperature` - Controls randomness (0.0 - 2.0, default: 0.2)
- `top_p` - Nucleus sampling (0.0 - 1.0, default: 1.0)
- `max_tokens` - Maximum response length
- `wiki_grounding` - Enable Wikipedia RAG (default: false)
- `stream` - Enable streaming (default: true)

## Indian Language Support

Sarvam excels at Indian languages including Hindi, Tamil, Telugu, Kannada, and more. Use any supported language in your requests.

## Security

- ✅ Use environment variables for API keys
- ✅ Never commit API keys to version control
- ✅ Rotate API keys regularly
- ✅ HTTPS-only communications
- ✅ Input validation and sanitization

## Development

### Building from Source

```bash
git clone https://github.com/rnagarajanmca/openclaw-sarvam-provider.git
cd openclaw-sarvam-provider
npm install
npm run build
```

### Running Tests

```bash
npm test
```

## Documentation

- 📚 [Usage Examples](EXAMPLES.md)
- 🔄 [Model Switching Guide](MODEL_SWITCHING.md)
- 🔒 [Security Analysis](SECURITY_ANALYSIS.md)
- 🔧 [Installation Guide](INSTALL.md)
- 📦 [Publishing Guide](PUBLISH.md)

## Links

- **OpenClaw**: [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)
- **Sarvam**: [sarvam.ai](https://www.sarvam.ai)
- **Sarvam Docs**: [docs.sarvam.ai](https://docs.sarvam.ai)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/rnagarajanmca/openclaw-sarvam-provider/issues)
- **Discussions**: [GitHub Discussions](https://github.com/rnagarajanmca/openclaw-sarvam-provider/discussions)

---

**Made with ❤️ for the OpenClaw and Sarvam communities**
