# Model Switching Guide for OpenClaw Sarvam Provider

## 🔄 Available Models

The Sarvam provider supports multiple models with different capabilities:

| Model ID | Name | Context | Best For | Pricing |
|----------|------|---------|----------|---------|
| `sarvam/sarvam-lite` | Sarvam Lite | 16K | Quick responses, simple tasks | Cheapest |
| `sarvam/sarvam-m` | Sarvam M | 32K | General use, balanced performance | Medium |
| `sarvam/sarvam-pro` | Sarvam Pro | 64K | Complex tasks, deep analysis | Premium |

## 🎯 Model Switching Methods

### 1. Dynamic Switching in Configuration

**Single Agent - Different Models:**

```json
{
  "agent": {
    "model": "sarvam/sarvam-lite"
  }
}
```

Change to M or Pro:

```json
{
  "agent": {
    "model": "sarvam/sarvam-pro"
  }
}
```

### 2. Multiple Agents with Different Models

**Create specialized agents:**

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
      "description": "Deep analysis with wiki_grounding",
      "wiki_grounding": true
    }
  }
}
```

**Usage:**

```bash
# Use quick agent
openclaw agent --agent quick --message "What's the time?"

# Use general agent
openclaw agent --agent general --message "Tell me about India"

# Use researcher agent
openclaw agent --agent researcher --message "Analyze the economic impact of Indian independence"
```

### 3. Runtime Model Switching

**Command Line:**

```bash
# Use Lite model
openclaw agent --model "sarvam/sarvam-lite" --message "Quick question"

# Use M model (default)
openclaw agent --model "sarvam/sarvam-m" --message "Standard question"

# Use Pro model
openclaw agent --model "sarvam/sarvam-pro" --message "Complex analysis needed"
```

**Programmatic:**

```typescript
import { buildSarvamProvider } from "openclaw-sarvam-provider";

const provider = buildSarvamProvider();
const config = {
  apiKey: process.env.SARVAM_API_KEY,
  baseURL: "https://api.sarvam.ai",
};

// Switch to Lite for quick responses
const liteRequest = {
  messages: [{ role: "user", content: "Hello!" }],
  model: "sarvam-lite",  // Explicit model selection
};

const liteResponse = await provider.chatCompletion(config, liteRequest);

// Switch to Pro for complex tasks
const proRequest = {
  messages: [{ role: "user", content: "Analyze the economic impact..." }],
  model: "sarvam-pro",  // Explicit model selection
  wiki_grounding: true,
};

const proResponse = await provider.chatCompletion(config, proRequest);
```

### 4. Context-Based Model Selection

**Dynamic model based on query complexity:**

```json
{
  "agents": {
    "adaptive": {
      "model": "sarvam/sarvam-m",
      "description": "Adaptive model selection",
      "modelRouting": {
        "simple": "sarvam/sarvam-lite",
        "standard": "sarvam/sarvam-m",
        "complex": "sarvam/sarvam-pro"
      }
    }
  }
}
```

## 📊 Model Selection Guidelines

### When to Use Sarvam Lite:

✅ **Quick responses**
- Simple greetings
- Basic translations
- Short answers
- Real-time chat

✅ **Cost optimization**
- High-volume queries
- Testing and development
- Budget-constrained applications

```bash
openclaw agent --model "sarvam/sarvam-lite" --message "Hi there!"
```

### When to Use Sarvam M (Default):

✅ **Balanced performance**
- General conversation
- Standard information queries
- Moderate complexity tasks
- Most common use cases

```bash
openclaw agent --model "sarvam/sarvam-m" --message "Tell me about Indian culture"
```

### When to Use Sarvam Pro:

✅ **Complex tasks**
- Deep analysis and research
- Long-form content generation
- Complex reasoning
- Multi-step problem solving

✅ **Advanced features**
- Enhanced wiki_grounding
- Better multilingual understanding
- More nuanced responses

```bash
openclaw agent --model "sarvam/sarvam-pro" --wiki-grounding true --message "Analyze the historical significance of the Indian independence movement"
```

## 🎛️ Advanced Configuration

### Environment-Based Model Selection

```json
{
  "agent": {
    "model": "${SARVAM_MODEL:-sarvam/sarvam-m}"
  }
}
```

Then set environment variable:

```bash
# Development - use Lite
export SARVAM_MODEL="sarvam/sarvam-lite"

