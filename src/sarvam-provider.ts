import type {
  ProviderRuntimeModel,
  ProviderStreamContext,
  ProviderStreamFn,
} from "openclaw/plugin-sdk/core";

/**
 * Sarvam API Configuration
 */
export interface SarvamConfig {
  apiKey: string;
  baseURL?: string;
  model?: string;
}

/**
 * Sarvam Chat Completion Request
 */
export interface SarvamRequest {
  messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>;
  model: string;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  stream?: boolean;
  stop?: string[];
  n?: number;
  seed?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  wiki_grounding?: boolean;
}

/**
 * Sarvam Chat Completion Response
 */
export interface SarvamResponse {
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

/**
 * Sarvam Streaming Chunk
 */
export interface SarvamStreamChunk {
  id: string;
  choices: Array<{
    index: number;
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason: string | null;
  }>;
  created: number;
  model: string;
  object: string;
}

/**
 * Default Sarvam configuration
 */
const DEFAULT_SARVAM_CONFIG: Partial<SarvamConfig> = {
  baseURL: "https://api.sarvam.ai/v1",
  model: "sarvam-m",
};

/**
 * Sarvam provider runtime models
 */
export const SARVAM_MODELS: ProviderRuntimeModel[] = [
  {
    id: "sarvam/sarvam-m",
    provider: "sarvam",
    name: "Sarvam M",
    description: "Sarvam's flagship model with strong Indian language support and wiki_grounding",
    context: 32000,
    pricing: {
      input: 0.0004,
      output: 0.0012,
    },
    capabilities: {
      text: true,
      vision: false,
      tools: false,
      streaming: true,
    },
    features: {
      wiki_grounding: "RAG-based Wikipedia retrieval for factual accuracy",
      indian_languages: "Strong support for Hindi, Tamil, Telugu, Kannada, and more",
    },
  },
  {
    id: "sarvam/sarvam-lite",
    provider: "sarvam",
    name: "Sarvam Lite",
    description: "Lighter, faster model optimized for quick responses with good Indian language support",
    context: 16000,
    pricing: {
      input: 0.0002,
      output: 0.0006,
    },
    capabilities: {
      text: true,
      vision: false,
      tools: false,
      streaming: true,
    },
    features: {
      wiki_grounding: "Basic Wikipedia retrieval support",
      indian_languages: "Good support for major Indian languages",
    },
  },
  {
    id: "sarvam/sarvam-pro",
    provider: "sarvam",
    name: "Sarvam Pro",
    description: "Advanced model with enhanced capabilities for complex tasks and multilingual applications",
    context: 64000,
    pricing: {
      input: 0.0008,
      output: 0.0024,
    },
    capabilities: {
      text: true,
      vision: false,
      tools: false,
      streaming: true,
    },
    features: {
      wiki_grounding: "Advanced Wikipedia retrieval with deeper context",
      indian_languages: "Excellent support for all major Indian languages",
      complex_reasoning: "Enhanced reasoning and analysis capabilities",
    },
  },
];

/**
 * Build Sarvam provider configuration
 */
export function buildSarvamProvider() {
  return {
    id: "sarvam",
    label: "Sarvam",
    description: "Indian language models with strong multilingual support and wiki_grounding",
    docsPath: "https://docs.sarvam.ai/api-reference-docs/chat/chat-completions",
    envVars: ["SARVAM_API_KEY"],
    defaultModel: "sarvam/sarvam-m",  // Users can switch to sarvam-lite or sarvam-pro
    models: SARVAM_MODELS,

    /**
     * Build chat completion function
     */
    async chatCompletion(
      config: SarvamConfig,
      request: SarvamRequest,
    ): Promise<SarvamResponse> {
      const finalConfig = { ...DEFAULT_SARVAM_CONFIG, ...config };

      const response = await fetch(`${finalConfig.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-subscription-key": finalConfig.apiKey,
        },
        body: JSON.stringify({
          ...request,
          model: request.model || finalConfig.model,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Sarvam API error: ${response.status} ${response.statusText} - ${errorText}`,
        );
      }

      return (response.json() as unknown) as SarvamResponse;
    },

    /**
     * Build streaming chat completion function
     */
    async *chatCompletionStream(
      config: SarvamConfig,
      request: SarvamRequest,
    ): AsyncGenerator<SarvamStreamChunk> {
      const finalConfig = { ...DEFAULT_SARVAM_CONFIG, ...config };

      const response = await fetch(`${finalConfig.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-subscription-key": finalConfig.apiKey,
        },
        body: JSON.stringify({
          ...request,
          model: request.model || finalConfig.model,
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Sarvam API error: ${response.status} ${response.statusText} - ${errorText}`,
        );
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response body is not readable");
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === "data: [DONE]") continue;
          if (trimmed.startsWith("data: ")) {
            try {
              const data = JSON.parse(trimmed.slice(6));
              yield data;
            } catch (error) {
              // Skip invalid JSON lines
              console.warn("Failed to parse SSE data:", trimmed);
            }
          }
        }
      }
    },

    /**
     * Create stream wrapper for OpenClaw compatibility
     */
    createStreamWrapper(
      streamFn: ProviderStreamFn,
    ): (ctx: ProviderStreamContext) => AsyncGenerator<string> {
      return async function* (ctx: ProviderStreamContext) {
        const config = ctx.auth as SarvamConfig;
        const request = ctx.request as SarvamRequest;

        const stream = buildSarvamProvider().chatCompletionStream(
          config,
          request,
        );

        for await (const chunk of stream) {
          for (const choice of chunk.choices) {
            if (choice.delta.content) {
              yield choice.delta.content;
            }
          }
        }
      };
    },
  };
}

/**
 * Helper function to create Sarvam API request from OpenClaw context
 */
export function createSarvamRequest(ctx: ProviderStreamContext): SarvamRequest {
  const messages = ctx.messages.map((msg) => ({
    role: msg.role as "system" | "user" | "assistant",
    content: msg.content,
  }));

  return {
    messages,
    model: ctx.modelId,
    temperature: ctx.temperature ?? 0.2,
    top_p: ctx.topP ?? 1,
    max_tokens: ctx.maxTokens,
    stream: true,
    // Sarvam-specific features
    wiki_grounding: ctx.options?.wiki_grounding ?? false,
  };
}

/**
 * Helper function to validate Sarvam API key format
 */
export function validateSarvamApiKey(apiKey: string): boolean {
  // Sarvam API keys are typically UUID-like strings
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(apiKey.trim());
}

/**
 * Helper function to get Sarvam API key from environment
 */
export function getSarvamApiKeyFromEnv(): string | undefined {
  return process.env.SARVAM_API_KEY;
}