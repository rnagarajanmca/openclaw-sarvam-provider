# Installation Guide for OpenClaw Sarvam Provider

## Quick Start (Single Command)

```bash
npm install -g openclaw-sarvam-provider
```

That's it! The provider is now installed and ready to use.

## Alternative Installation Methods

### Using pnpm

```bash
pnpm add -g openclaw-sarvam-provider
```

### Using bun

```bash
bun add -g openclaw-sarvam-provider
```

### Using yarn

```bash
yarn global add openclaw-sarvam-provider
```

## Verify Installation

After installation, verify that OpenClaw recognizes the provider:

```bash
openclaw doctor
```

You should see Sarvam listed in the available providers.

## Setup Your API Key

### Step 1: Get Your Sarvam API Key

1. Visit [docs.sarvam.ai](https://docs.sarvam.ai)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Generate a new API key
5. Copy your API key

### Step 2: Configure OpenClaw

Choose one of the following methods:

#### Method A: Environment Variable (Recommended)

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

#### Method B: OpenClaw Config File

Create or edit your OpenClaw config file (`~/.config/openclaw/config.json`):

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

#### Method C: Interactive Setup

```bash
openclaw setup sarvam
```

Follow the prompts to enter your API key.

## Test Your Installation

### Test with CLI

```bash
openclaw agent --model "sarvam/sarvam-m" --message "Hello from Sarvam!"
```

### Test with Configuration

Update your OpenClaw config:

```json
{
  "agent": {
    "model": "sarvam/sarvam-m"
  }
}
```

Then start OpenClaw normally:

```bash
openclaw agent
```

### Test Wiki Grounding (Sarvam's Unique Feature)

```bash
openclaw agent --model "sarvam/sarvam-m" --message "What is the history of the Taj Mahal?" --wiki-grounding true
```

## Troubleshooting

### Provider Not Recognized

If OpenClaw doesn't recognize the provider:

```bash
# Reinstall the provider
npm uninstall -g openclaw-sarvam-provider
npm install -g openclaw-sarvam-provider

# Restart OpenClaw
openclaw restart
```

### API Key Issues

If you get API key errors:

1. Verify your API key is correct
2. Check that the environment variable is set: `echo $SARVAM_API_KEY`
3. Ensure your Sarvam account has API access enabled
4. Check your API key hasn't expired

### Version Compatibility

Ensure you're using compatible versions:

```bash
# Check OpenClaw version
openclaw --version

# Check Node version
node --version

# Check provider version
npm list -g openclaw-sarvam-provider
```

Required versions:
- Node.js: ≥22.16.0
- OpenClaw: ≥2026.3.14

## Uninstallation

If you need to remove the provider:

```bash
npm uninstall -g openclaw-sarvam-provider
```

## Next Steps

- Read the full [README.md](README.md) for detailed usage examples
- Check [Sarvam Documentation](https://docs.sarvam.ai) for API details
- Explore [OpenClaw Documentation](https://docs.openclaw.ai) for more features

## Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/your-username/openclaw-sarvam-provider/issues)
2. Review [OpenClaw Troubleshooting](https://docs.openclaw.ai/gateway/doctor)
3. Join the [OpenClaw Discord](https://discord.gg/clawd)

---

**Need help?** Feel free to open an issue on GitHub!