# Production - use Pro
export SARVAM_MODEL="sarvam/sarvam-pro"
```

### Conditional Model Selection

```json
{
  "agents": {
    "smart": {
      "model": "sarvam/sarvam-m",
      "rules": {
        "if": {
          "message_length": "> 1000",
          "then": "sarvam/sarvam-pro"
        },
        "if": {
          "message_length": "< 100",
          "then": "sarvam/sarvam-lite"
        }
      }
    }
  }
}
```

## 🔧 Testing Different Models

### Benchmark Models:

```bash
# Test Lite speed
time openclaw agent --model "sarvam/sarvam-lite" --message "Say hello"

# Test M quality
time openclaw agent --model "sarvam/sarvam-m" --message "Write a short story about India"

# Test Pro capabilities
time openclaw agent --model "sarvam/sarvam-pro" --wiki-grounding true --message "Provide detailed analysis of Indian economic history"
```

### Compare Results:

```bash
# Same question, different models
openclaw agent --model "sarvam/sarvam-lite" --message "Explain quantum computing in simple terms" > lite_response.txt

openclaw agent --model "sarvam/sarvam-m" --message "Explain quantum computing in simple terms" > m_response.txt

openclaw agent --model "sarvam/sarvam-pro" --message "Explain quantum computing in simple terms" > pro_response.txt

# Compare responses
diff lite_response.txt m_response.txt
```

## 🌟 Use Case Examples

### Customer Service Bot

```json
{
  "agents": {
    "customer_service": {
      "model": "sarvam/sarvam-lite",
      "description": "Fast customer support responses",
      "rules": {
        "if": {
          "topic": "technical_support",
          "then": "sarvam/sarvam-m"
        },
        "if": {
          "topic": "complaint",
          "then": "sarvam/sarvam-pro"
        }
      }
    }
  }
}
```

### Educational Platform

```json
{
  "agents": {
    "tutor": {
      "model": "sarvam/sarvam-m",
      "description": "General tutoring",
      "subjects": {
        "mathematics": "sarvam/sarvam-m",
        "languages": "sarvam/sarvam-pro",
        "science": "sarvam/sarvam-pro",
        "arts": "sarvam/sarvam-lite"
      }
    }
  }
}
```

### Research Assistant

```json
{
  "agents": {
    "researcher": {
      "model": "sarvam/sarvam-pro",
      "wiki_grounding": true,
      "description": "Deep research with wiki grounding",
      "tasks": {
        "quick_search": "sarvam/sarvam-lite",
        "detailed_analysis": "sarvam/sarvam-pro"
      }
    }
  }
}
```

## 💰 Cost Optimization

### Smart Model Selection:

```bash
# Use Lite for simple queries (cheapest)
openclaw agent --model "sarvam/sarvam-lite" --message "What's 2+2?"

# Use M for standard tasks (medium cost)
openclaw agent --model "sarvam/sarvam-m" --message "Summarize this article..."

# Use Pro only when needed (highest cost but better results)
openclaw agent --model "sarvam/sarvam-pro" --wiki-grounding true --message "Analyze the complex geopolitical situation..."
```

### Budget Management:

```json
{
  "agent": {
    "model": "sarvam/sarvam-m",
    "budget": {
      "daily_limit": 1000,
      "preferred_model": "sarvam/sarvam-lite",
      "upgrade_threshold": 500
    }
  }
}
```

## 🎯 Best Practices

### 1. Start with Sarvam M
- Good balance of speed and quality
- Works well for most use cases
- Upgrade to Pro only if needed

### 2. Use Lite for Real-Time Applications
- Chat interfaces
- Quick Q&A
- Simple translations

### 3. Use Pro for Critical Applications
- Research and analysis
- Complex problem solving
- Important content generation

### 4. Monitor Performance
```bash
# Track response times and quality
openclaw agent --model "sarvam/sarvam-m" --verbose --message "Test query"
```

### 5. A/B Test Models
```bash
# Test both models with same query
openclaw agent --model "sarvam/sarvam-lite" --message "Explain AI in simple terms" > test_lite.txt
openclaw agent --model "sarvam/sarvam-pro" --message "Explain AI in simple terms" > test_pro.txt
```

## 🔍 Troubleshooting

### Model Not Found Error
```bash
# Check available models
openclaw doctor --models sarvam

# Verify model ID spelling
openclaw agent --model "sarvam/sarvam-m"  # Correct
openclaw agent --model "sarvam-m"  # Wrong - need full ID
```

### Performance Issues
```bash
# Try faster model (Lite)
openclaw agent --model "sarvam/sarvam-lite" --message "Quick test"

# Check network and API status
openclaw doctor --status
```

## 📚 Additional Resources

- [Sarvam Documentation](https://docs.sarvam.ai)
- [OpenClaw Models Documentation](https://docs.openclaw.ai/concepts/models)
- [Model Switching Examples](EXAMPLES.md)

---

**Need help choosing the right model?** Test different models with your specific use cases and compare results!