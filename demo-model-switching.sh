#!/bin/bash

# Demo Script: Model Switching with OpenClaw Sarvam AI Provider
# This script demonstrates how to switch between different Sarvam AI models

echo "🔄 OpenClaw Sarvam AI Provider - Model Switching Demo"
echo "======================================================"
echo ""

# Check if OpenClaw is installed
if ! command -v openclaw &> /dev/null; then
    echo "❌ OpenClaw is not installed. Please install it first:"
    echo "   npm install -g openclaw"
    exit 1
fi

# Check if Sarvam AI provider is installed
if ! npm list -g openclaw-sarvam-provider &> /dev/null; then
    echo "❌ Sarvam AI provider is not installed. Please install it first:"
    echo "   npm install -g openclaw-sarvam-provider"
    exit 1
fi

# Check if API key is set
if [ -z "$SARVAM_API_KEY" ]; then
    echo "⚠️  SARVAM_API_KEY environment variable is not set."
    echo "   Please set it with: export SARVAM_API_KEY='your-api-key'"
    exit 1
fi

echo "✅ All checks passed! Starting model switching demo..."
echo ""

# Demo 1: Quick query with Lite model
echo "🚀 Demo 1: Quick Query with Sarvam Lite"
echo "   Model: sarvam/sarvam-lite (Fast, cost-effective)"
echo "   Query: 'What is the capital of India?'"
echo ""
echo "Response:"
openclaw agent --model "sarvam/sarvam-lite" --message "What is the capital of India?"
echo ""
echo "---"
echo ""

# Demo 2: General query with M model
echo "🎯 Demo 2: General Query with Sarvam M"
echo "   Model: sarvam/sarvam-m (Balanced performance)"
echo "   Query: 'Tell me about Indian culture'"
echo ""
echo "Response:"
openclaw agent --model "sarvam/sarvam-m" --message "Tell me about Indian culture"
echo ""
echo "---"
echo ""

# Demo 3: Complex query with Pro model + Wiki Grounding
echo "🧠 Demo 3: Complex Query with Sarvam Pro + Wiki Grounding"
echo "   Model: sarvam/sarvam-pro (Advanced capabilities)"
echo "   Feature: wiki_grounding enabled"
echo "   Query: 'Analyze the historical significance of the Taj Mahal'"
echo ""
echo "Response:"
openclaw agent --model "sarvam/sarvam-pro" --wiki-grounding true --message "Analyze the historical significance of the Taj Mahal"
echo ""
echo "---"
echo ""

# Demo 4: Indian language support
echo "🌏 Demo 4: Indian Language Support (Hindi)"
echo "   Model: sarvam/sarvam-m"
echo "   Query: 'मुझे भारत के बारे में बताओ' (Tell me about India)"
echo ""
echo "Response:"
openclaw agent --model "sarvam/sarvam-m" --message "मुझे भारत के बारे में बताओ"
echo ""
echo "---"
echo ""

echo "✨ Demo completed!"
echo ""
echo "📚 For more information:"
echo "   - Model switching guide: MODEL_SWITCHING.md"
echo "   - Usage examples: EXAMPLES.md"
echo "   - Full documentation: README.md"
echo ""
echo "💡 Tips:"
echo "   - Use Lite for quick, simple queries (cheapest)"
echo "   - Use M for general tasks (balanced)"
echo "   - Use Pro for complex analysis with wiki_grounding (best quality)"