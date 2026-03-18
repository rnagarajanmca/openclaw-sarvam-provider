# Quick Start Guide - OpenClaw Sarvam Provider

Get started with the Sarvam provider in under 5 minutes! 🚀

## 🎯 Prerequisites Check

Before starting, ensure you have:

- ✅ **Node.js ≥22.16.0** installed (`node --version`)
- ✅ **OpenClaw ≥2026.3.14** installed (`openclaw --version`)
- ✅ **Sarvam API Key** from [docs.sarvam.ai](https://docs.sarvam.ai)

## 📦 Installation Steps

### Step 1: Install the Provider (30 seconds)

```bash
npm install -g openclaw-sarvam-provider
```

### Step 2: Set Your API Key (1 minute)

```bash
export SARVAM_API_KEY="your-sarvam-api-key-here"
```

*Tip: Add this to your `~/.bashrc` or `~/.zshrc` to make it permanent.*

### Step 3: Verify Installation (30 seconds)

```bash
openclaw doctor
```

You should see "Sarvam" listed in the available providers.

### Step 4: Test the Provider (1 minute)

```bash
openclaw agent --model "sarvam/sarvam-m" --message "Hello from Sarvam!"
```

**Congratulations!** 🎉 You're ready to use Sarvam with OpenClaw.

## 🎯 Essential Commands

### Basic Usage

```bash
# Simple question
openclaw agent --model "sarvam/sarvam-m" --message "What's the capital of India?"

# Interactive chat
openclaw agent --model "sarvam/sarvam-m"

# Send to configured channels
openclaw message send --message "Hi from Sarvam!"
```

### Model Switching

```bash
# Fast responses (Lite)
openclaw agent --model "sarvam/sarvam-lite" --message "Quick question"

# General use (M - Default)
openclaw agent --model "sarvam/sarvam-m" --message "Standard query"

# Complex analysis (Pro)
openclaw agent --model "sarvam/sarvam-pro" --wiki-grounding true --message "Complex analysis"
```

### Wiki Grounding (Sarvam's Unique Feature)

```bash
# Enable wiki_grounding for factual accuracy
openclaw agent --model "sarvam/sarvam-m" --wiki-grounding true --message "What is the history of the Taj Mahal?"
```

## ⚙️ Configuration Options

### Quick Configuration

Create `~/.config/openclaw/config.json`:

```json
{
  "agent": {
    "model": "sarvam/sarvam-m"
  }
}
```

### Advanced Configuration

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
      "description": "Fast responses"
    },
    "researcher": {
      "model": "sarvam/sarvam-pro",
      "wiki_grounding": true,
      "description": "Deep research"
    }
  }
}
```

Usage:
```bash
openclaw agent --agent quick --message "Quick help"
openclaw agent --agent researcher --message "Deep research needed"
```

## 🌏 Indian Language Examples

```bash
# Hindi
openclaw agent --model "sarvam/sarvam-m" --message "मुझे भारत के बारे में बताओ"

# Tamil
openclaw agent --model "sarvam/sarvam-m" --message "இந்தியாவின் வரலாறு பற்றி சொல்லுங்கள்"

# Telugu
openclaw agent --model "sarvam/sarvam-m" --message "భారతదేశం గురించి చెప్పండి"
```

## 🎓 Common Use Cases

### 1. Customer Service Bot

```bash
# Use Lite for fast customer responses
openclaw agent --model "sarvam/sarvam-lite" --message "How can I help you?"
```

### 2. Research Assistant

```bash
# Use Pro with wiki_grounding for research
openclaw agent --model "sarvam/sarvam-pro" --wiki-grounding true --message "Analyze the economic impact of Indian independence"
```

### 3. Content Generation

```bash
# Use M for general content creation
openclaw agent --model "sarvam/sarvam-m" --message "Write a blog post about Indian culture"
```

## 🛠️ Troubleshooting

### Problem: "Provider not recognized"

**Solution:**
```bash
# Reinstall the provider
npm uninstall -g openclaw-sarvam-provider
npm install -g openclaw-sarvam-provider

# Restart OpenClaw
openclaw restart
```

### Problem: "Invalid API key"

**Solution:**
```bash
# Check API key is set
echo $SARVAM_API_KEY

# Reset if needed
export SARVAM_API_KEY="your-correct-api-key"
```

### Problem: "Model not found"

**Solution:**
```bash
# Use correct model format
openclaw agent --model "sarvam/sarvam-lite" --message "Test"  # Correct
openclaw agent --model "sarvam-lite" --message "Test"      # Also works
```

## 📊 Model Selection Guide

| Use Case | Recommended Model | Command |
|-----------|-----------------|----------|
| Real-time chat | Sarvam Lite | `--model "sarvam/sarvam-lite"` |
| General conversation | Sarvam M | `--model "sarvam/sarvam-m"` |
| Complex analysis | Sarvam Pro | `--model "sarvam/sarvam-pro"` |
| Fact-based queries | Sarvam Pro + Wiki | `--model "sarvam/sarvam-pro" --wiki-grounding true` |
| Cost optimization | Sarvam Lite | `--model "sarvam/sarvam-lite"` |
| Best quality | Sarvam Pro | `--model "sarvam/sarvam-pro"` |

## 🎯 Next Steps

1. **Explore Examples** - Check [EXAMPLES.md](EXAMPLES.md) for detailed examples
2. **Model Switching** - Learn about [MODEL_SWITCHING.md](MODEL_SWITCHING.md) for advanced usage
3. **Security** - Review [SECURITY_ANALYSIS.md](SECURITY_ANALYSIS.md) for best practices
4. **Full Documentation** - Read the complete [README.md](README.md)

## 💡 Pro Tips

1. **Start with Sarvam M** - Good balance of speed and quality
2. **Use Wiki Grounding** for fact-based questions
3. **Switch Models** based on query complexity
4. **Monitor Costs** - Use Lite for simple queries
5. **Test in Hindi** - Sarvam excels at Indian languages

## 📞 Need Help?

- **Documentation**: [README.md](README.md)
- **Examples**: [EXAMPLES.md](EXAMPLES.md)
- **Issues**: [GitHub Issues](https://github.com/your-username/openclaw-sarvam-provider/issues)
- **Discord**: [OpenClaw Discord](https://discord.gg/clawd)

---

**Ready to go?** Start using Sarvam now:

```bash
openclaw agent --model "sarvam/sarvam-m" --message "Tell me about yourself!"
```